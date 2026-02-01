// Smooth scroll for intra-page links
document.querySelectorAll('.sidebar nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Collapsible menu
document.querySelectorAll('.sidebar nav li.has-sub > a').forEach(link => {
  link.addEventListener('click', e => {
    if (e.target.getAttribute('href') === '#') { // Prevent default only for sub toggles if no href
      e.preventDefault();
    }
    link.parentElement.classList.toggle('active');
  });
});

// Fetch random Hávamál quote on load
window.addEventListener('load', () => {
  fetch('https://odin-api.orlog.workers.dev/havamal/english/random')
    .then(response => response.json())
    .then(data => {
      document.getElementById('havamal-quote').innerText = data.stanza || 'A wise man is not showy about his knowledge; he talks, but not too much.';
    })
    .catch(() => {
      document.getElementById('havamal-quote').innerText = 'Failed to load Hávamál stanza.';
    });
});