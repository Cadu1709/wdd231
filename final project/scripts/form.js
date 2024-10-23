document.addEventListener('DOMContentLoaded', () => {
    const airportData = [
        { name: 'Entebbe International Airport', code: 'EBB', country: 'Uganda', city: 'Entebbe' },
        { name: 'John F. Kennedy International Airport', code: 'JFK', country: 'USA', city: 'New York' },
        { name: 'Los Angeles International Airport', code: 'LAX', country: 'USA', city: 'Los Angeles' },
        { name: 'Senai Intl', code: 'JHB', country: 'Singapore', city: 'Joho Bahru' },
        { name: 'Waterport SPB', code: 'ORS', country: 'Australia', city: 'Orpheus Island' },
        { name: 'St Denis del Hotel', code: 'ORE', country: 'USA', city: 'Orleans' },
        { name: 'Metropolitan Area', code: 'PAR', country: 'France', city: 'Paris' },
        { name: 'King Khalid Mil. City Airport', code: 'KMC', country: 'Saudi Arabia', city: 'King Khalid Mil. City' },
        { name: 'German Arias Graziani', code: 'ATA', country: 'Germany', city: 'Huaraz' },
        { name: 'Kigali Intl.', code: 'KGL', country: 'Rwanda', city: 'Kigali' },
        { name: 'O.R. Tambo Int.', code: 'JNB', country: 'South Africa', city: 'Johannesburg' },
        { name: 'Cape Town Intl.', code: 'CPT', country: 'South Africa', city: 'Cape Town' },
        { name: 'Jomo Kenyatta Intl', code: 'NBO', country: 'Kenya', city: 'Nairobi' },
        { name: 'Adolfo Suarez-Barajas', code: 'MAD', country: 'Spain', city: 'Madrid' },
        { name: 'Jorge Chavez Intl', code: 'LIM', country: 'Peru', city: 'Lima' }
    ];

    function createSuggestions(inputId, suggestionsId) {
        const input = document.getElementById(inputId);
        const suggestionsContainer = document.getElementById(suggestionsId);

        input.addEventListener('input', function () {
            const query = this.value.toLowerCase();
            suggestionsContainer.innerHTML = '';

            if (query.length < 2) return;

            const filteredAirports = airportData.filter(airport =>
                airport.name.toLowerCase().includes(query) || airport.code.toLowerCase().includes(query) ||
                airport.city.toLowerCase().includes(query) || airport.country.toLowerCase().includes(query)
            );

            filteredAirports.forEach(airport => {
                const suggestionItem = document.createElement('div');
                suggestionItem.className = 'suggestion-item';
                suggestionItem.textContent = `${airport.name} (${airport.code})`;
                suggestionItem.addEventListener('click', () => {
                    input.value = airport.code;
                    suggestionsContainer.innerHTML = '';
                });
                suggestionsContainer.appendChild(suggestionItem);
            });
        });

        document.addEventListener('click', function (e) {
            if (e.target !== input) {
                suggestionsContainer.innerHTML = '';
            }
        });
    }

    async function fetchFlights(params) {
        try {
            const response = await fetch('data/flights.json');  //flights.json has the flight data
            const flights = await response.json();
            return flights.filter(flight => 
                flight.origin === params.origin &&
                flight.destination === params.destination &&
                flight.departureDate === params.departureDate &&
                (!params.returnDate || flight.returnDate === params.returnDate) &&
                flight.adults >= params.adults &&
                flight.children >= params.children &&
                flight.infants >= params.infants &&
                (!params.travelClass || flight.travelClass === params.travelClass) &&
                flight.price <= params.price &&
                params.airlineCodes.split(',').some(code => flight.airlineCodes.includes(code))
            );
        } catch (error) {
            console.error('Error fetching flights:', error);
            return [];
        }
    }

    function displayFlightResults(results) {
        const flightResults = document.getElementById('flightResults');
        flightResults.innerHTML = '';

        if (results.length === 0) {
            flightResults.innerHTML = '<p>No flights found.</p>';
            return;
        }

        results.forEach(flight => {
            const flightCard = document.createElement('div');
            flightCard.className = 'flight-card';

            flightCard.innerHTML = `
                <h3>Flight from ${flight.origin} to ${flight.destination}</h3>
                <p>Departure: ${flight.departureDate}</p>
                <p>Return: ${flight.returnDate || 'N/A'}</p>
                <p>Adults: ${flight.adults}, Children: ${flight.children}, Infants: ${flight.infants}</p>
                <p>Travel Class: ${flight.travelClass}</p>
                <p>Price: $${flight.price}</p>
                <p>Airlines: ${flight.airlineCodes.join(', ')}</p>
            `;

            flightResults.appendChild(flightCard);
        });
    }

    document.getElementById('search').addEventListener('click', async () => {
        const params = {
            origin: document.getElementById('origin').value,
            destination: document.getElementById('destination').value,
            departureDate: document.getElementById('departureDate').value,
            returnDate: document.getElementById('returnDate').value,
            adults: parseInt(document.getElementById('adults').value),
            children: parseInt(document.getElementById('children').value),
            infants: parseInt(document.getElementById('infants').value),
            travelClass: document.getElementById('travelClass').value,
            price: parseFloat(document.getElementById('price').value),
            airlineCodes: document.getElementById('airlineCodes').value
        };

        const flightResults = await fetchFlights(params);
        displayFlightResults(flightResults);
    });

    createSuggestions('origin', 'originSuggestions');
    createSuggestions('destination', 'destinationSuggestions');
});
