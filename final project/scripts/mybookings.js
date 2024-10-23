document.addEventListener('DOMContentLoaded', () => {
    const bookingDetails = document.getElementById('bookingDetails');
    const booking = JSON.parse(localStorage.getItem('booking'));

    if (booking) {
        bookingDetails.innerHTML = `
            <p><strong>Name:</strong> ${booking.name}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Service:</strong> ${booking.service}</p>
        `;
    } else {
        bookingDetails.innerHTML = '<p>No bookings found.</p>';
    }
    //set the back button to redirect you to home page.
    document.getElementById('back').addEventListener("click",redirectJoin);

    //create function to redirect
    function redirectJoin() {
        window.location.href = ("index.html")
    }
});
