// Gestion du menu mobile et navigation
document.addEventListener('DOMContentLoaded', function() {
  // Variables globales
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileMenuLinks = document.querySelectorAll('.mobile-nav a');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.side-nav a');
  const contactForm = document.querySelector('.contact-form');

  // Variables pour optimiser les performances
  let isScrolling = false;
  let scrollTimeout;

  // Vérification de la disponibilité de GSAP
  const hasGSAP = typeof gsap !== 'undefined';

  // Ouverture du menu mobile
  function openMobileMenu() {
    if (!mobileMenu) return;

    mobileMenu.classList.add('active');
    if (mobileMenuToggle) mobileMenuToggle.classList.add('active');
    if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Animation GSAP des liens du menu (si disponible)
    if (hasGSAP) {
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
  }

  // Fermeture du menu mobile
  function closeMobileMenu() {
    if (!mobileMenu) return;

    mobileMenu.classList.remove('active');
    if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
    if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Navigation fluide améliorée
  function smoothScrollTo(target) {
    if (!target) return;

    const headerHeight = document.querySelector('.top-header')?.offsetHeight || 0;
    const targetPosition = target.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  // Gestion des liens de navigation
  function handleNavClick(e, shouldCloseMenu = false) {
    e.preventDefault();
    const href = this.getAttribute('href');

    // Vérifier si c'est un lien externe
    if (href && href.includes('.html')) {
      window.location.href = href;
      return;
    }

    const target = document.querySelector(href);

    if (target) {
      if (shouldCloseMenu) {
        closeMobileMenu();
        // Délai pour laisser le menu se fermer
        setTimeout(() => smoothScrollTo(target), 300);
      } else {
        smoothScrollTo(target);
      }
    }
  }

  // Marquer le lien actif au scroll (optimisé)
  function highlightNavLink() {
    if (isScrolling) return;

    isScrolling = true;
    const scrollPosition = window.scrollY + 150; // Offset pour une meilleure détection

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
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

    // Réinitialiser le flag après un court délai
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 100);
  }

  // Gestion du formulaire de contact améliorée
  function handleContactForm(e) {
    e.preventDefault();

    const submitButton = this.querySelector('.btn-submit');
    const originalText = submitButton.textContent;
    const formData = new FormData(this);

    // Validation basique
    const requiredFields = this.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#ff6b6b';
        isValid = false;
      } else {
        field.style.borderColor = '';
      }
    });

    if (!isValid) {
      // Animation d'erreur si GSAP est disponible
      if (hasGSAP) {
        gsap.to(submitButton, {
          x: [-10, 10, -10, 10, 0],
          duration: 0.4,
          ease: 'power2.out'
        });
      }
      return;
    }

    // État de chargement
    submitButton.textContent = 'Envoi en cours...';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';

    // Simulation d'envoi (remplacer par votre logique d'envoi réelle)
    setTimeout(() => {
      submitButton.textContent = 'Envoyé !';
      submitButton.style.backgroundColor = '#4CAF50';
      submitButton.style.opacity = '1';

      // Réinitialisation du formulaire
      this.reset();

      // Animation de succès si GSAP est disponible
      if (hasGSAP) {
        gsap.to(submitButton, {
          scale: [1, 1.05, 1],
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      // Revenir à l'état initial
      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.style.backgroundColor = '';
        submitButton.disabled = false;
      }, 3000);
    }, 1500);
  }

  // Gestion du redimensionnement de la fenêtre
  function handleResize() {
    // Fermer le menu mobile si on passe en mode desktop
    if (window.innerWidth > 768 && mobileMenu?.classList.contains('active')) {
      closeMobileMenu();
    }
  }

  // Gestion de l'échappement pour fermer le menu
  function handleKeydown(e) {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
      closeMobileMenu();
    }
  }

  // Événements pour le menu mobile
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', openMobileMenu);
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
  }

  // Navigation depuis le menu mobile
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      handleNavClick.call(this, e, true);
    });
  });

  // Navigation depuis la barre latérale
  navLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
  });

  // Gestion du formulaire de contact
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }

  // Événements globaux
  window.addEventListener('scroll', highlightNavLink, { passive: true });
  window.addEventListener('resize', handleResize);
  document.addEventListener('keydown', handleKeydown);

  // Initialisation
  highlightNavLink();

  // Gestion des liens vers les pages externes dans le footer
  const footerLinks = document.querySelectorAll('.footer-links a');
  footerLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes('.html')) {
      link.addEventListener('click', function(e) {
        // Laisser le comportement par défaut pour les liens externes
        return;
      });
    } else {
      link.addEventListener('click', handleNavClick);
    }
  });

  // Amélioration de l'accessibilité
  function improveAccessibility() {
    // Ajouter des attributs ARIA si nécessaire
    if (mobileMenuToggle) {
      mobileMenuToggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }

    if (mobileMenu) {
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  }

  // Mettre à jour les attributs ARIA lors de l'ouverture/fermeture du menu
  const originalOpenMenu = openMobileMenu;
  const originalCloseMenu = closeMobileMenu;

  openMobileMenu = function() {
    originalOpenMenu();
    if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'true');
    if (mobileMenu) mobileMenu.setAttribute('aria-hidden', 'false');
  };

  closeMobileMenu = function() {
    originalCloseMenu();
    if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'false');
    if (mobileMenu) mobileMenu.setAttribute('aria-hidden', 'true');
  };

  // Initialiser l'accessibilité
  improveAccessibility();

  console.log('Main.js chargé avec succès');
});
