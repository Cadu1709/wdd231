document.addEventListener('DOMContentLoaded', function() {
    // Set the current timestamp
    document.getElementById('timestamp').value = new Date().toISOString();

    // Handle the "Learn More" button click to open the modal
    document.getElementById('membershipModalTrigger').addEventListener('click', function() {
        document.getElementById('membershipModal').showModal();
    });

    // Handle form submission
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the default way

        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            organizationTitle: document.getElementById('organizationTitle').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            organizationName: document.getElementById('organizationName').value,
            membershipLevel: document.getElementById('membershipLevel').value,
            description: document.getElementById('description').value,
            timestamp: document.getElementById('timestamp').value
        };

        // Store form data in localStorage
        localStorage.setItem('formData', JSON.stringify(formData));

        // Redirect to thank you page
        window.location.href = 'thankyou.html';

        //clear form after submission.
        form.reset();
    });
});

