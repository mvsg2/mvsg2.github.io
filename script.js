(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll progress bar
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.appendChild(progress);
  function updateProgress() {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    progress.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + '%';
  }
  document.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // Scroll-reveal for cards and sections
  const targets = document.querySelectorAll(
    '.wp-card, .explore-card, .skill-group, .about-section, header.hero, header.page-header'
  );
  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('reveal', 'is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = Math.min(i * 60, 240) + 'ms';
      observer.observe(el);
    });
  }
})();
