document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.querySelector('.content');
    const quoteEl = document.getElementById('havamal-quote');

    // 1. Function to update only the footer wisdom
    async function updateFooterQuote() {
        if (!quoteEl) return;
        try {
            const response = await fetch('https://odin-api.orlog.workers.dev/havamal/english/random');
            const data = await response.json();
            quoteEl.textContent = Array.isArray(data) ? data[0].trim() : data.trim();
        } catch (err) { console.error("Quote error"); }
    }

    // 2. The core injection function
    async function injectContent(url) {
        // Fade out ONLY the content
        contentContainer.style.opacity = '0';

        try {
            const response = await fetch(url);
            const html = await response.text();

            // We use a timeout to let the fade-out finish
            setTimeout(() => {
                // If the file is a full HTML, we extract .content
                // If the file is just a fragment, we inject it directly
                if (html.includes('<main')) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    contentContainer.innerHTML = doc.querySelector('.content').innerHTML;
                } else {
                    contentContainer.innerHTML = html;
                }

                contentContainer.style.opacity = '1';
                window.scrollTo(0, 0);
                updateFooterQuote();
            }, 300);
        } catch (err) {
            console.error("Could not load fragment:", err);
        }
    }

    // 3. Event Listener for Navigation
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');

        // Rule: Only intercept internal .html links
        if (href && href.endsWith('.html') && !href.startsWith('http')) {
            e.preventDefault();
            
            // Sidebar UI logic: close others, open this one
            const parentLi = link.parentElement;
            if (parentLi?.classList.contains('has-sub')) {
                document.querySelectorAll('.has-sub').forEach(li => li.classList.remove('active'));
                parentLi.classList.add('active');
            }

            // Perform the injection
            injectContent(href);
            
            // Update URL without reloading
            history.pushState(null, '', href);
        }
    });

    // Initial load
    updateFooterQuote();
});