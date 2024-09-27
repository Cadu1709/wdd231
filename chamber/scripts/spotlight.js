//use dom content loaded
document.addEventListener('DOMContentLoaded', () => {
    const info = 'data/members.json';
    const cards = document.querySelector('#members');
    //const toggleButton = document.getElementById('toggleview');

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

    //filter members basing on membership
    const qualifiedMembers = members.filter(member => member.membershipLevel === "Silver" || member.membershipLevel === "Gold");
    //console.log('Qualified Members:', qualifiedMembers);
    
    //randomly select members
    const randomMembers = getRandomMembers(qualifiedMembers, 2, 3);

    randomMembers.forEach(member => {
        //create elements to hold business descriptions.
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let location = document.createElement('p');
        let contact = document.createElement('p')
        let level = document.createElement('p');
        let portrait = document.createElement('img');

        //build the h2 content
        fullName.textContent = `Company Name: ${member.name}`;

        //build the p content
        location.textContent = `Address: ${member.address}`;
        contact.textContent = `Contact: ${member.phone}`;
        level.textContent = `Membership Level: ${member.membershipLevel}`

        //build the potrait
        portrait.setAttribute('src', `images/${member.image}`);
        portrait.setAttribute('alt', `Portrait of ${member.name}`); // fill in the blank
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '200');
        portrait.setAttribute('height', '440');

        //append created elements of the section
        //card.appendChild(title);
        card.appendChild(fullName);
        card.appendChild(location);
        card.appendChild(contact);
        card.appendChild(level);
        card.appendChild(portrait);

        cards.appendChild(card);
            
    });//end of arrow function for cards
}

//functiont to get a random selection of members
const getRandomMembers = (array, min, max) => {
    const numberOfMembers = Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffledArray = array.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, numberOfMembers);
}
});
