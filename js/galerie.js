// Fonction pour initialiser la galerie
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
});

function initGallery() {
    // Filtres de la galerie
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Lightbox
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    // Bouton "Charger plus"
    const loadMoreBtn = document.querySelector('.load-more-btn');

    // Variables de suivi pour le lightbox
    let currentIndex = 0;
    let visibleItems = [];

    // Filtrage des éléments de la galerie
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Mettre à jour les boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Filtrer les éléments
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.style.display = 'block';
                    if (!visibleItems.includes(item)) {
                        visibleItems.push(item);
                    }
                } else {
                    item.style.display = 'none';
                    const index = visibleItems.indexOf(item);
                    if (index > -1) {
                        visibleItems.splice(index, 1);
                    }
                }
            });

            // Réinitialiser l'animation d'apparition des éléments
            animateGalleryItems();
        });
    });

    // Ouverture du lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.gallery-info h3').textContent;
            const description = this.querySelector('.gallery-info p').textContent;

            lightboxImage.src = img.src;
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;

            currentIndex = visibleItems.indexOf(this);
            lightbox.classList.add('active');

            // Désactiver le défilement du body
            document.body.style.overflow = 'hidden';
        });
    });

    // Fermeture du lightbox
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Navigation dans le lightbox
    lightboxPrev.addEventListener('click', function() {
        navigateLightbox(-1);
    });

    lightboxNext.addEventListener('click', function() {
        navigateLightbox(1);
    });

    // Navigation au clavier
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    });

    // Fonction pour naviguer dans le lightbox
    function navigateLightbox(direction) {
        // Mettre à jour l'index
        currentIndex = (currentIndex + direction + visibleItems.length) % visibleItems.length;

        // Mettre à jour l'image et les infos
        const currentItem = visibleItems[currentIndex];
        const img = currentItem.querySelector('img');
        const title = currentItem.querySelector('.gallery-info h3').textContent;
        const description = currentItem.querySelector('.gallery-info p').textContent;

        // Animation de transition
        gsap.to(lightboxImage, {opacity: 0, duration: 0.2, onComplete: function() {
            lightboxImage.src = img.src;
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
            gsap.to(lightboxImage, {opacity: 1, duration: 0.2});
        }});
    }

    // Simuler le chargement de plus d'images
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Ici vous pourriez charger dynamiquement plus d'images via AJAX
            // Pour la démonstration, nous allons simplement simuler un chargement
            loadMoreBtn.textContent = 'Chargement...';
            loadMoreBtn.disabled = true;

            setTimeout(function() {
                // Réinitialiser le bouton pour une utilisation future
                loadMoreBtn.textContent = 'Charger plus';
                loadMoreBtn.disabled = false;

                // Indiquer qu'il n'y a plus d'images à charger
                loadMoreBtn.classList.add('disabled');
                loadMoreBtn.textContent = 'Toutes les images sont chargées';
                loadMoreBtn.disabled = true;
            }, 1500);
        });
    }

    // Fonction pour animer l'apparition des éléments de la galerie
    function animateGalleryItems() {
        gsap.from('.gallery-item:not([style*="display: none"])', {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power2.out'
        });
    }

    // Initialisation des éléments visibles
    galleryItems.forEach(item => {
        if (window.getComputedStyle(item).display !== 'none') {
            visibleItems.push(item);
        }
    });

    // Animation initiale
    animateGalleryItems();
}
