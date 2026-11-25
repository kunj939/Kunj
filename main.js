(function () {
  // ===== Settings =====
  var CONTACT_EMAIL = 'Kunj07382@gmail.com';
  var RESUME_URL = ''; // e.g. 'assets/Kunjbihari-Resume.pdf' once you add your résumé

  var $ = function (id) { return document.getElementById(id); };

  // Mouse spotlight + custom cursor
  var spot = $('spot'), cur = $('cur');
  document.addEventListener('mousemove', function (e) {
    spot.style.background = 'radial-gradient(420px circle at ' + e.clientX + 'px ' + e.clientY + 'px, rgba(79,70,229,0.07), transparent 70%)';
    cur.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
  });

  // Live Gurugram clock
  function tick() {
    try { $('clock').textContent = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }); } catch (e) {}
  }
  tick(); setInterval(tick, 20000);

  // Confetti + toast
  var confetti = $('confetti'), ct;
  function boom() { confetti.hidden = true; void confetti.offsetWidth; confetti.hidden = false; clearTimeout(ct); ct = setTimeout(function () { confetti.hidden = true; }, 1700); }
  var toast = $('toast'), tt;
  function showToast() { toast.hidden = false; clearTimeout(tt); tt = setTimeout(function () { toast.hidden = true; }, 3200); }

  // Résumé
  $('resumeBtn').addEventListener('click', function () {
    if (RESUME_URL) { var a = document.createElement('a'); a.href = RESUME_URL; a.download = 'Kunjbihari-Resume.pdf'; document.body.appendChild(a); a.click(); a.remove(); }
    else showToast();
  });

  // Contact modal
  var modal = $('modal'), form = $('contactForm'), err = $('err');
  function openForm() { modal.hidden = false; $('formBox').hidden = false; $('sentBox').hidden = true; err.hidden = true; setTimeout(function () { $('cEmail').focus(); }, 50); }
  function closeForm() { modal.hidden = true; }
  document.querySelectorAll('[data-action="open-form"]').forEach(function (b) { b.addEventListener('click', openForm); });
  document.querySelectorAll('[data-action="close-form"]').forEach(function (b) { b.addEventListener('click', closeForm); });
  modal.addEventListener('click', function (e) { if (e.target === modal) closeForm(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeForm(); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = $('cEmail').value.trim(), msg = $('cMsg').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.hidden = false; return; }
    err.hidden = true;
    var body = 'Hi Kunjbihari,\n\n' + (msg || 'I have a project I would like to discuss.') + '\n\nReach me at: ' + email;
    $('sendLink').href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent('Project enquiry') + '&body=' + encodeURIComponent(body);
    $('sentEmail').textContent = email;
    $('formBox').hidden = true; $('sentBox').hidden = false;
    boom();
  });

  // Terminal
  var R = {
help: 'Commands: whoami, nri, server, projects, tanmay, hobbies, shayari, resume, yaitro, tablebloom, research, education, socials, contact, whatsapp, hire, party, clear',
whoami: 'Kunjbihari — Associate Consultant & Engineer at NRI Group. 5+ high-quality projects delivered. IIT Bombay (Applied Statistics & Informatics), BIT Mesra (Physics).',
nri: 'Built NRI\'s first in-house AI platform: set up an E2E Networks GPU server from scratch, offline LLMs, agents and UI — end to end.',
server: 'E2E Networks GPU server → configured from bare metal → offline LLM serving → LIA platform. All in-house.',
whatsapp: 'Message me on WhatsApp: +91 63752 92488 → wa.me/916375292488',
party: 'Confetti deployed. Thanks for visiting!',
projects: 'LIA (NRI AI platform) · Yaitro (AI trip planner) · TableBloom (restaurant SaaS)',
yaitro: 'Yaitro plans complete day-by-day trips for India and abroad → yaitro.com',
tablebloom: 'TableBloom — SaaS that helps restaurants run day-to-day operations from one place → tablebloom.in',
resume: 'Résumé PDF coming soon — use the Download résumé button on the left once it lands.',
hobbies: 'Watching cricket · playing basketball · listening to rap · writing shayari (first original sher: still loading… 3%)',
shayari: 'Error 404: original shayari not found. Still working on it.',
research: 'λ-Fusion clustering + Difficulty-Weighted Anger Index, co-authored with Tanmay Shah. In preparation for Machine Learning with Applications (Elsevier).',
tanmay: 'Tanmay Shah — co-author, friend and fellow cluster whisperer → linkedin.com/in/tanmay-shah-80a029229',
education: 'IIT Bombay, Master\'s 2024–26 · BIT Mesra, B.Sc. Physics 2021–24',
socials: 'linkedin.com/in/kvmeena · instagram.com/its_kvmeena · WhatsApp +91 63752 92488',
contact: 'Kunj07382@gmail.com · Kunj-bihari@yaitro.com · kunjbihari.k@nriindia.co.in · WhatsApp +91 63752 92488',
hire: 'Excellent choice. Opening the contact form…',
'sudo hire': 'Permission granted. Opening the contact form…'
  };
  var term = $('term'), termBtn = $('termBtn'), lines = $('termLines'), cmd = $('cmd');
  function addLine(text, color) { var d = document.createElement('div'); d.style.whiteSpace = 'pre-wrap'; d.style.color = color; d.textContent = text; lines.appendChild(d); lines.scrollTop = lines.scrollHeight; }
  addLine('Welcome! Type "help" to explore.', '#A3A3A3');
  termBtn.addEventListener('click', function () {
    term.hidden = !term.hidden;
    termBtn.textContent = term.hidden ? '>_ ask my terminal' : '× close';
    if (!term.hidden) cmd.focus();
  });
  $('termForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var c = cmd.value.trim().toLowerCase(); cmd.value = '';
    if (!c) return;
    if (c === 'clear') { lines.innerHTML = ''; return; }
    addLine('$ ' + c, '#34D399');
    addLine(R[c] || ('command not found: ' + c + ' — try "help"'), '#E5E5E5');
    if (c === 'hire' || c === 'sudo hire') openForm();
    if (c === 'party') boom();
  });
})();
