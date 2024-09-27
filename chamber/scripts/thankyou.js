document.addEventListener('DOMContentLoaded', function() {
    // Retrieve form data from localStorage
    const formData = JSON.parse(localStorage.getItem('formData'));

    //use the back button to the form
    document.getElementById('back').addEventListener("click",redirect);

    //create a function to redirect back to page.
    function redirect() {
        window.location.href = "join.html"
    }

    // Display form data
    if (formData) {
        const formDataDiv = document.getElementById('formData');
        formDataDiv.innerHTML = `
            <p><strong>First Name:</strong> ${formData.firstName}</p>
            <p><strong>Last Name:</strong> ${formData.lastName}</p>
            <p><strong>Organizational Title:</strong> ${formData.organizationTitle}</p>
            <p><strong>Email Address:</strong> ${formData.email}</p>
            <p><strong>Mobile Phone Number:</strong> ${formData.phone}</p>
            <p><strong>Organization Name:</strong> ${formData.organizationName}</p>
            <p><strong>Membership Level:</strong> ${formData.membershipLevel}</p>
            <p><strong>Organization Description:</strong> ${formData.description}</p>
            <p><strong>Timestamp:</strong> ${formData.timestamp}</p>
        `;

        // Clear the form data from localStorage
        localStorage.removeItem('formData');
    }
});
