
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadImage(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "100px",
    threshold: 0.1
  });
  
  function loadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) return;
  
    img.src = src;
    img.onload = () => {
      img.classList.remove('placeholder');
      img.classList.add('loaded');
    };
  }
  
  document.querySelectorAll('img.lazy-load').forEach(img => {
    observer.observe(img);
  });
  
  document.querySelectorAll('.load-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const img = btn.previousElementSibling;
      loadImage(img);
      observer.unobserve(img);
      btn.remove();
    });
  });
  