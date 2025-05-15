// Gestion de la popup d'entrée avec vérification d'âge
document.addEventListener('DOMContentLoaded', function() {
    // Supprimer l'item de localStorage pour forcer l'affichage de la popup
    localStorage.removeItem('darkovaVisited');

    initEntryPopup();
});

function initEntryPopup() {
    const entryPopup = document.getElementById('entryPopup');
    const entryBtn = document.getElementById('entryBtn');
    const ageCheckbox = document.getElementById('ageVerification');
    const ageError = document.getElementById('ageVerificationError');

    // Vérifier si l'utilisateur a déjà visité le site
    const hasVisited = localStorage.getItem('darkovaVisited');

    if (!hasVisited) {
        // Afficher la popup avec animation
        setTimeout(function() {
            entryPopup.classList.add('animate');

            // Désactiver le défilement du body
            document.body.style.overflow = 'hidden';
        }, 500);

        // Cacher le loader plus rapidement si la popup est affichée
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(function() {
                loader.classList.add('hidden');
            }, 1000);
        }
    } else {
        // Si l'utilisateur a déjà visité, masquer la popup
        entryPopup.classList.add('hidden');
    }

    // Gérer la case à cocher de vérification d'âge
    if (ageCheckbox) {
        // Initialement, le bouton est désactivé
        entryBtn.classList.add('disabled');

        ageCheckbox.addEventListener('change', function() {
            if (this.checked) {
                // Activer le bouton si la case est cochée
                entryBtn.classList.remove('disabled');

                // Cacher le message d'erreur s'il était visible
                if (ageError) {
                    ageError.classList.remove('show');
                }
            } else {
                // Désactiver le bouton si la case est décochée
                entryBtn.classList.add('disabled');
            }
        });
    }

    // Gérer le bouton d'entrée
    if (entryBtn) {
        entryBtn.addEventListener('click', function(e) {
            // Vérifier si la case est cochée
            if (ageCheckbox && !ageCheckbox.checked) {
                // Empêcher l'action par défaut
                e.preventDefault();

                // Afficher le message d'erreur
                if (ageError) {
                    ageError.classList.add('show');

                    // Faire vibrer légèrement la case à cocher pour attirer l'attention
                    gsap.to(ageCheckbox, {
                        x: [-5, 5, -5, 5, 0],
                        duration: 0.4,
                        ease: 'power2.inOut'
                    });
                }

                return false;
            }

            // Si la vérification d'âge est passée, procéder normalement
            // Marquer que l'utilisateur a visité (valable pour 1 jour)
            localStorage.setItem('darkovaVisited', 'true');

            // Masquer la popup avec transition
            entryPopup.classList.remove('animate');
            entryPopup.classList.add('hidden');

            // Réactiver le défilement
            document.body.style.overflow = '';

            // Animation du titre principal après la fermeture
            setTimeout(function() {
                animateHeroSection();
            }, 300);
        });
    }
}

// Adapter la fonction d'animation du héros pour fonctionner avec la popup
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
