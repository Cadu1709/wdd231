document.addEventListener('DOMContentLoaded', function() {
    var footer = document.querySelector('footer');
    
    
    // Get the current year
    const currentYear = new Date().getFullYear();

    // Update the span element with the current year
    document.getElementById('currentyear').textContent = ` \u00A9 ${currentYear}`;

    // Get the last modified date of the file
    const lastModified = new Date(document.lastModified);

    // Format the last modified date as required (e.g., "MM/DD/YYYY HH:MM:SS")
    const formattedLastModified = `${lastModified.getMonth() + 1}/${lastModified.getDate()}/${lastModified.getFullYear()} ${lastModified.getHours()}:${lastModified.getMinutes()}:${lastModified.getSeconds()}`;

    // Update the paragraph element with the last modified date
    document.getElementById('lastModified').textContent = `Last Modified: ${formattedLastModified}`;
    
});
