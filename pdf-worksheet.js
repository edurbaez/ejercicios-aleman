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

    window.PdfWorksheet = { load, create, sanitize, slug };
})();
