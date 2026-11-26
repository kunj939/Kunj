(function () {
  // Soft spotlight that follows the cursor (desktop only)
  var spot = document.getElementById('spot');
  if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', function (e) {
      spot.style.background = 'radial-gradient(600px at ' + e.clientX + 'px ' + e.clientY + 'px, rgba(20, 184, 166, 0.07), transparent 80%)';
    });
  }

  // Highlight the nav item for the section in view
  var links = document.querySelectorAll('.nav');
  var sections = document.querySelectorAll('main section[id]');
  function setActive(id) {
    links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + id); });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }
  setActive('about');

  // "Let's work together" popup with email and WhatsApp options
  var modal = document.getElementById('modal');
  function open() { modal.hidden = false; setTimeout(function () { document.getElementById('mailBtn').focus(); }, 50); }
  function close() { modal.hidden = true; }
  document.querySelectorAll('[data-open]').forEach(function (b) { b.addEventListener('click', open); });
  document.querySelectorAll('[data-close]').forEach(function (b) { b.addEventListener('click', close); });
  modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) close(); });
})();
