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

  // Terminal — understands plain questions, typos and synonyms
  var A = {
    help: 'Ask me anything about Kunjbihari — or tap a button below. Try: about, experience, education, projects, research, skills, hobbies, contact.',
    about: 'Kunjbihari — Associate Consultant & Engineer at NRI (Nomura Research Institute), Gurugram. Built NRI\'s first in-house AI platform. 5+ high-quality projects delivered with advanced engineering. Founder of Yaitro and TableBloom.',
    experience: 'NRI Group — Associate Consultant & Engineer, AI (Jun 2026 – now): built NRI\'s first in-house AI platform on an E2E GPU server.\nGoa Institute of Management — Data Engineer / Applied AI Intern (May – Jul 2025): sentiment-risk data pipeline, NER, fuzzy matching.\nIIT Bombay — Placement Interview Coordinator (Oct – Dec 2024).',
    education: 'IIT Bombay — Master\'s, Applied Statistics & Informatics (2024–26)\nBIT Mesra — B.Sc. Physics (Hons.) (2021–24)\nCertifications — Bloomberg Market Concepts, Finance Fundamentals, Spreadsheet Analysis.',
    nri: 'At NRI I took a brand-new E2E Networks GPU server and set it up from scratch, deployed LLMs that run fully offline, and built the whole platform on top — agents, interface, everything.',
    projects: 'LIA — NRI\'s first in-house AI platform (offline LLMs, GPU server, AI agents)\nYaitro — AI trip planner → yaitro.com\nTableBloom — software for restaurants → tablebloom.in',
    yaitro: 'Yaitro turns a destination and a few preferences into a complete day-by-day trip — India and abroad. Built on the India Travel Knowledge Tree. → yaitro.com',
    tablebloom: 'TableBloom — a SaaS product that helps restaurants run day-to-day operations from one place. → tablebloom.in',
    research: 'λ-Fusion clustering of student feedback + a Difficulty-Weighted Anger Index. Co-authored with Tanmay Shah. In preparation for Machine Learning with Applications (Elsevier).',
    tanmay: 'Tanmay Shah — co-author, friend and fellow cluster whisperer → linkedin.com/in/tanmay-shah-80a029229',
    skills: 'Offline LLMs · RAG · AI agents · GPU infrastructure · Python · SQL · Java · React.js · FastAPI · NLP · Transformers · Machine learning · Statistical modelling.',
    hobbies: 'Watching cricket · playing basketball · listening to rap · writing shayari (first original sher: still loading… 3%)',
    shayari: 'Error 404: original shayari not found. Still working on it.',
    contact: 'Email: Kunj07382@gmail.com · Kunj-bihari@yaitro.com · kunjbihari.k@nriindia.co.in\nWhatsApp: +91 63752 92488 → wa.me/916375292488\nOr type "hire" to open the contact form.',
    socials: 'LinkedIn: linkedin.com/in/kvmeena · Instagram: instagram.com/its_kvmeena · WhatsApp: +91 63752 92488',
    resume: 'Résumé PDF coming soon — meanwhile, type "hire" and I\'ll send it over.',
    location: 'Based in Gurugram, India.',
    hire: 'Excellent choice. Opening the contact form…',
    hello: 'Hey there! 👋 Ask me about Kunjbihari — projects, experience, education, or how to hire him.',
    thanks: 'Anytime! Type "hire" if you\'d like to work together.',
    party: 'Confetti deployed. Thanks for visiting!'
  };
  // keywords → answer (checked in order; whole words or phrases)
  var K = [
    ['hire', ['hire', 'sudo hire', 'work with you', 'work together', 'collaborate', 'freelance', 'available', 'project for me', 'build for me', 'quote']],
    ['resume', ['resume', 'résumé', 'cv', 'biodata']],
    ['contact', ['contact', 'email', 'mail', 'phone', 'number', 'call', 'reach', 'whatsapp', 'connect', 'talk']],
    ['socials', ['social', 'socials', 'linkedin', 'instagram', 'insta', 'github', 'twitter']],
    ['tanmay', ['tanmay', 'co author', 'coauthor', 'co-author']],
    ['research', ['research', 'paper', 'publication', 'published', 'journal', 'elsevier', 'dwai', 'lambda', 'λ', 'clustering', 'thesis']],
    ['yaitro', ['yaitro', 'trip', 'travel', 'itinerary', 'knowledge tree']],
    ['tablebloom', ['tablebloom', 'table bloom', 'restaurant', 'restaurants']],
    ['nri', ['nri', 'nomura', 'lia', 'gpu', 'server', 'e2e', 'offline', 'platform', 'infrastructure', 'infra']],
    ['projects', ['project', 'projects', 'portfolio', 'built', 'build', 'products', 'product', 'work samples']],
    ['experience', ['experience', 'job', 'jobs', 'work', 'working', 'company', 'career', 'role', 'intern', 'internship', 'gim', 'employer', 'current']],
    ['education', ['education', 'degree', 'degrees', 'qualification', 'qualifications', 'qualified', 'college', 'university', 'study', 'studied', 'iit', 'iitb', 'bombay', 'bit', 'mesra', 'masters', 'master', 'msc', 'bsc', 'school', 'graduate', 'certification', 'certifications', 'bloomberg']],
    ['skills', ['skill', 'skills', 'stack', 'tech', 'technologies', 'tools', 'languages', 'python', 'rag', 'llm', 'llms', 'ai', 'ml', 'expertise']],
    ['shayari', ['shayari', 'sher', 'poetry', 'poem']],
    ['hobbies', ['hobby', 'hobbies', 'free time', 'fun', 'interests', 'cricket', 'basketball', 'rap', 'music', 'sports']],
    ['location', ['where', 'location', 'city', 'based', 'live', 'gurugram', 'gurgaon']],
    ['thanks', ['thanks', 'thank you', 'thx', 'great', 'awesome', 'cool', 'nice']],
    ['hello', ['hi', 'hello', 'hey', 'namaste', 'yo', 'hola']],
    ['about', ['about', 'who', 'whoami', 'yourself', 'introduce', 'intro', 'kunj', 'kunjbihari', 'name', 'bio', 'summary']],
    ['party', ['party', 'confetti', 'celebrate']],
    ['help', ['help', 'commands', 'menu', 'options', 'what can i ask', '?']]
  ];
  function norm(t) { return (' ' + t.toLowerCase().replace(/[^a-z0-9λé\s-]/g, ' ').replace(/\s+/g, ' ').trim() + ' '); }
  function lev(a, b) { var m = [], i, j; for (i = 0; i <= b.length; i++) m[i] = [i]; for (j = 0; j <= a.length; j++) m[0][j] = j;
    for (i = 1; i <= b.length; i++) for (j = 1; j <= a.length; j++) m[i][j] = b[i-1] === a[j-1] ? m[i-1][j-1] : 1 + Math.min(m[i-1][j-1], m[i][j-1], m[i-1][j]); return m[b.length][a.length]; }
  function intent(raw) {
    if (raw.trim() === '?') return 'help';
    var n = norm(raw), i, j;
    for (i = 0; i < K.length; i++) for (j = 0; j < K[i][1].length; j++) if (n.indexOf(' ' + K[i][1][j] + ' ') !== -1) return K[i][0];
    // typo tolerance: compare each word with keywords of length ≥ 4
    var words = n.trim().split(' ');
    for (i = 0; i < K.length; i++) for (j = 0; j < K[i][1].length; j++) {
      var k = K[i][1][j]; if (k.length < 4 || k.indexOf(' ') !== -1) continue;
      for (var w = 0; w < words.length; w++) if (words[w].length >= 4 && lev(words[w], k) <= (k.length > 6 ? 2 : 1)) return K[i][0];
    }
    return null;
  }
  var term = $('term'), termBtn = $('termBtn'), lines = $('termLines'), cmd = $('cmd');
  function addLine(text, color) { var d = document.createElement('div'); d.style.whiteSpace = 'pre-wrap'; d.style.color = color; d.textContent = text; lines.appendChild(d); lines.scrollTop = lines.scrollHeight; }
  function run(input) {
    var raw = input.trim(); if (!raw) return;
    if (/^(clear|cls)$/i.test(raw)) { lines.innerHTML = ''; return; }
    addLine('$ ' + raw, '#34D399');
    var it = intent(raw);
    addLine(it ? A[it] : 'Hmm, I didn\'t catch that. Try asking about his experience, education, projects or how to contact him — or tap a button below.', it ? '#E5E5E5' : '#FBBF24');
    if (it === 'hire') openForm();
    if (it === 'party') boom();
  }
  // quick-tap chips
  var chips = document.createElement('div');
  chips.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;padding:10px 14px 0;border-top:1px solid #2A2A2A';
  ['about', 'experience', 'education', 'projects', 'research', 'skills', 'hobbies', 'contact', 'hire'].forEach(function (c) {
    var b = document.createElement('button'); b.type = 'button'; b.textContent = c;
    b.style.cssText = 'background:#1F1F1F;color:#E5E5E5;border:1px solid #3A3A3A;border-radius:999px;padding:6px 12px;font:inherit;font-size:12px;cursor:pointer';
    b.addEventListener('mouseenter', function () { b.style.background = '#34D399'; b.style.color = '#111111'; });
    b.addEventListener('mouseleave', function () { b.style.background = '#1F1F1F'; b.style.color = '#E5E5E5'; });
    b.addEventListener('click', function () { run(c); });
    chips.appendChild(b);
  });
  $('termForm').parentNode.insertBefore(chips, $('termForm'));
  $('termForm').style.borderTop = '0';
  cmd.placeholder = 'ask anything, e.g. "what did you study?"';
  addLine('Hi! Ask me anything about Kunjbihari — in plain words — or tap a button below.', '#A3A3A3');
  termBtn.addEventListener('click', function () {
    term.hidden = !term.hidden;
    termBtn.textContent = term.hidden ? '>_ ask my terminal' : '× close';
    if (!term.hidden) cmd.focus();
  });
  $('termForm').addEventListener('submit', function (e) { e.preventDefault(); var v = cmd.value; cmd.value = ''; run(v); });
})();
