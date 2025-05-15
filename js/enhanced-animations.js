// ======== ANIMATIONS AMÉLIORÉES INSPIRÉES DE LADYPERSE.COM ========

document.addEventListener('DOMContentLoaded', function() {
    initEnhancedAnimations();
    initFloatingImages();
    initHoverEffects();
});

// Animation principale avec effets de parallaxe améliorés
function initEnhancedAnimations() {
    // Vérification que GSAP et ScrollTrigger sont disponibles
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error("GSAP ou ScrollTrigger n'est pas disponible");
        return;
    }

    console.log("Initialisation des animations améliorées...");

    // Effet de parallaxe pour la section d'accueil
    gsap.to('.home-background', {
        scrollTrigger: {
            trigger: '.section-home',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
        },
        y: '-20%',
        scale: 0.9, // Effet de compression
        ease: 'none'
    });

    // Effet opposé pour le contenu du premier plan
    gsap.to('.home-content', {
        scrollTrigger: {
            trigger: '.section-home',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
        },
        y: '10%',
        opacity: 0.8,
        ease: 'none'
    });

    // Animation des backgrounds de séparateurs
    gsap.utils.toArray('.separator-background').forEach(element => {
        gsap.to(element, {
            y: '-15%',
            scale: 0.95,
            scrollTrigger: {
                trigger: element.parentNode,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // Effet d'apparition progressive des éléments
    const revealElements = [
        '.section-title',
        '.about-text p',
        '.category',
        '.follow-card',
        '.separator-title',
        '.separator-subtitle'
    ];

    revealElements.forEach(selector => {
        gsap.utils.toArray(selector).forEach((element, i) => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });
    });

    // Animation plus fluide pour les images
    gsap.utils.toArray('.parallax-image').forEach(image => {
        gsap.to(image, {
            y: '-10%',
            scrollTrigger: {
                trigger: image.parentNode,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });
}

// Animation des images flottantes
function initFloatingImages() {
    const floatingImages = document.querySelectorAll('.floating-image');

    // Observer pour déclencher l'animation lorsque visible
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observer chaque image
    floatingImages.forEach(image => {
        imageObserver.observe(image);

        // Animation légère continue
        gsap.to(image, {
            y: '+=10',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
}

// Effets au survol
function initHoverEffects() {
    // Ajouter des classes pour activation des effets au survol
    const hoverElements = document.querySelectorAll('.category, .follow-card, .about-image');
    hoverElements.forEach(element => {
        element.classList.add('hover-zoom');
    });
}
