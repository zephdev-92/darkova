// Initialiser GSAP
gsap.registerPlugin(ScrollTrigger);

// Fonction pour animation du loader
function animateLoader() {
  const loader = document.getElementById('loader');
  const entryPopup = document.getElementById('entryPopup');
  const hasVisited = localStorage.getItem('darkovaVisited');

  // Animation de disparition du loader
  setTimeout(() => {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.8,
      onComplete: () => {
        loader.classList.add('hidden');
      }
    });

    // Animation d'apparition du contenu principal seulement si la popup n'est pas affichée
    if (hasVisited || !entryPopup) {
      animateHeroSection();
    }
  }, 2000); // Attendre 2 secondes pour simuler le chargement
}

// Animation de la section hero
function animateHeroSection() {
  // Animation du titre principal lettre par lettre
  const heroTitle = document.querySelector('.title-main');
  if (!heroTitle) return;

  const text = heroTitle.textContent;
  heroTitle.innerHTML = '';

  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.textContent = text[i];
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    heroTitle.appendChild(span);
  }

  gsap.to('.title-main span', {
    opacity: 1,
    y: 0,
    stagger: 0.05,
    duration: 0.8,
    ease: 'back.out(1.7)',
    delay: 0.2
  });

  // Animation du sous-titre
  gsap.fromTo('.subtitle',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, delay: 1.2 }
  );
}

// Animation des sections au scroll
function initScrollAnimations() {
  // Section À propos
  gsap.from('.section-about .section-title', {
    scrollTrigger: {
      trigger: '.section-about',
      start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    duration: 0.8
  });

  gsap.from('.about-text', {
    scrollTrigger: {
      trigger: '.about-text',
      start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.2
  });

  gsap.from('.about-image', {
    scrollTrigger: {
      trigger: '.about-image',
      start: 'top 80%'
    },
    opacity: 0,
    x: 50,
    duration: 0.8,
    delay: 0.4
  });

  // Effet parallaxe sur l'image
  gsap.to('.parallax-image', {
    scrollTrigger: {
      trigger: '.about-image',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    },
    y: -50
  });

  // Section Séances
  gsap.from('.section-seance .section-title', {
    scrollTrigger: {
      trigger: '.section-seance',
      start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    duration: 0.8
  });

  gsap.from('.section-seance .content-description', {
    scrollTrigger: {
      trigger: '.section-seance .content-description',
      start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.2
  });

  // Animation des catégories
  gsap.from('.category', {
    scrollTrigger: {
      trigger: '.content-categories',
      start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2
  });

  // Section Suivez votre Reine
  gsap.from('.section-follow .section-title', {
    scrollTrigger: {
      trigger: '.section-follow',
      start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    duration: 0.8
  });

  gsap.from('.follow-description', {
    scrollTrigger: {
      trigger: '.follow-description',
      start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.2
  });

  gsap.from('.follow-card', {
    scrollTrigger: {
      trigger: '.follow-grid',
      start: 'top 80%'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2
  });

  // Section Contact
  gsap.from('.section-contact .section-title', {
    scrollTrigger: {
      trigger: '.section-contact',
      start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    duration: 0.8
  });

  gsap.from('.contact-info', {
    scrollTrigger: {
      trigger: '.contact-grid',
      start: 'top 80%'
    },
    opacity: 0,
    x: -30,
    duration: 0.8,
    delay: 0.2
  });

  gsap.from('.contact-form-container', {
    scrollTrigger: {
      trigger: '.contact-grid',
      start: 'top 80%'
    },
    opacity: 0,
    x: 30,
    duration: 0.8,
    delay: 0.4
  });

  // Formulaire - animation des champs
  gsap.from('.form-group', {
    scrollTrigger: {
      trigger: '.contact-form',
      start: 'top 80%'
    },
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.1,
    delay: 0.6
  });
}

// Initialiser toutes les animations
document.addEventListener('DOMContentLoaded', function() {
  // Démarrer l'animation du loader
  animateLoader();

  // Initialiser les animations au scroll
  initScrollAnimations();
});
