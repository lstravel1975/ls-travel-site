document.addEventListener('DOMContentLoaded', () => {
    const oneWayRadio = document.getElementById('oneWay');
    const roundTripRadio = document.getElementById('roundTrip');
    const returnFields = document.getElementById('returnFields');
    const returnDateInput = document.getElementById('returnDate');
    const returnTimeInput = document.getElementById('return(');

    // Fonction pour gérer l'affichage des champs de retour
    function toggleReturnFields() {
        if (roundTripRadio.checked) {
            returnFields.style.display = 'block';
            returnDateInput.setAttribute('required', 'required');
            returnTimeInput.setAttribute('required', 'required');
        } else {
            returnFields.style.display = 'none';
            returnDateInput.removeAttribute('required');
            returnTimeInput.removeAttribute('required');
        }
    }

    // Écouteurs d'événements pour les boutons radio
    oneWayRadio.addEventListener('change', toggleReturnFields);
    roundTripRadio.addEventListener('change', toggleReturnFields);

    // Initialiser l'affichage au chargement de la page
    toggleReturnFields();

    // Optionnel: Définir la date min pour les champs de date à aujourd'hui
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('departureDate').setAttribute('min', today);
    returnDateInput.setAttribute('min', today); // Aussi pour le champ retour

    // Optionnel: Assurer que la date de retour est après la date de départ
    document.getElementById('departureDate').addEventListener('change', (event) => {
        returnDateInput.setAttribute('min', event.target.value);
        if (returnDateInput.value < event.target.value) {
            returnDateInput.value = event.target.value;
        }
    });
});
