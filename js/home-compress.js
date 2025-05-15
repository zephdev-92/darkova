// Effet de compression pour la section home uniquement
document.addEventListener('DOMContentLoaded', function() {
    initHomeCompression();
});

function initHomeCompression() {
    // Vérifie si l'élément home-background existe
    const homeBackground = document.querySelector('.home-background');
    if (!homeBackground) {
        console.error("Élément home-background non trouvé");
        return;
    }

    // Vérifie si GSAP et ScrollTrigger sont disponibles
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error("GSAP ou ScrollTrigger non disponible");
        return;
    }

    console.log("Initialisation de l'effet de compression pour home...");

    // Créer une timeline pour la compression de la section home
    const homeCompressTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.section-home',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            markers: false, // Mettre à true pour déboguer
            onEnter: () => console.log("Home section entered"),
            onLeave: () => console.log("Home section left")
        }
    });

    // Effet de compression
    homeCompressTimeline.to('.home-background', {
        scaleY: 0.7, // Réduit la hauteur à 70% de sa taille originale
        y: '10%', // Léger déplacement vers le bas
        ease: 'none'
    });

    // Le contenu se déplace dans la direction opposée
    homeCompressTimeline.to('.home-content', {
        y: '-10%', // Se déplace vers le haut pendant la compression
        ease: 'none'
    }, 0); // Début simultané avec l'animation précédente
}
