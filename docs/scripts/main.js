document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.querySelector('.content');
    const quoteEl = document.getElementById('havamal-quote');

    // Utility: Update the footer quote
    async function updateFooterQuote() {
        if (!quoteEl) return;
        try {
            const response = await fetch('https://odin-api.orlog.workers.dev/havamal/english/random');
            const data = await response.json();
            quoteEl.textContent = Array.isArray(data) ? data[0].trim() : data.trim();
        } catch (err) {
            quoteEl.textContent = '“A verse could not be fetched… but wisdom remains.”';
        }
    }

    // Surgical Injection Logic
    async function injectContent(url) {
        contentContainer.style.opacity = '0';

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("File not found");
            const html = await response.text();

            setTimeout(() => {
                // Use DOMParser to handle both full HTML files and fragments
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                // If the fetched file has a .content div, take only that.
                // Otherwise, take the whole body (for fragments).
                const newContent = doc.querySelector('.content') || doc.body;
                
                contentContainer.innerHTML = newContent.innerHTML;
                
                contentContainer.style.opacity = '1';
                window.scrollTo(0, 0);
                updateFooterQuote();
            }, 300);
        } catch (err) {
            console.error("Injection error:", err);
            // On GitHub Pages, if AJAX fails, we don't want to leave it empty
            window.location.href = url; 
        }
    }

    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link || !link.href) return;

        const url = new URL(link.href);
        
        // Only intercept if it's the same domain and ends in .html
        if (url.origin === window.location.origin && url.pathname.endsWith('.html')) {
            // If it's just an anchor on the current visual page, let it scroll
            if (url.hash && url.pathname === window.location.pathname) return;

            e.preventDefault();
            
            // Handle Sidebar active states
            const parentLi = link.parentElement;
            if (parentLi?.classList.contains('has-sub')) {
                document.querySelectorAll('.has-sub').forEach(li => li.classList.remove('active'));
                parentLi.classList.add('active');
            }

            injectContent(link.href);
            history.pushState(null, '', link.href);
        }
    });

    window.addEventListener('popstate', () => {
        injectContent(window.location.href);
    });

    updateFooterQuote();
});