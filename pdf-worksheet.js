// Shared jsPDF builder for printable A4 worksheets (lectura veloz.html, teacher/tareas.html).
(function () {
    const JSPDF_URL = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    const M = 20, W = 210 - 2 * M, BOTTOM = 297 - M;

    function load() {
        if (window.jspdf) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = JSPDF_URL;
            s.onload = resolve;
            s.onerror = () => reject(new Error('No se pudo cargar jsPDF'));
            document.head.appendChild(s);
        });
    }

    // jsPDF's built-in Helvetica only encodes Latin-1: map typographic characters, drop the rest (emoji…).
    const MAP = { '„': '"', '“': '"', '”': '"', '‚': "'", '‘': "'", '’': "'", '–': '-', '—': '-', '…': '...', '€': 'EUR', '•': '-', '→': '->' };
    function sanitize(str) {
        return String(str ?? '')
            .replace(/[„“”‚‘’–—…€•→]/g, c => MAP[c])
            .replace(/[   ]/g, ' ')
            .replace(/[^\n\x20-\x7E\xA0-\xFF]/g, '');
    }

    function slug(s) {
        return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
            .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
    }

    function create() {
        const doc = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4' });
        let y = M;
        const pdf = {
            doc, M, W,
            ensure(h) { if (y + h > BOTTOM) { doc.addPage(); y = M; } },
            newPage() { doc.addPage(); y = M; },
            space(h) { y += h; },
            write(str, { size = 11, style = 'normal', gap = 1.5, indent = 0 } = {}) {
                doc.setFont('helvetica', style);
                doc.setFontSize(size);
                const lh = size * 0.42;
                doc.splitTextToSize(sanitize(str), W - indent).forEach(line => {
                    if (y + lh > BOTTOM) { doc.addPage(); y = M; }
                    doc.text(line, M + indent, y);
                    y += lh;
                });
                y += gap;
            },
            // Tick box aligned with the next write() line at the given indent.
            box(indent = 5) {
                doc.setLineWidth(0.3);
                doc.rect(M + indent, y - 3, 3.2, 3.2);
            },
            // Several tick boxes with labels on one line (e.g. richtig / falsch).
            choiceRow(labels, { indent = 5, step = 32, size = 10 } = {}) {
                pdf.ensure(6);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(size);
                doc.setLineWidth(0.3);
                labels.forEach((label, i) => {
                    const x = M + indent + i * step;
                    doc.rect(x, y - 3, 3.2, 3.2);
                    doc.text(sanitize(label), x + 5, y);
                });
                y += size * 0.42 + 2.5;
            },
            writingLines(n, indent = 0) {
                doc.setLineWidth(0.2);
                for (let i = 0; i < n; i++) {
                    pdf.ensure(8);
                    y += 7;
                    doc.line(M + indent, y, M + W, y);
                }
                y += 8;
            },
            save(name) { doc.save(name); },
        };
        return pdf;
    }

    // ── Leseverstehen (format_version 2) Teile: tasks + answer key ──
    // Teile of type emparejar must carry `derecha` (the right column, shuffled once by the caller): task letters and key derive from its order.
    const LETRAS = 'abcdefghijklmnopqrstuvwxyz';

    // Some older bank rows lack the gapped text that "Lücke N" / "Abschnitt N" items refer to.
    function teilUsable(t) {
        const refs = [...(t.columnaIzquierda || []).map(i => i.texto), ...(t.items || []).map(i => i.pregunta)];
        if (!refs.some(r => /^(Lücke|Abschnitt)\s*\d+/i.test(String(r || '')))) return true;
        return (t.textos || []).some(tx => /\[1\]/.test(tx.contenido || ''));
    }

    function sharedOptions(t) {
        const first = JSON.stringify(t.items?.[0]?.opciones);
        return t.items?.length > 1 && t.items.every(it => JSON.stringify(it.opciones) === first) ? t.items[0].opciones : null;
    }

    function emparejarLetra(t, izqId) {
        const j = t.derecha.findIndex(d => d.id === t.solucion?.[izqId]);
        return j < 0 ? '?' : LETRAS[j];
    }

    function corto(s, n = 70) {
        s = String(s || '').replace(/\s+/g, ' ');
        return s.length > n ? s.slice(0, n - 1) + '…' : s;
    }

    const TEIL_PDF = {
        mcq(pdf, t) {
            const shared = sharedOptions(t);
            if (shared) {
                pdf.write('Optionen:  ' + shared.map((o, j) => `${LETRAS[j]}) ${o}`).join('    '), { size: 10, gap: 3 });
                t.items.forEach((it, i) => pdf.write(`${i + 1}. ____  ${it.pregunta}`, { size: 11, gap: 2 }));
                return;
            }
            t.items.forEach((it, i) => {
                pdf.ensure(25);
                pdf.write(`${i + 1}. ${it.pregunta}`, { size: 11, style: 'bold', gap: 1.5 });
                it.opciones.forEach((op, j) => {
                    pdf.ensure(5);
                    pdf.box(5);
                    pdf.write(`${LETRAS[j]}) ${op}`, { size: 11, gap: 0.8, indent: 11 });
                });
                pdf.space(3);
            });
        },
        richtig_falsch(pdf, t) {
            t.items.forEach((it, i) => {
                pdf.ensure(14);
                pdf.write(`${i + 1}. ${it.afirmacion}`, { size: 11, gap: 1.5 });
                pdf.choiceRow(['richtig', 'falsch']);
            });
        },
        emparejar(pdf, t) {
            pdf.write('Ordnen Sie zu:', { size: 10, style: 'bold', gap: 1.5 });
            t.derecha.forEach((d, j) => pdf.write(`${LETRAS[j]}) ${d.texto}`, { size: 10.5, gap: 1.5, indent: 5 }));
            pdf.space(2);
            t.columnaIzquierda.forEach((iz, i) => {
                pdf.ensure(7);
                pdf.write(`${i + 1}. ____  ${iz.texto}`, { size: 11, gap: 1.5 });
            });
        },
    };

    function teilLoesungen(t) {
        if (t.tipo === 'mcq') return t.items.map((it, i) => ({ linea: `${i + 1}. ${LETRAS[it.correcta]}) ${it.opciones[it.correcta]}`, expl: it.explicacion }));
        if (t.tipo === 'richtig_falsch') return t.items.map((it, i) => ({ linea: `${i + 1}. ${it.correcta ? 'richtig' : 'falsch'}`, expl: it.explicacion }));
        return t.columnaIzquierda.map((iz, i) => {
            const letra = emparejarLetra(t, iz.id);
            const der = t.derecha[LETRAS.indexOf(letra)];
            return { linea: `${i + 1}. ${letra}) ${der ? corto(der.texto) : ''}`, expl: t.explicaciones?.[iz.id] };
        });
    }

    function writeLoesung(pdf, { linea, expl }) {
        pdf.write(linea, { size: 10.5, gap: expl ? 0.5 : 1.5 });
        if (expl) pdf.write(expl, { size: 9, style: 'italic', gap: 2, indent: 5 });
    }

    function lesenTeile(pdf, teile) {
        teile.forEach((t, ti) => {
            pdf.ensure(20);
            pdf.write(`Teil ${ti + 1}`, { size: 12, style: 'bold', gap: 1.5 });
            if (t.instrucciones) pdf.write(t.instrucciones, { size: 10, style: 'italic', gap: 3 });
            (t.textos || []).forEach(tx => {
                if (tx.titulo) pdf.write(tx.titulo, { size: 11, style: 'bold', gap: 1 });
                String(tx.contenido || '').split(/\n\s*\n/).forEach(p => pdf.write(p, { size: 11, gap: 2.5 }));
                pdf.space(2);
            });
            TEIL_PDF[t.tipo]?.(pdf, t);
            pdf.space(4);
        });
    }

    function lesenLoesungen(pdf, teile) {
        teile.forEach((t, ti) => {
            pdf.write(`Teil ${ti + 1}`, { size: 11, style: 'bold', gap: 1.5 });
            teilLoesungen(t).forEach(l => writeLoesung(pdf, l));
            pdf.space(2);
        });
    }

    window.PdfWorksheet = { load, create, sanitize, slug, teilUsable, teilLoesungen, writeLoesung, lesenTeile, lesenLoesungen };
})();
