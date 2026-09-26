const petsGrid = document.querySelector('#pets-grid');

const dogNames = ['Chachi', 'Blacky', 'Mila', 'Longa', 'Scotty'];
const catNames = ['Salem', 'Bigotitos', 'Polvorón', 'Larry', 'Oreo'];
const ages = ['4 meses', '1 año', '2 años', '3 años', '6 meses'];

// Main Async Function to fetch data from APIs
async function getPets() {
    try {
        // Loading message
        petsGrid.innerHTML = '<p class="loading-msg">Cargando peluditos en adopción...</p>';

        // The amount of images can be modified by changing the amount at the end of each fetch.
        const dogResponse = await fetch('https://dog.ceo/api/breeds/image/random/6');
        const dogData = await dogResponse.json();

        const catResponse = await fetch('https://api.thecatapi.com/v1/images/search?limit=6');
        const catData = await catResponse.json();

        petsGrid.innerHTML = '';

        // If the number of Pet cards is superior to the arrays' lenght, they are assigned a standart name.
        // Dog cards render.
        dogData.message.forEach((dogImg, index) => {
            const petCard = createPetCard({
                url: dogImg,
                name: dogNames[index] || 'Firulais',
                breed: 'Perro',
                age: ages[index] || '1 año'
            });
            petsGrid.appendChild(petCard);
        });

        // Cat cards render
        catData.forEach((catImage, index) => {
            const petCard = createPetCard({
                url: catImage.url,
                name: catNames[index] || 'Minino',
                breed: 'Gato',
                age: ages[index] || '6 meses'
            });
            petsGrid.appendChild(petCard);
        });

    } catch (err) {
        console.error('Error al obtener los datos de la API:', err);
        petsGrid.innerHTML = '<p class="error-msg">Ocurrió un error al cargar las mascotas. Intenta más tarde.</p>';
    }
}

// Function to create the HTML structure of each pet card
function createPetCard(pet) {
    const card = document.createElement('div');
    card.classList.add('pet-card');

    card.innerHTML = `
        <img src="${pet.url}" alt="${pet.name}">
        <div class="pet-info">
            <h3>${pet.name}</h3>
            <p><strong>Raza:</strong> ${pet.breed}</p>
            <p><strong>Edad:</strong> ${pet.age}</p>
            <button class="pet-btn">Adoptar a ${pet.name}</button>
        </div>
    `;

    const adoptBtn = card.querySelector('.pet-btn');
    adoptBtn.addEventListener('click', () => {
        alert(`¡Gracias por tu interés en adoptar a ${pet.name}! Ve a la sección de Contacto para llenar tu solicitud.`);
    });

    return card;
}

getPets();