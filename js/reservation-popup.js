// ======== GESTION DU POPUP DE RÉSERVATION ========

document.addEventListener('DOMContentLoaded', function() {
    const reservationPopup = document.getElementById('reservationPopup');
    const reservationButtons = document.querySelectorAll('.btn-reservation');
    const closeButton = document.getElementById('reservationPopupClose');
    const overlay = document.querySelector('.reservation-popup-overlay');
    const form = document.getElementById('reservationForm');

    // Éléments pour la logique conditionnelle
    const seanceVirtuelleCheckbox = document.getElementById('seance-virtuelle');
    const seanceReelleCheckbox = document.getElementById('seance-reelle');
    const dureeVirtuelleSection = document.getElementById('duree-virtuelle');

    // Ouvrir le popup
    reservationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const seanceType = this.getAttribute('data-seance-type');
            openReservationPopup(seanceType);
        });
    });

    // Fermer le popup
    closeButton.addEventListener('click', closeReservationPopup);
    overlay.addEventListener('click', closeReservationPopup);

    // Fermer avec Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && reservationPopup.classList.contains('active')) {
            closeReservationPopup();
        }
    });

    // Fonction pour ouvrir le popup
    function openReservationPopup(seanceType) {
        reservationPopup.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Pré-cocher le type de séance selon le bouton cliqué
        if (seanceType === 'virtuelle') {
            seanceVirtuelleCheckbox.checked = true;
            dureeVirtuelleSection.style.display = 'block';
        } else if (seanceType === 'reelle') {
            seanceReelleCheckbox.checked = true;
            dureeVirtuelleSection.style.display = 'none';
        }
    }

    // Fonction pour fermer le popup
    function closeReservationPopup() {
        reservationPopup.classList.remove('active');
        document.body.style.overflow = '';

        // Reset du formulaire
        form.reset();
        dureeVirtuelleSection.style.display = 'none';
    }

    // Gestion de l'affichage conditionnel de la durée
    seanceVirtuelleCheckbox.addEventListener('change', function() {
        if (this.checked) {
            dureeVirtuelleSection.style.display = 'block';
        } else {
            dureeVirtuelleSection.style.display = 'none';
        }
    });

    seanceReelleCheckbox.addEventListener('change', function() {
        if (this.checked) {
            dureeVirtuelleSection.style.display = 'none';
        }
    });

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validation personnalisée
        if (!validateForm()) {
            return;
        }

        // Collecte des données du formulaire
        const formData = new FormData(form);
        const data = {};

        // Conversion des données du formulaire en objet
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                // Si la clé existe déjà, créer un tableau
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }

        // Traitement spécial pour les checkboxes de type de séance
        const typeSeanceCheckboxes = document.querySelectorAll('input[name="type-seance"]:checked');
        data['type-seance'] = Array.from(typeSeanceCheckboxes).map(cb => cb.value);

        // Affichage des données (à remplacer par l'envoi réel)
        console.log('Données du formulaire:', data);

        // Simulation d'envoi
        showSubmissionMessage();
    });

    // Fonction de validation personnalisée
    function validateForm() {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#ff4500';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });

        // Validation de l'âge
        const ageField = document.getElementById('age');
        if (ageField.value && parseInt(ageField.value) < 18) {
            ageField.style.borderColor = '#ff4500';
            alert('Vous devez avoir au moins 18 ans pour soumettre ce formulaire.');
            isValid = false;
        }

        // Validation du type de séance
        const typeSeanceCheckboxes = document.querySelectorAll('input[name="type-seance"]:checked');
        if (typeSeanceCheckboxes.length === 0) {
            alert('Veuillez sélectionner au moins un type de séance.');
            isValid = false;
        }

        // Validation des checkboxes obligatoires
        const requiredCheckboxes = ['obeissance', 'controle'];
        requiredCheckboxes.forEach(checkboxId => {
            const checkbox = document.getElementById(checkboxId);
            if (!checkbox.checked) {
                checkbox.parentElement.style.color = '#ff4500';
                isValid = false;
            } else {
                checkbox.parentElement.style.color = '';
            }
        });

        if (!isValid) {
            alert('Veuillez remplir tous les champs obligatoires correctement.');
        }

        return isValid;
    }

    // Fonction pour afficher le message de soumission
    function showSubmissionMessage() {
        const submitButton = document.querySelector('.btn-submit-reservation');
        const originalText = submitButton.textContent;

        submitButton.textContent = 'Candidature Envoyée...';
        submitButton.disabled = true;
        submitButton.style.background = '#4a5568';

        setTimeout(() => {
            alert('Votre candidature a été soumise. Queen Darkova examinera votre demande et vous contactera si Elle le juge approprié.');
            closeReservationPopup();

            // Reset du bouton
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
        }, 2000);
    }

    // Amélioration de l'UX : focus automatique sur le premier champ
    reservationPopup.addEventListener('transitionend', function() {
        if (this.classList.contains('active')) {
            const firstInput = form.querySelector('input, textarea, select');
            if (firstInput) {
                firstInput.focus();
            }
        }
    });

    // Gestion du scroll dans le popup
    const popupContent = document.querySelector('.reservation-popup-content');
    popupContent.addEventListener('wheel', function(e) {
        e.stopPropagation();
    });
});
