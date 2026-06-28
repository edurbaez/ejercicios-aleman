// config.js — credenciales Supabase compartidas. Cargado antes de auth.js en todas las páginas.
window.SUPA_URL = 'https://mzitpnacjcjpokmiqwtd.supabase.co';
window.SUPA_KEY = 'sb_publishable_y9CSkHLB2haNPnzvP0-RUQ_OF5h3t4I';

// Generar con: npx web-push generate-vapid-keys
// Pegar aquí la PUBLIC key; la PRIVATE key va en Vercel env vars (VAPID_PRIVATE_KEY).
window.VAPID_PUBLIC_KEY = 'BB61TdmIzmCPFobbnpqb_bn4PuZk3BNJMlGPK_7BNWJuKhZ8MCYR-D7dzaj54UXSSNd-o4c4CUSrzLBrLQfJaW8';
