/* Aleck Abacan OJT e-portfolio: interactions (moved out of index.html for FINT109 Activity 1) */
(function () {
  /* JavaScript is running: switch off the no-JS fallbacks in style.css */
  document.documentElement.classList.remove('no-js');

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Mobile menu */
  var menuBtn = document.getElementById('menu-btn'), nav = document.getElementById('nav');
  menuBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  });

  /* Active section in nav */
  var links = Array.prototype.slice.call(nav.querySelectorAll('a'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['home', 'about', 'experience', 'projects', 'skills', 'activities', 'achievements', 'education', 'contact'].forEach(function (id) {
      var el = document.getElementById(id); if (el) io.observe(el);
    });
  }

  /* Rotating role word */
  var words = ['regulatory monitoring tools', 'compliance automation', 'data pipelines for risk teams', 'training that builds itself'];
  var wEl = document.getElementById('rot-word'), wi = 0;
  if (!reduce) {
    setInterval(function () {
      wEl.classList.add('out');
      setTimeout(function () { wi = (wi + 1) % words.length; wEl.textContent = words[wi]; wEl.classList.remove('out'); }, 300);
    }, 2800);
  }

  /* Photo tilt */
  var card = document.getElementById('photo-card');
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = 'perspective(900px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg)';
    });
    card.addEventListener('mouseleave', function () { card.style.transform = ''; });
  }

  /* RegWatch terminal replay */
  var lines = [
    ['', '<span class="d">$</span> python regwatch.py'],
    ['fetch', '<span class="d">fetch </span> bsp/issuances ............ <span class="ok">ok</span>'],
    ['fetch', '<span class="d">fetch </span> bsp/exposure-drafts ...... <span class="ok">ok</span>'],
    ['fetch', '<span class="d">fetch </span> sec/advisories (json) .... <span class="ok">ok</span>'],
    ['fetch', '<span class="d">fetch </span> amlc/resolutions (json) .. <span class="ok">ok</span>'],
    ['fetch', '<span class="d">fetch </span> fatf/publications ........ <span class="ok">ok</span>'],
    ['fetch', '<span class="d">fetch </span> unsc/list-updates ........ <span class="ok">ok</span>'],
    ['fetch', '<span class="d">  …    18 more sources</span>'],
    ['extract', '<span class="d">parse </span> one item per document'],
    ['diff', '<span class="d">diff  </span> 24 sources · <span class="w">1 new item</span>'],
    ['dedupe', '<span class="d">dedupe</span> ledger check ............. <span class="ok">new</span>'],
    ['summ', '<span class="d">summ  </span> on-device model · 2 sentences'],
    ['post', '<span class="d">post  </span> Slack daily thread ....... <span class="ok">sent</span>'],
    ['', '<span class="a">✓ run complete in 94 s</span>']
  ];
  var out = document.getElementById('term-out'), runBtn = document.getElementById('run-btn');
  var steps = Array.prototype.slice.call(document.querySelectorAll('#pipeline li'));
  function light(step) { steps.forEach(function (li) { li.classList.toggle('lit', li.getAttribute('data-step') === step); }); }
  function renderAll() { out.innerHTML = lines.map(function (l) { return l[1]; }).join('\n'); }
  renderAll();
  var timer = null;
  runBtn.addEventListener('click', function () {
    if (reduce) { renderAll(); return; }
    clearTimeout(timer); runBtn.disabled = true; out.innerHTML = ''; var i = 0;
    (function next() {
      if (i >= lines.length) { light(null); runBtn.disabled = false; runBtn.textContent = '▶ Replay run'; return; }
      out.innerHTML += (i ? '\n' : '') + lines[i][1];
      if (lines[i][0]) light(lines[i][0]);
      i++; timer = setTimeout(next, 260);
    })();
    runBtn.textContent = 'running…';
  });

  /* Skill tabs */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function selectTab(t) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute('aria-selected', on ? 'true' : 'false');
      x.tabIndex = on ? 0 : -1;
      document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
    });
  }
  tabs.forEach(function (t, idx) {
    t.addEventListener('click', function () { selectTab(t); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        var n = tabs[(idx + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
        selectTab(n); n.focus(); e.preventDefault();
      }
    });
  });

  /* Certificate filters */
  var fBtns = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
  var certs = Array.prototype.slice.call(document.querySelectorAll('#certs .cert'));
  var countEl = document.getElementById('cert-count');
  fBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-filter'), n = 0;
      fBtns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      certs.forEach(function (c) { var show = f === 'all' || c.getAttribute('data-cat') === f; c.hidden = !show; if (show) n++; });
      countEl.textContent = n + (n === 1 ? ' certificate' : ' certificates');
    });
  });

  /* Copy email */
  var copyBtn = document.getElementById('copy-email'), emailEl = document.getElementById('email-val');
  copyBtn.addEventListener('click', function () {
    function selectIt() {
      var r = document.createRange(); r.selectNodeContents(emailEl);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      copyBtn.textContent = 'Press ⌘/Ctrl+C';
    }
    try {
      navigator.clipboard.writeText(emailEl.textContent.trim()).then(function () {
        copyBtn.textContent = 'Copied'; setTimeout(function () { copyBtn.textContent = 'Copy'; }, 1800);
      }, selectIt);
    } catch (e) { selectIt(); }
  });

  /* Contact form */
  var form = document.getElementById('contact-form'), statusEl = document.getElementById('form-status');
  var fields = [
    ['cf-name', 'err-name', function (v) { return v.trim().length >= 2 ? '' : 'Please enter your name.'; }],
    ['cf-email', 'err-email', function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Please enter a valid email address.'; }],
    ['cf-msg', 'err-msg', function (v) { return v.trim().length >= 10 ? '' : 'Please write a message of at least 10 characters.'; }]
  ];
  function check(f) {
    var el = document.getElementById(f[0]), msg = f[2](el.value);
    document.getElementById(f[1]).textContent = msg;
    el.parentNode.classList.toggle('bad', !!msg);
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }
  fields.forEach(function (f) {
    document.getElementById(f[0]).addEventListener('blur', function () { check(f); });
    document.getElementById(f[0]).addEventListener('input', function () { if (this.parentNode.classList.contains('bad')) check(f); });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    statusEl.className = 'form-status'; statusEl.textContent = '';
    var ok = fields.map(check).every(Boolean);
    if (!ok) { var firstBad = form.querySelector('[aria-invalid="true"]'); if (firstBad) firstBad.focus(); return; }
    var name = document.getElementById('cf-name').value.trim().split(' ')[0];
    if (/\.netlify\.app$/.test(location.hostname)) {
      var btn = document.getElementById('cf-send'); btn.disabled = true; btn.textContent = 'Sending…';
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(form)).toString() })
        .then(function (r) { if (!r.ok) throw new Error(r.status); form.reset(); statusEl.textContent = 'Thanks, ' + name + '! Your message was sent.'; })
        .catch(function () { statusEl.className = 'form-status warn'; statusEl.textContent = 'Your message could not be sent. Please email me at aleck1792@gmail.com.'; })
        .then(function () { btn.disabled = false; btn.textContent = 'Send message'; });
    } else {
      statusEl.className = 'form-status warn';
      statusEl.textContent = 'Thanks, ' + name + '! This copy of my portfolio cannot send messages, so please email me at aleck1792@gmail.com.';
    }
  });

  /* Back to top */
  var toTop = document.getElementById('to-top');
  window.addEventListener('scroll', function () { toTop.classList.toggle('hide', window.scrollY < 600); }, { passive: true });
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
})();
