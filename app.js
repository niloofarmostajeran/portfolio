/* Static, dependency-free portfolio. All assets are local and paths are relative. */
(() => {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const root = document.documentElement;
  root.classList.add('js');
  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* preferences remain session-local */ } }
  };
  const queryLanguage = new URLSearchParams(location.search).get('lang');
  let language = [queryLanguage, storage.get('nm-language')].find(value => ['en', 'fa'].includes(value)) || 'fa';
  const motionMedia = matchMedia('(prefers-reduced-motion: reduce)');
  const savedMotion = storage.get('nm-motion');
  let paused = savedMotion ? savedMotion === 'paused' : motionMedia.matches;
  let openedProject = null;
  let opener = null;
  const dialog = $('.project-dialog');
  const escape = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const diagrams = index => PORTFOLIO_VISUALS.diagram(index, language);

  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('revealed'); revealObserver.unobserve(entry.target); }
  }), { threshold: .08, rootMargin: '0px 0px -25px 0px' });
  const sceneObserver = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('in-view', entry.isIntersecting)), {threshold:.05});
  let activeLens = 0;
  function selectLens(index) {
    activeLens = index;
    const lens = PORTFOLIO[language].lenses[index];
    $('.lens').dataset.active = index;
    $$('[data-lens]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.lens) === index)));
    $('#lens-title').textContent = lens.title;
    $('#lens-description').textContent = lens.body;
    $('.lens-evidence').textContent = lens.evidence;
  }
  $$('[data-lens]').forEach(button => {
    button.addEventListener('click', () => selectLens(Number(button.dataset.lens)));
    button.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') selectLens(Number(button.dataset.lens)); });
    button.addEventListener('focus', () => selectLens(Number(button.dataset.lens)));
  });
  function observeReveals() { $$('[data-reveal]:not(.revealed)').forEach(el => revealObserver.observe(el)); }
  function render() {
    revealObserver.disconnect();
    sceneObserver.disconnect();
    const data = PORTFOLIO[language];
    root.lang = language;
    root.dir = language === 'fa' ? 'rtl' : 'ltr';
    document.title = data.labels.pageTitle;
    $('meta[name="description"]').content = data.labels.description;
    $('meta[property="og:title"]').content = data.labels.pageTitle;
    $('meta[property="og:description"]').content = data.labels.description;
    $$('[data-i18n]').forEach(el => { el.textContent = data.labels[el.dataset.i18n] || ''; });
    $$('[data-aria]').forEach(el => el.setAttribute('aria-label', data.labels[el.dataset.aria] || ''));
    $$('[data-alt]').forEach(el => el.alt = data.labels[el.dataset.alt]);
    $$('[data-lang]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.lang === language)));
    $$('.cv-link').forEach(el => {
      const cvLanguage = language === 'fa' ? 'Persian' : 'English';
      el.href = `assets/cv/Niloufar-Mostajeran-CV-${cvLanguage}.pdf`;
      el.download = `Niloufar-Mostajeran-CV-${cvLanguage}.pdf`;
    });
    $('#project-grid').innerHTML = data.projects.map((project, index) => `<article class="project" data-reveal style="transition-delay:${index % 2 * 90}ms"><button class="project-art-button" type="button" data-project="${index}" aria-label="${escape(data.labels.readProject + ': ' + project.title)}"><div class="project-art">${diagrams(index)}</div><span class="project-index" aria-hidden="true">${language === 'fa' ? '۰' + '۱۲۳۴'[index] + ' / پژوهش' : '0' + (index + 1) + ' / RESEARCH'}</span><span class="project-open" aria-hidden="true"><span class="plus-icon"></span></span></button><p class="project-category">${escape(project.category)}</p><h3><button type="button" data-project="${index}">${escape(project.title)}</button></h3><p class="project-description">${escape(project.description)}</p><div class="project-tags">${project.tags.map(tag => `<span>${escape(tag)}</span>`).join('')}</div></article>`).join('');
    $('#timeline').innerHTML = data.jobs.map(job => `<article class="job" data-reveal><p class="job-date">${escape(job.date)}</p><h3>${escape(job.title)}</h3><p class="job-company" dir="auto">${escape(job.company)}</p><ul>${job.bullets.map(bullet => `<li>${escape(bullet)}</li>`).join('')}</ul></article>`).join('');
    $('#education-grid').innerHTML = data.education.map(education => `<article class="education" data-reveal><div class="job-date">${escape(education.date)}</div><h3>${escape(education.title)}</h3><p>${escape(education.institution)}</p>${education.detail ? `<p class="education-detail">${escape(education.detail)}</p>` : ''}<span class="education-gpa">${escape(data.labels.gpa)}: <b>${escape(education.gpa)}</b></span></article>`).join('');
    $('#skills-table').innerHTML = data.skills.map(skill => `<div class="skill-row" data-reveal><h4>${escape(skill.title)}</h4><div class="skill-items">${skill.items.map(item => `<span dir="auto">${escape(item)}</span>`).join('')}</div></div>`).join('');
    $('#courses-content').innerHTML = data.courses.map(course => `<div><h4>${escape(course.title)}</h4><ul>${course.items.map(item => `<li>${escape(item)}</li>`).join('')}</ul>${course.note ? `<small>${escape(course.note)}</small>` : ''}</div>`).join('');
    if (openedProject !== null) populateDialog(openedProject);
    selectLens(activeLens);
    $$('.project .research-scene').forEach(scene => sceneObserver.observe(scene));
    updateMotionButton();
    closeMenu(false);
    observeReveals();
  }

  function populateDialog(index) {
    const project = PORTFOLIO[language].projects[index];
    const oldScene = $('.dialog-art svg', dialog);
    if (oldScene) sceneObserver.unobserve(oldScene);
    $('.dialog-art', dialog).innerHTML = diagrams(index);
    sceneObserver.observe($('.dialog-art svg', dialog));
    $('.dialog-category', dialog).textContent = project.category;
    $('#dialog-title').textContent = project.title;
    $('.dialog-description', dialog).textContent = project.detail;
    $('.dialog-method ul', dialog).innerHTML = project.focus.map(item => `<li>${escape(item)}</li>`).join('');
  }
  function openProject(index, button) {
    openedProject = index;
    opener = button;
    populateDialog(index);
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    dialog.scrollTop = 0;
    $('.dialog-close').focus({preventScroll:true});
  }
  function closeProject() { if (dialog.open) dialog.close(); }
  dialog.addEventListener('close', () => {
    const scene = $('.dialog-art svg', dialog);
    if (scene) sceneObserver.unobserve(scene);
    openedProject = null;
    document.body.style.overflow = '';
    if (opener?.isConnected) opener.focus({preventScroll:true});
  });
  $('.dialog-close').addEventListener('click', closeProject);
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeProject();
    }
  });
  $('#project-grid').addEventListener('click', event => {
    const button = event.target.closest('[data-project]');
    if (button) openProject(Number(button.dataset.project), button);
  });
  $('#project-grid').addEventListener('pointermove', event => {
    if (paused || event.pointerType !== 'mouse' || !matchMedia('(hover:hover)').matches) return;
    const surface = event.target.closest('.project-art-button');
    if (!surface) return;
    const rect = surface.getBoundingClientRect();
    surface.style.setProperty('--art-rx', `${-((event.clientY-rect.top)/rect.height-.5)*4}deg`);
    surface.style.setProperty('--art-ry', `${((event.clientX-rect.left)/rect.width-.5)*4}deg`);
  }, {passive:true});
  $('#project-grid').addEventListener('pointerout', event => {
    const surface = event.target.closest('.project-art-button');
    if (surface && !surface.contains(event.relatedTarget)) {
      surface.style.setProperty('--art-rx', '0deg');
      surface.style.setProperty('--art-ry', '0deg');
    }
  }, {passive:true});
  $$('[data-lang]').forEach(button => button.addEventListener('click', () => {
    if (language === button.dataset.lang) return;
    language = button.dataset.lang;
    storage.set('nm-language', language);
    try { const url = new URL(location.href); url.searchParams.set('lang', language); history.replaceState(null, '', url); } catch { /* works from file URLs as well */ }
    render();
  }));

  const menu = $('#main-nav');
  const menuButton = $('.menu-toggle');
  function closeMenu(restoreFocus = false) {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', PORTFOLIO[language].labels.menuOpen);
    if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menu.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', PORTFOLIO[language].labels[open ? 'menuClose' : 'menuOpen']);
  });
  menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.classList.contains('open')) closeMenu(true); });
  matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  let toastTimer;
  function toast(message) {
    const element = $('.toast');
    element.textContent = message;
    element.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => element.classList.remove('visible'), 3500);
  }
  $('.copy-email').addEventListener('click', async () => {
    const address = 'niloofarmostajeran.376995@gmail.com';
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(address);
      else {
        const textarea = document.createElement('textarea');
        textarea.value = address;
        textarea.style.cssText = 'position:fixed;left:-9999px;top:0';
        document.body.append(textarea); textarea.select();
        const copied = document.execCommand('copy'); textarea.remove();
        $('.copy-email').focus({preventScroll:true});
        if (!copied) throw new Error('Copy unavailable');
      }
      toast(PORTFOLIO[language].labels.copied);
    } catch { toast(PORTFOLIO[language].labels.copyFailed); }
  });

  function updateMotionButton() {
    root.classList.toggle('motion-paused', paused);
    root.classList.toggle('motion-enabled', !paused);
    const button = $('.motion-toggle');
    button.setAttribute('aria-pressed', String(paused));
    button.setAttribute('aria-label', PORTFOLIO[language].labels[paused ? 'resumeMotion' : 'pauseMotion']);
    button.title = button.getAttribute('aria-label');
  }
  $('.motion-toggle').addEventListener('click', () => {
    paused = !paused;
    storage.set('nm-motion', paused ? 'paused' : 'running');
    updateMotionButton();
    network.setPaused(paused);
  });
  motionMedia.addEventListener('change', event => {
    if (!storage.get('nm-motion')) { paused = event.matches; updateMotionButton(); network.setPaused(paused); }
  });

  let scrollFrame = 0;
  function updateScroll() {
    scrollFrame = 0;
    const y = window.scrollY;
    $('.header').classList.toggle('scrolled', y > 20);
    const range = document.documentElement.scrollHeight - innerHeight;
    $('.scroll-progress').style.width = `${range > 0 ? y / range * 100 : 0}%`;
    const sections = ['research','experience','about','contact'];
    const current = sections.filter(id => document.getElementById(id).getBoundingClientRect().top <= 180).pop();
    $$('.nav-links a').forEach(link => {
      const active = link.hash === '#' + current;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  }
  addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); }, {passive:true});
  addEventListener('resize', updateScroll, {passive:true});

  function createNetwork() {
    const fields = [
      PORTFOLIO_VISUALS.createField($('.hero'), {paused}),
      PORTFOLIO_VISUALS.createField($('.contact-section'), {paused,light:true})
    ];
    return {setPaused(value) { fields.forEach(field => field.setPaused(value)); }};
  }
  render();
  const network = createNetwork();
  observeReveals();
  updateScroll();
})();
