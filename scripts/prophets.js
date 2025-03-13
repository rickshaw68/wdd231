const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');
const filterButtons = document.querySelectorAll('.filter-btn');

async function getProphetData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayProphets(data.prophets);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

const displayProphets = (prophets) => {
    cards.innerHTML = ''; // Clear previous results
    prophets.forEach((prophet) => {
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let birthDate = document.createElement('p');
        let birthPlace = document.createElement('p');
        let orderInfo = document.createElement('p');
        let portrait = document.createElement('img');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

        const suffixes = ['th', 'st', 'nd', 'rd'];
        const order = prophet.order;
        const suffix = (order % 100 >= 11 && order % 100 <= 13) ? 'th' : suffixes[order % 10] || 'th';
        orderInfo.textContent = `${order}${suffix} President`;

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${order}${suffix} Latter-day President`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(orderInfo);
        card.appendChild(portrait);

        cards.appendChild(card);
    });
};

const filterProphets = (criteria) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let filteredProphets = data.prophets;
            switch (criteria) {
                case 'utah':
                    filteredProphets = filteredProphets.filter(prophet => prophet.birthplace.includes('Utah'));
                    break;
                case 'outsideUS':
                    filteredProphets = filteredProphets.filter(prophet => prophet.birthplace.includes('England'));
                    break;
                case 'lived95':
                    filteredProphets = filteredProphets.filter(prophet => {
                        if (!prophet.death) return false;
                        const birthYear = parseInt(prophet.birthdate.split(' ').pop(), 10);
                        const deathYear = parseInt(prophet.death.split(' ').pop(), 10);
                        return (deathYear - birthYear) >= 95;
                    });
                    break;
                case 'tenChildren':
                    filteredProphets = filteredProphets.filter(prophet => prophet.numofchildren >= 10);
                    break;
                case 'fifteenYears':
                    filteredProphets = filteredProphets.filter(prophet => prophet.length >= 15);
                    break;
                case 'showAll':
                    filteredProphets = data.prophets;
                default:
                    break;
            }
            displayProphets(filteredProphets);
        })
        .catch(error => console.error('Fetch error:', error));
};

filterButtons.forEach(button => {
    button.addEventListener('click', () => filterProphets(button.dataset.filter));

});

getProphetData();
