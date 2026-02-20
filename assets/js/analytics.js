/* ===================================================================
   GUIDONIA MARKETING — analytics.js
   GA4 + Microsoft Clarity snippets
   Sostituisci i placeholder con gli ID reali prima del deploy.
   =================================================================== */

/* ── GOOGLE ANALYTICS 4 ──────────────────────────────────────────
   1. Vai su https://analytics.google.com
   2. Crea una proprietà GA4 per guidoniamarketing.agency
   3. Sostituisci 'G-XXXXXXXXXX' con il tuo Measurement ID
   ─────────────────────────────────────────────────────────────── */
(function () {
    var GA4_ID = 'G-XXXXXXXXXX'; // ← SOSTITUISCI CON IL TUO ID

    // Caricamento asincrono di gtag.js
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA4_ID, {
        // Ottimizzazioni consigliate
        send_page_view: true,
        cookie_flags: 'SameSite=None;Secure',
    });

    // Traccia click sul pulsante WhatsApp
    document.addEventListener('DOMContentLoaded', function () {
        var waBtns = document.querySelectorAll('.whatsapp-btn, .btn-whatsapp-cta');
        waBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                gtag('event', 'whatsapp_click', {
                    event_category: 'engagement',
                    event_label: 'whatsapp_contact',
                });
            });
        });

        // Traccia submit del form lead
        var leadForm = document.getElementById('leadForm');
        if (leadForm) {
            leadForm.addEventListener('submit', function () {
                var budget = leadForm.querySelector('input[name="budget"]:checked');
                var fatturato = leadForm.querySelector('input[name="fatturato"]:checked');
                gtag('event', 'generate_lead', {
                    event_category: 'form',
                    event_label: 'lead_form_submit',
                    budget_range: budget ? budget.value : 'n/a',
                    fatturato_range: fatturato ? fatturato.value : 'n/a',
                });
            });
        }
    });
})();

/* ── MICROSOFT CLARITY ───────────────────────────────────────────
   1. Vai su https://clarity.microsoft.com
   2. Crea un progetto per guidoniamarketing.agency
   3. Sostituisci 'XXXXXXXXXX' con il tuo Project ID
   ─────────────────────────────────────────────────────────────── */
(function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1;
    t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
})(window, document, 'clarity', 'script', 'XXXXXXXXXX'); // ← SOSTITUISCI CON IL TUO ID
