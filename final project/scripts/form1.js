document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("bookingModal");
    const btn = document.getElementById("bookNowBtn");
    const span = document.getElementsByClassName("close")[0];

    // Hide the modal initially
    modal.style.display = "none";

    // Open the modal when the button is clicked
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // Close the modal when the span is clicked
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    // Handle form submission
    const form = document.querySelector('form');
    form.onsubmit = function(event) {
        event.preventDefault();

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;

        // Store form data in local storage
        const booking = { name, email, service };
        localStorage.setItem('booking', JSON.stringify(booking));

        // Redirect to mybookings.html
        window.location.href = 'mybookings.html';
    }
});
