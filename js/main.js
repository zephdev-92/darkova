// Gestion du menu mobile
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileMenuLinks = document.querySelectorAll('.mobile-nav a');

  // Ouverture du menu mobile
  function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileMenuToggle.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Empêcher le défilement

    // Animation GSAP des liens du menu
    gsap.fromTo('.mobile-nav li',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.3
      }
    );
  }

  // Fermeture du menu mobile
  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Rétablir le défilement
  }

  // Événements
  mobileMenuToggle.addEventListener('click', openMobileMenu);
  mobileMenuClose.addEventListener('click', closeMobileMenu);
  mobileMenuOverlay.addEventListener('click', closeMobileMenu);

  // Navigation fluide depuis le menu mobile
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        closeMobileMenu();

        // Délai pour laisser le menu se fermer
        setTimeout(() => {
          window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
          });
        }, 300);
      }
    });
  });

  // Navigation latérale - marquer le lien actif au scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.side-nav a');

  function highlightNavLink() {
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');

          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Navigation fluide depuis la navigation latérale
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Gestion du formulaire de contact
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Simuler l'envoi du formulaire (à remplacer par votre propre logique)
      const submitButton = this.querySelector('.btn-submit');
      const originalText = submitButton.textContent;

      submitButton.textContent = 'Envoi en cours...';
      submitButton.disabled = true;

      // Simulation d'envoi
      setTimeout(() => {
        submitButton.textContent = 'Envoyé !';
        submitButton.style.backgroundColor = '#4CAF50';

        // Réinitialisation du formulaire
        contactForm.reset();

        // Revenir à l'état initial après 3 secondes
        setTimeout(() => {
          submitButton.textContent = originalText;
          submitButton.style.backgroundColor = '';
          submitButton.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // Écouter les événements de scroll pour la navigation
  window.addEventListener('scroll', highlightNavLink);

  // Exécuter la fonction une fois au chargement
  highlightNavLink();
});
