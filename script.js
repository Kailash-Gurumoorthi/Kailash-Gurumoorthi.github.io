document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const themeToggle = document.querySelector('.theme-toggle');
  const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections = [...document.querySelectorAll('main section[id]')];

  const closeMenu = () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    menuButton.querySelector('i').className = 'fa-solid fa-bars';
  };

  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    menuButton.querySelector('i').className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });
  navAnchors.forEach(link => link.addEventListener('click', closeMenu));

  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 12);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  const revealItems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => sectionObserver.observe(section));

  const setTheme = theme => {
    const dark = theme === 'dark';
    document.documentElement.dataset.theme = theme;
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    themeToggle.querySelector('i').className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    themeToggle.querySelector('span').textContent = dark ? 'Light' : 'Dark';
  };
  const savedTheme = localStorage.getItem('portfolio-theme');
  setTheme(savedTheme === 'dark' ? 'dark' : 'light');
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
  });
});
