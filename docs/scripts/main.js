// Smooth scrolling only for anchors that exist on the current page
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // Anchor not found on this page → do nothing (prevents error)
            console.log(`Anchor not found on this page: ${targetId}`);
        }
    });
});

// Toggle submenus (only when clicking on parent with children)
document.querySelectorAll('.sidebar nav li.has-sub > a').forEach(link => {
    link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        // If it points to another page, let navigation happen normally
        if (href && !href.startsWith('#') && href !== 'index.html' && href !== '') {
            return;
        }
        // Otherwise toggle submenu
        e.preventDefault();
        link.parentElement.classList.toggle('active');
    });
});

// Load random Hávamál quote
document.addEventListener('DOMContentLoaded', () => {
    const quoteEl = document.getElementById('havamal-quote');
    if (!quoteEl) return;

    const apiUrl = 'https://odin-api.orlog.workers.dev/havamal/english/random';

    fetch(apiUrl, { mode: 'cors' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // API returns an array → take first element
            let stanza = '';
            if (Array.isArray(data) && data.length > 0) {
                stanza = data[0].trim();
            } else if (typeof data === 'string') {
                stanza = data.trim();
            }

            quoteEl.textContent = stanza || '“The wise man is not showy about his knowledge…”';
        })
        .catch(err => {
            console.error('Failed to load Hávamál quote:', err);
            quoteEl.textContent = '“A verse could not be fetched… but wisdom remains.”';
        });
});