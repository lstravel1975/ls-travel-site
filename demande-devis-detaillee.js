document.addEventListener('DOMContentLoaded', () => {
    // 1. Pré-remplir le récapitulatif avec les données de l'URL
    const urlParams = new URLSearchParams(window.location.search);

    const summaryTripType = document.getElementById('summaryTripType');
    const summaryDeparture = document.getElementById('summaryDeparture');
    const summaryArrival = document.getElementById('summaryArrival');
    const summaryDepartureDateTime = document.getElementById('summaryDepartureDateTime');
    const summaryPassengers = document.getElementById('summaryPassengers');
    const summaryReturn = document.getElementById('summaryReturn');
    const summaryReturnDateTime = document.getElementById('summaryReturnDateTime');
    const returnDetailsSection = document.getElementById('returnDetailsSection');

    const tripType = urlParams.get('tripType');
    const departureLocation = urlParams.get('departureLocation');
    const arrivalLocation = urlParams.get('arrivalLocation');
    const departureDate = urlParams.get('departureDate');
    const departureTime = urlParams.get('departureTime');
    const passengers = urlParams.get('passengers');
    const returnDate = urlParams.get('returnDate');
    const returnTime = urlParams.get('returnTime');

    if (tripType) summaryTripType.textContent = tripType === 'oneWay' ? 'Aller simple' : 'Aller-Retour';
    if (departureLocation) summaryDeparture.textContent = departureLocation;
    if (arrivalLocation) summaryArrival.textContent = arrivalLocation;
    if (departureDate && departureTime) summaryDepartureDateTime.textContent = `${formatDate(departureDate)} à ${departureTime}`;
    if (passengers) summaryPassengers.textContent = passengers;

    if (tripType === 'roundTrip') {
        summaryReturn.style.display = 'block';
        returnDetailsSection.style.display = 'block'; // Afficher la section complète des détails de retour
        if (returnDate && returnTime) summaryReturnDateTime.textContent = `${formatDate(returnDate)} à ${returnTime}`;
    } else {
        summaryReturn.style.display = 'none';
        returnDetailsSection.style.display = 'none';
    }

    // Fonction d'aide pour formater la date en 'JJ/MM/AAAA'
    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    // 2. Synchronisation du nombre de passagers et gestion des sièges
    const adultsInput = document.getElementById('adults');
    const children0_6Input = document.getElementById('children0_6');
    const children7_12Input = document.getElementById('children7_12');
    const babySeatsInput = document.getElementById('babySeats');
    const boosterSeatsInput = document.getElementById('boosterSeats');

    // Pré-remplir le champ adultes avec le nombre total de passagers du formulaire rapide
    if (passengers) {
        adultsInput.value = passengers;
    }

    // S'assurer que le nombre de sièges bébé ne dépasse pas le nombre d'enfants 0-6 ans
    children0_6Input.addEventListener('input', () => {
        if (parseInt(babySeatsInput.value) > parseInt(children0_6Input.value)) {
            babySeatsInput.value = children0_6Input.value;
        }
    });

    babySeatsInput.addEventListener('input', () => {
        if (parseInt(babySeatsInput.value) > parseInt(children0_6Input.value)) {
            babySeatsInput.value = children0_6Input.value;
        }
    });

    // S'assurer que le nombre de rehausseurs ne dépasse pas le nombre d'enfants 7-12 ans
    children7_12Input.addEventListener('input', () => {
        if (parseInt(boosterSeatsInput.value) > parseInt(children7_12Input.value)) {
            boosterSeatsInput.value = children7_12Input.value;
        }
    });

    boosterSeatsInput.addEventListener('input', () => {
        if (parseInt(boosterSeatsInput.value) > parseInt(children7_12Input.value)) {
            boosterSeatsInput.value = children7_12Input.value;
        }
    });

    // 3. Afficher les descriptions de service
    const serviceStandardRadio = document.getElementById('serviceStandard');
    const serviceVIPRadio = document.getElementById('serviceVIP');
    const standardDesc = document.getElementById('standardDesc');
    const vipDesc = document.getElementById('vipDesc');

    function toggleServiceDescription() {
        if (serviceStandardRadio.checked) {
            standardDesc.style.display = 'inline';
            vipDesc.style.display = 'none';
        } else {
            standardDesc.style.display = 'none';
            vipDesc.style.display = 'inline';
        }
    }

    serviceStandardRadio.addEventListener('change', toggleServiceDescription);
    serviceVIPRadio.addEventListener('change', toggleServiceDescription);
    toggleServiceDescription(); // Afficher la bonne description au chargement
});
