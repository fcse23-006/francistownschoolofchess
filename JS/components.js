/**
 * components.js — FSC footer and navbar loader
 *
 * Usage on every page:
 *
 *   <!-- In <head> -->
 *   <script src="JS/components.js" defer></script>
 *
 *   <!-- Where you want the navbar -->
 *   <div id="navbar-placeholder"></div>
 *
 *   <!-- Where you want the footer -->
 *   <div id="footer-placeholder"></div>
 *
 * The script auto-loads navbar.html → #navbar-placeholder
 * and footer.html → #footer-placeholder.
 *
 * To mark the current page as active in the nav, add
 *   data-page="filename.html"
 * to your <body> tag, e.g.:  <body data-page="programs.html">
 * If omitted, the script infers from window.location.
 */

(async function () {
    /**
     * Fetch an HTML fragment and inject it into a target element.
     * @param {string} url      - Path to the HTML file (e.g. 'navbar.html')
     * @param {string} targetId - ID of the placeholder element
     */
    async function loadComponent(url, targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;                          // placeholder not on this page

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const html = await res.text();

            // Insert the HTML
            target.innerHTML = html;

            // Run any <script> tags inside the injected HTML
            target.querySelectorAll('script').forEach(oldScript => {
                const newScript = document.createElement('script');
                [...oldScript.attributes].forEach(attr =>
                    newScript.setAttribute(attr.name, attr.value)
                );
                newScript.textContent = oldScript.textContent;
                oldScript.replaceWith(newScript);
            });
        } catch (err) {
            console.warn(`[components.js] Could not load "${url}":`, err);
        }
    }

    // Wait until DOM is ready (defer handles this, but just in case)
    if (document.readyState === 'loading') {
        await new Promise(r => document.addEventListener('DOMContentLoaded', r, { once: true }));
    }

    // Load navbar & footer in parallel
    await Promise.all([
        loadComponent('navbar.html', 'navbar-placeholder'),
        loadComponent('footer.html', 'footer-placeholder'),
    ]);

    // ---- Active link: prefer data-page on <body>, else infer from pathname ----
    const page = document.body.dataset.page
        || window.location.pathname.split('/').pop()
        || 'index.html';

    document.querySelectorAll('#navLinks a, #drawerLinks a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === page);
    });
})();