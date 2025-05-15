// Fonction pour initialiser la boutique
document.addEventListener('DOMContentLoaded', function() {
    initShop();
});

function initShop() {
    // Filtres par catégorie
    const categoryFilterBtns = document.querySelectorAll('.filter-options .filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    // Filtre par tags
    const tagElements = document.querySelectorAll('.tag');

    // Recherche
    const searchInput = document.getElementById('shop-search');
    const searchBtn = document.querySelector('.search-btn');

    // Modal de prévisualisation
    const previewModal = document.getElementById('previewModal');
    const previewClose = document.getElementById('previewClose');
    const previewVideo = document.getElementById('previewVideo');
    const previewTitle = document.querySelector('.preview-title');
    const previewDescription = document.querySelector('.preview-description');
    const previewPrice = document.querySelector('.preview-price');
    const previewButtons = document.querySelectorAll('.preview-btn');

    // FAQ items
    const faqItems = document.querySelectorAll('.faq-item');

    // Pagination
    const paginationBtns = document.querySelectorAll('.pagination-btn');

    // Variables de traçage
    let activeFilters = {
        category: 'all',
        tags: []
    };

    // Filtrage par catégorie
    categoryFilterBtns.forEach(button => {
        button.addEventListener('click', function() {
            // Mise à jour des boutons actifs
            categoryFilterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Mise à jour du filtre actif
            activeFilters.category = this.getAttribute('data-filter');

            // Appliquer les filtres
            applyFilters();
        });
    });

    // Filtrage par tags
    tagElements.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagValue = this.getAttribute('data-tag');

            // Toggle de l'état actif
            this.classList.toggle('active');

            // Mise à jour des tags actifs
            if (this.classList.contains('active')) {
                if (!activeFilters.tags.includes(tagValue)) {
                    activeFilters.tags.push(tagValue);
                }
            } else {
                const index = activeFilters.tags.indexOf(tagValue);
                if (index > -1) {
                    activeFilters.tags.splice(index, 1);
                }
            }

            // Appliquer les filtres
            applyFilters();
        });
    });

    // Fonction de recherche
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Prévisualisation des produits
    previewButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();

            const card = this.closest('.product-card');
            const title = card.querySelector('.product-title').textContent;
            const description = card.querySelector('.product-description').textContent;
            const price = card.querySelector('.product-price').textContent;
            const thumbnail = card.querySelector('.product-thumbnail img').src;

            // Configuration de la prévisualisation
            previewTitle.textContent = title;
            previewDescription.textContent = description;
            previewPrice.textContent = price;
            previewVideo.poster = thumbnail;

            // Pour une vraie implémentation, vous utiliseriez une vraie vidéo
            // previewVideo.src = 'path/to/video-' + (index + 1) + '.mp4';

            // Affichage de la modal
            previewModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Fermeture de la modal de prévisualisation
    if (previewClose) {
        previewClose.addEventListener('click', function() {
            closePreviewModal();
        });

        // Fermeture par la touche Echap
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && previewModal.classList.contains('active')) {
                closePreviewModal();
            }
        });
    }

    // Gestion des FAQ
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            // Toggle de l'état actif
            item.classList.toggle('active');

            // Animation pour les autres éléments
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });

    // Pagination
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            paginationBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Simuler un changement de page
            // Dans une implémentation réelle, vous chargeriez de nouveaux produits ici
            animateProductCards();

            // Scroll en haut de la grille de produits
            document.querySelector('.shop-products').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Appliquer les filtres aux produits
    function applyFilters() {
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardTags = card.getAttribute('data-tags').split(',');

            let showByCategory = activeFilters.category === 'all' || activeFilters.category === cardCategory;
            let showByTags = true;

            // Vérifier si tous les tags actifs sont présents dans la carte
            if (activeFilters.tags.length > 0) {
                showByTags = activeFilters.tags.every(tag => cardTags.includes(tag));
            }

            // Afficher ou masquer la carte
            if (showByCategory && showByTags) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Animation des cartes visibles
        animateProductCards();
    }

    // Fonction de recherche
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        if (searchTerm === '') {
            // Réinitialiser les filtres si la recherche est vide
            activeFilters.category = 'all';
            activeFilters.tags = [];
            categoryFilterBtns.forEach(btn => {
                if (btn.getAttribute('data-filter') === 'all') {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            tagElements.forEach(tag => tag.classList.remove('active'));
            applyFilters();
            return;
        }

        productCards.forEach(card => {
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            const description = card.querySelector('.product-description').textContent.toLowerCase();
            const tags = card.getAttribute('data-tags').toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Animation des cartes visibles
        animateProductCards();
    }

    // Fermeture de la modal de prévisualisation
    function closePreviewModal() {
        previewModal.classList.remove('active');
        document.body.style.overflow = '';

        // Arrêter la vidéo si elle est en cours de lecture
        if (previewVideo) {
            previewVideo.pause();
            previewVideo.currentTime = 0;
        }
    }

    // Animation des cartes de produits
    function animateProductCards() {
        gsap.from('.product-card:not([style*="display: none"])', {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power2.out'
        });
    }

    // Animation des sections
    function animateSections() {
        // Animation du pack promo
        gsap.from('.promo-text', {
            scrollTrigger: {
                trigger: '.promo-content',
                start: 'top 80%'
            },
            opacity: 0,
            x: -50,
            duration: 0.8
        });

        gsap.from('.promo-image', {
            scrollTrigger: {
                trigger: '.promo-content',
                start: 'top 80%'
            },
            opacity: 0,
            x: 50,
            duration: 0.8,
            delay: 0.2
        });

        // Animation de la FAQ
        gsap.from('.faq-item', {
            scrollTrigger: {
                trigger: '.faq-container',
                start: 'top 80%'
            },
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.5
        });
    }

    // Initialisation des animations
    animateProductCards();
    animateSections();
}
