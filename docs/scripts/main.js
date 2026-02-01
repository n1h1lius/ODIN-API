document.addEventListener('DOMContentLoaded', () => {
    // Select the main persistent UI containers
    const contentContainer = document.querySelector('.content');
    const quoteEl = document.getElementById('havamal-quote');

    /**
     * Fetches a random stanza for the footer.
     * Runs on initial load and after every page injection.
     */
    async function updateFooterQuote() {
        if (!quoteEl) return;
        try {
            const response = await fetch('https://odin-api.orlog.workers.dev/havamal/english/random');
            const data = await response.json();
            // API might return an array or a string
            const stanza = Array.isArray(data) ? data[0].trim() : data.trim();
            quoteEl.textContent = stanza;
        } catch (err) {
            console.error('Wisdom fetch failed:', err);
            quoteEl.textContent = '“A verse could not be fetched… but wisdom remains.”';
        }
    }

    /**
     * Surgical Scraper: Fetches an HTML file, extracts the .content div,
     * and injects it into the current page.
     */
    async function scrapAndInject(filePath) {
        // Visual feedback: Start fade-out ONLY for the content area
        contentContainer.style.opacity = '0';

        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const htmlText = await response.text();

            // Parse the string into a temporary DOM object
            const parser = new DOMParser();
            const externalDoc = parser.parseFromString(htmlText, 'text/html');
            
            // Look for the .content section in the external file
            const newContent = externalDoc.querySelector('.content');

            if (newContent) {
                // Wait for the CSS transition (0.3s) before swapping the HTML
                setTimeout(() => {
                    // Update ONLY the inner content of the main container
                    contentContainer.innerHTML = newContent.innerHTML;
                    
                    // Update browser title
                    document.title = externalDoc.title || "ODINN API";

                    // Trigger fade-in
                    contentContainer.style.opacity = '1';
                    
                    // Reset scroll to top of the new section
                    window.scrollTo(0, 0);
                    
                    // Refresh the footer wisdom
                    updateFooterQuote();
                }, 300);
            } else {
                // Fallback if the .content div is not found in the target file
                console.warn('Selector .content not found in the target file.');
                //window.location.href = filePath;
            }
        } catch (err) {
            console.error("Scraping failed:", err);
            // Fallback: If fetch fails (like CORS or 404), do a hard reload
            //window.location.href = filePath;
        }
    }

    /**
     * Global Click Interceptor
     */
    document.addEventListener('click', (e) => {
        // We look for links that have our custom data-target attribute
        const link = e.target.closest('a[data-target]');
        
        if (link) {
            e.preventDefault();
            e.stopPropagation();

            const targetFile = link.getAttribute('data-target');

            // --- Sidebar Folder Management ---
            const parentLi = link.parentElement;
            if (parentLi && parentLi.classList.contains('has-sub')) {
                // Close other open menus to keep the sidebar clean
                document.querySelectorAll('.sidebar nav li.has-sub').forEach(li => {
                    if (li !== parentLi) li.classList.remove('active');
                });
                // Toggle current folder
                parentLi.classList.add('active');
            }

            // Perform the AJAX injection
            scrapAndInject(targetFile);

            // Update the URL in the address bar without reloading the page
            //history.pushState({ path: targetFile }, '', targetFile);
        }

        // --- Standard Anchor Handling (#goals, etc.) ---
        // If a link is clicked that is just an anchor (no data-target)
        const anchorLink = e.target.closest('a[href^="#"]');
        if (anchorLink && !anchorLink.hasAttribute('data-target')) {
            const targetId = anchorLink.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    /**
     * Handle the Browser Back and Forward buttons
     */
    window.addEventListener('popstate', (e) => {
        // Reload the content based on the URL the user returned to
        scrapAndInject(window.location.pathname);
    });

    // Initial run for the footer quote
    updateFooterQuote();
});