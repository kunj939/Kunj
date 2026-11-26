(function () {
  var $ = function (id) { return document.getElementById(id); };

  // Live Gurugram time
  function tick() {
    try { $('clock').textContent = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }); } catch (e) {}
  }
  tick(); setInterval(tick, 20000);

  // Soft spotlight that follows the cursor
  var spot = $('spot');
  if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', function (e) {
      spot.style.background = 'radial-gradient(520px circle at ' + e.clientX + 'px ' + e.clientY + 'px, rgba(10,10,10,0.045), transparent 70%)';
    });
  }

  // Top bar border once the page scrolls
  var top = document.querySelector('.top');
  function onScroll() { top.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Reveal elements as they enter the screen
  var items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Highlight the nav link for the section in view
  var links = document.querySelectorAll('.top nav a');
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    ['about', 'work', 'projects', 'research'].forEach(function (id) { var s = $(id); if (s) so.observe(s); });
  }

  // "Let's work together" popup
  var modal = $('modal');
  function open() { modal.hidden = false; setTimeout(function () { $('mailBtn').focus(); }, 50); }
  function close() { modal.hidden = true; }
  document.querySelectorAll('[data-open]').forEach(function (b) { b.addEventListener('click', open); });
  document.querySelectorAll('[data-close]').forEach(function (b) { b.addEventListener('click', close); });
  modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) close(); });

  // Résumé links: if the PDF isn't uploaded yet, show a friendly note instead of an error page
  var toast = $('toast'), tt;
  function note() { toast.hidden = false; clearTimeout(tt); tt = setTimeout(function () { toast.hidden = true; }, 3200); }
  var resumeLinks = document.querySelectorAll('#resume, [data-resume]');
  var resumeOk = null;
  function checkResume(cb) {
    if (resumeOk !== null) return cb(resumeOk);
    if (location.protocol === 'file:') { resumeOk = false; return cb(false); }
    fetch('Kunjbihari-Resume.pdf', { method: 'HEAD' }).then(function (r) { resumeOk = r.ok; cb(r.ok); }).catch(function () { resumeOk = false; cb(false); });
  }
  resumeLinks.forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (resumeOk === true) return;
      e.preventDefault();
      checkResume(function (ok) { if (ok) window.open(a.href, '_blank', 'noopener'); else note(); });
    });
  });
})();
