// Smooth scrolling for #anchors (only if they exist on current page)
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Collapsible submenus
document.querySelectorAll('.sidebar nav li.has-sub > a').forEach(link => {
    link.addEventListener('click', e => {
        // Only toggle if it's a real submenu trigger (no href or same page)
        if (!link.getAttribute('href') || link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
        }
        const parent = link.parentElement;
        parent.classList.toggle('active');
    });
});

// Random Hávamál quote (with fallback)
window.addEventListener('DOMContentLoaded', () => {
    const quoteEl = document.getElementById('havamal-quote');
    if (!quoteEl) return;

    fetch('https://odin-api.orlog.workers.dev/havamal/english/random') 
        .then(res => {
            if (!res.ok) throw new Error('API error');
            return res.json();
        })
        .then(data => {
            const text = data.stanza || data.text || 'Wisdom is better than weapons...';
            quoteEl.textContent = text;
        })
        .catch(err => {
            console.warn('Failed to load quote:', err);
            quoteEl.textContent = '“The coward believes he will live forever if he holds back in the battle, but in old age he shall have no peace though spears have spared his limbs.”';
        });
});