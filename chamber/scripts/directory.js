//use dom content loaded
document.addEventListener('DOMContentLoaded', () => {
    const info = 'data/members.json';
    const cards = document.querySelector('#members');
    const toggleButton = document.getElementById('toggleview');

//function to fetch data
async function fetchMembers() {
    try {
        const response = await fetch(info);
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}
fetchMembers();
//function to display members
const displayMembers = (members) => {
    members.forEach(member => {
        //create elements to hold business descriptions.
        let card = document.createElement('section');

        let fullName = document.createElement('h2');
        let location = document.createElement('p');
        let contact = document.createElement('p')
        let web = document.createElement('p');
        let level = document.createElement('p');
        let portrait = document.createElement('img');

        //build the h2 content
        fullName.textContent = `Company Name: ${member.name}`;

        //build the p content
        location.textContent = `Address: ${member.address}`;
        contact.textContent = `Contact: ${member.phone}`;
        level.textContent = `Membership Level: ${member.membershipLevel}`
        web.textContent = `Webisite url: ${member.website}`;

        //build the potrait
        portrait.setAttribute('src', `images/${member.image}`);
        portrait.setAttribute('alt', `Portrait of ${member.name}`); // fill in the blank
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        //append created elements of the section
        card.appendChild(fullName);
        card.appendChild(location);
        card.appendChild(contact);
        card.appendChild(web);
        card.appendChild(level);
        card.appendChild(portrait);

        cards.appendChild(card);
            
    });//end of arrow function for cards
}

    //function to toogle the view between grid or list.
    toggleButton.addEventListener('click', () => {
        cards.classList.toggle('grid-view');
        cards.classList.toggle('list-view');
    });
});
