document.addEventListener('DOMContentLoaded', () => {
    async function fetchHotels() {
        try {
            const response = await fetch('data/hotel.json');
            const hotels = await response.json();
            console.log('Fetched hotels:', hotels); // Debugging line
            return hotels;
        } catch (error) {
            console.error('Error fetching hotels:', error);
            return [];
        }
    }

    async function searchHotels() {
        const country = document.getElementById('country').value.toLowerCase();
        const city = document.getElementById('city').value.toLowerCase();
        const price = parseFloat(document.getElementById('price').value);

        console.log('Search criteria:', { country, city, price }); // Debugging line

        const hotels = await fetchHotels();
        const results = hotels.filter(hotel => {
            const hotelCountry = hotel.country.toLowerCase();
            const hotelCity = hotel.city.toLowerCase();
            const hotelPrice = parseFloat(hotel.price.replace('$', ''));

            return (
                (country ? hotelCountry.includes(country) : true) &&
                (city ? hotelCity.includes(city) : true) &&
                (price ? hotelPrice <= price : true)
            );
        });

        console.log('Search results:', results); // Debugging line
        displayResults(results);
    }

    function displayResults(results) {
        const hotelResults = document.getElementById('hotelResults');
        hotelResults.innerHTML = '';

        if (results.length === 0) {
            hotelResults.innerHTML = '<p>No hotels found.</p>';
            return;
        }

        results.forEach(hotel => {
            const hotelCard = document.createElement('div');
            hotelCard.className = 'hotel-card';

            hotelCard.innerHTML = `
                <h3>${hotel.name}</h3>
                <p>City: ${hotel.city}</p>
                <p>Country: ${hotel.country}</p>
                <p>Contact: ${hotel.phone}</p>
                <p>Price: ${hotel.price}</p>
                <img src="images/${hotel.image}" alt="Image of ${hotel.name}" loading="lazy" width="300" height="250">
            `;

            hotelResults.appendChild(hotelCard);
        });
    }

    document.getElementById('searchButton').addEventListener('click', searchHotels);
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('gameParksModal');
    const btn = document.getElementById('learnMoreBtn');
    const span = document.getElementsByClassName('close')[0];

    btn.onclick = function() {
        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});