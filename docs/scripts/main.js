document.addEventListener('DOMContentLoaded', () => {
  console.log('ODINN API Docs loaded - Version 1.0.1');
    const contentContainer = document.querySelector('.content');
    const quoteEl = document.getElementById('havamal-quote');

    // --- 1. Wisdom Quote Logic ---
    async function updateFooterQuote() {
        if (!quoteEl) return;
        try {
            const response = await fetch('https://odin-api.orlog.workers.dev/havamal/english/random');
            const data = await response.json();
            quoteEl.textContent = Array.isArray(data) ? data[0].trim() : data.trim();
        } catch (err) {
            quoteEl.textContent = '“Wisdom remains, even when the connection fails.”';
        }
    }

    // --- 2. Surgical Injection Logic ---
    async function injectFragment(filePath) {
        // Fade out transition
        contentContainer.style.opacity = '0';

        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error("Fragment not found");
            const htmlText = await response.text();

            const parser = new DOMParser();
            const externalDoc = parser.parseFromString(htmlText, 'text/html');
            
            // We look for the .content div in the target file
            const newContent = externalDoc.querySelector('.content');

            setTimeout(() => {
                if (newContent) {
                    contentContainer.innerHTML = newContent.innerHTML;
                } else {
                    // If target is already a fragment (no .content div), inject raw
                    contentContainer.innerHTML = htmlText;
                }

                contentContainer.style.opacity = '1';
                window.scrollTo(0, 0);
                updateFooterQuote(); // Refresh wisdom every time we change section
            }, 300);

        } catch (err) {
            console.error("Injection failed:", err);
            contentContainer.style.opacity = '1';
        }
    }

    // --- 3. Click Listener (Buttons only) ---
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.nav-link');
        if (!btn) return;

        const targetFile = btn.getAttribute('data-target');
        if (!targetFile) return;

        // Manage Sidebar Folders (Toggle active class)
        const parentLi = btn.parentElement;
        if (parentLi && parentLi.classList.contains('has-sub')) {
            // Close other folders
            document.querySelectorAll('.has-sub').forEach(li => {
                if (li !== parentLi) li.classList.remove('active');
            });
            parentLi.classList.add('active');
        }

        // Execute Injection
        injectFragment(targetFile);
    });

    // Initial Quote Load
    updateFooterQuote();
});