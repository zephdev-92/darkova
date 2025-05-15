// Gestion des séparateurs de section et des effets de parallaxe renforcés
document.addEventListener('DOMContentLoaded', function() {
    initEnhancedParallax();
});

function initEnhancedParallax() {
    // Créer une timeline pour la section d'accueil
    let homeTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.section-home',
            start: 'top top',
            end: 'bottom top',
            scrub: 1, // Valeur plus élevée pour un effet plus fluide
            markers: false // Mettre à true pour déboguer
        }
    });

    // Animation du fond d'accueil avec un effet plus prononcé
    homeTimeline.to('.home-background', {
        y: '-25%', // Déplacement vertical plus important
        scale: 1.1,
        ease: 'none'
    });

    // Effet sur le titre pour qu'il se déplace à une vitesse différente
    homeTimeline.to('.home-content', {
        y: '15%', // Le titre se déplace dans la direction opposée
        opacity: 0.8,
        ease: 'none'
    }, 0); // Démarre en même temps que l'animation précédente

    // Effet pour chaque séparateur de section
    const separators = document.querySelectorAll('.section-separator');

    separators.forEach(separator => {
        // Créer une timeline pour chaque séparateur
        let sepTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: separator,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1, // Valeur plus élevée pour un effet plus fluide
                markers: false // Mettre à true pour déboguer
            }
        });

        // Animation du fond avec un effet plus prononcé
        const background = separator.querySelector('.separator-background');
        if (background) {
            sepTimeline.fromTo(background,
                { y: '0%' },
                { y: '-25%', ease: 'none' }
            );
        }

        // Animation pour les conteneurs vidéo
        const videoContainer = separator.querySelector('.separator-video-container');
        if (videoContainer) {
            sepTimeline.fromTo(videoContainer,
                { y: '0%' },
                { y: '-15%', ease: 'none' }
            );
        }

        // Animation du contenu à une vitesse différente
        const content = separator.querySelector('.separator-content');
        if (content) {
            sepTimeline.fromTo(content,
                { y: '0%' },
                { y: '15%', ease: 'none' }
            , 0); // Démarre en même temps que les animations précédentes
        }
    });

    // Effet parallaxe amélioré pour l'image de la section About
    ScrollTrigger.create({
        trigger: '.about-image',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
            gsap.to('.parallax-image', {
                y: -self.progress * 100, // Déplacement plus important
                duration: 0.5,
                ease: 'none'
            });
        }
    });

    // Effet de vitesse différente pour les éléments de contenu lors du défilement
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.to(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5
            },
            y: 50, // Se déplace vers le bas lors du défilement
            ease: 'none'
        });
    });

    // Animation des éléments qui apparaissent au défilement
    const fadeInElements = [
        '.about-text p',
        '.category',
        '.follow-card',
        '.form-group'
    ];

    fadeInElements.forEach(selector => {
        gsap.utils.toArray(selector).forEach((element, i) => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 90%', // Commence plus tôt
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1, // Délai progressif
                ease: 'power2.out'
            });
        });
    });

    // Gestion spéciale pour la vidéo
    const video = document.querySelector('.separator-video');
    if (video) {
        // Fonction pour démarrer la vidéo
        function playVideo() {
            video.play().catch(error => {
                console.log('Autoplay prevented:', error);

                // Ajouter un gestionnaire de clic pour les navigateurs qui bloquent l'autoplay
                document.addEventListener('click', function videoClickHandler() {
                    video.play();
                    document.removeEventListener('click', videoClickHandler);
                });
            });
        }

        // Observer l'intersection pour jouer la vidéo quand elle est visible
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    playVideo();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.1 });

        videoObserver.observe(video);

        // Effet de parallaxe sur la vidéo (mouvement doux)
        const videoContainer = document.querySelector('.separator-video-container');
        if (videoContainer) {
            gsap.to(video, {
                scrollTrigger: {
                    trigger: videoContainer,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                scale: 1.1, // Zoom subtil
                ease: 'none'
            });
        }
    }
}
