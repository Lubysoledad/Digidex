const API_URL = "https://digimon-api.vercel.app/api/digimon";

function makeCard(character) {
    const { name, img, level } = character;
    const cardsContainer = document.querySelector(".cards-container");

    // Crear elementos de la tarjeta
    const card = document.createElement("div");
    card.className = "card bg-base-100 shadow-xl w-64 m-4"; // Añadir margen

    const figure = document.createElement("figure");
    const characterImage = document.createElement("img");
    characterImage.src = img;
    characterImage.className = "w-150 p-2"; // Ajustar tamaño y añadir padding
    figure.appendChild(characterImage);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body p-4"; // Añadir padding

    const title = document.createElement("h2");
    title.className = "card-title text-sm mb-2"; // Añadir margen inferior y centrar texto
    title.textContent = name;

    const characterLevel = document.createElement("p");
    characterLevel.className = "lvl text-xs text-left"; // Ajustar tamaño del texto
    characterLevel.textContent = level;

    // Añadir elementos a la tarjeta
    cardBody.appendChild(title);
    cardBody.appendChild(characterLevel);
    card.appendChild(figure);
    card.appendChild(cardBody);

    // Añadir tarjeta al contenedor
    cardsContainer.appendChild(card);
}

async function getCharacters() {
    const nameInput = document.getElementById("nameInput").value.toLowerCase();
    const levelSelect = document.getElementById("levelSelect").value.toLowerCase();

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Limpiar el contenedor de tarjetas antes de agregar nuevas
        const cardsContainer = document.querySelector(".cards-container");
        cardsContainer.innerHTML = "";

        // Filtrar los Digimones por nombre y nivel
        const filteredData = data.filter(character => {
            const matchesName = character.name.toLowerCase().includes(nameInput);
            const matchesLevel = levelSelect ? character.level.toLowerCase() === levelSelect : true;
            return matchesName && matchesLevel;
        });

        filteredData.forEach(character => makeCard(character));
    } catch (error) {
        console.error('Error al obtener los Digimones:', error);
    }
}
