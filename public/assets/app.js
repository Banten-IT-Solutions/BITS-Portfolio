// Nurul Imam — minimal site interactions (no framework).
(function () {
  // Lenis smooth scroll (mirrors mhdalif.id: duration 1.05, smoothWheel)
  if (typeof Lenis !== 'undefined' && !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    var lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }
})();

(function () {
  // Theme toggle (light / dark)
  var themeBtn = document.querySelector('.theme-trigger');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var html = document.documentElement;
      if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        try { localStorage.setItem('theme', 'light'); } catch (e) {}
      } else {
        html.classList.add('dark');
        try { localStorage.setItem('theme', 'dark'); } catch (e) {}
      }
    });
  }

  // Mobile menu
  var menuBtn = document.querySelector('.mobile-menu-trigger');
  var navLinks = document.querySelector('.nav nav');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      menuBtn.classList.toggle('is-open');
      navLinks.classList.toggle('is-open');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        menuBtn.classList.remove('is-open');
        navLinks.classList.remove('is-open');
      }
    });
  }

  // Share buttons
  document.querySelectorAll('[data-share]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var url = btn.getAttribute('data-share');
      var done = function () {
        var old = btn.innerHTML;
        btn.textContent = 'Copied ✓';
        setTimeout(function () { btn.innerHTML = old; }, 1600);
      };
      if (navigator.share) {
        navigator.share({ url: url }).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(done, done);
      } else {
        done();
      }
    });
  });

  // Search + filter on collection pages
  var grid = document.querySelector('[data-filter-grid]');
  if (grid) {
    var input = document.querySelector('[data-filter-input]');
    var items = Array.prototype.slice.call(grid.querySelectorAll('.filter-item'));
    var filterBtn = document.querySelector('.blog-sort-trigger');
    var activeCat = null;

    // build category chips from data
    var cats = [];
    items.forEach(function (it) {
      var c = it.getAttribute('data-cat');
      if (c && cats.indexOf(c) < 0) cats.push(c);
    });

    var panel = document.createElement('div');
    panel.className = 'filter-panel';
    panel.style.display = 'none';
    ['all'].concat(cats).forEach(function (c, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'filter-chip' + (i === 0 ? ' is-active' : '');
      b.textContent = c === 'all' ? 'All' : c;
      b.addEventListener('click', function () {
        activeCat = c === 'all' ? null : c;
        panel.querySelectorAll('.filter-chip').forEach(function (x) { x.classList.remove('is-active'); });
        b.classList.add('is-active');
        apply();
      });
      panel.appendChild(b);
    });
    grid.parentNode.insertBefore(panel, grid);

    if (filterBtn) {
      filterBtn.addEventListener('click', function () {
        panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
      });
    }

    function apply() {
      var q = input ? input.value.trim().toLowerCase() : '';
      items.forEach(function (it) {
        var cat = it.getAttribute('data-cat') || '';
        var text = it.getAttribute('data-search') || '';
        var okCat = !activeCat || cat === activeCat;
        var okQ = !q || text.indexOf(q) >= 0;
        it.style.display = okCat && okQ ? '' : 'none';
      });
    }
    if (input) input.addEventListener('input', apply);
  }

  // GitHub contributions graph
  var graph = document.getElementById('github-graph');
  if (graph) {
    var subtext = document.querySelector('.github-subtext');
    fetch('/api/github-contributions')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d.success || !d.weeks || !d.weeks.length) { if (subtext) subtext.textContent = 'Unavailable right now.'; return; }
        if (subtext) subtext.innerHTML = '<em>' + Number(d.total).toLocaleString('en-US') + '</em> contributions in the last year';
        var grid = document.createElement('div');
        grid.className = 'github-graph-grid';
        d.weeks.forEach(function (week) {
          var col = document.createElement('div');
          col.className = 'github-graph-col';
          week.forEach(function (day) {
            var s = document.createElement('div');
            s.className = 'github-square level-' + (day.level || 0);
            s.title = day.date + ' — ' + day.count + ' contributions';
            col.appendChild(s);
          });
          grid.appendChild(col);
        });
        graph.appendChild(grid);
      })
      .catch(function () { if (subtext) subtext.textContent = 'Unavailable right now.'; });
  }
})();