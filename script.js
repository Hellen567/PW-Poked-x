const BASEURL = 'https://pokeapi.co/api/v2/pokemon/'
const BASEURLIMG = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/2.png'


// ----------------------- Adicionar ao time --------------------------------

let equipePokemon = [];

async function fetchPokemonList() {
    try {
        const response = await fetch(`${BASEURL}?limit=251`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching Pokémon list:', error);
    }
}

async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon details:', error);
    }
}

function renderPokemonList(pokemonList) {
    const pokemonListElement = document.getElementById('pokemon-list');

    pokemonList.forEach(pokemon => {
        const li = document.createElement('li');
        li.classList.add('pokemon-card');
        li.textContent = `${pokemon.name}`;
        li.addEventListener('click', () => showPokemonDetails(pokemon.url));
        pokemonListElement.appendChild(li);
    });
}

function showPokemonDetails(url) {
    const pokemonDetailsElement = document.getElementById('pokemon-details');
    const imageElement = document.getElementById('pokemon-image');
    const numberElement = document.getElementById('pokemon-number');
    const nameElement = document.getElementById('pokemon-name');
    const capturarButton = document.getElementById('capturar-button');

    fetchPokemonDetails(url)
        .then(pokemonDetails => {
            imageElement.src = pokemonDetails.sprites.front_default;
            numberElement.textContent = `Número: ${pokemonDetails.id}`;
            nameElement.textContent = `Nome: ${pokemonDetails.name}`;
            capturarButton.onclick = () => capturarPokemon(pokemonDetails.name, pokemonDetails.sprites.front_default);

            pokemonDetailsElement.classList.remove('hidden');
        });
}

function capturarPokemon(nome, imagem) {
    if (equipePokemon.length < 6) {
        equipePokemon.push({ nome, imagem });
        renderEquipePokemon();
        alert(`${nome} foi capturado!`);
    } else {
        alert('Sua equipe já está cheia!');
    }
}

function renderEquipePokemon() {
    const timeListElement = document.getElementById('time-list');
    timeListElement.innerHTML = '';

    equipePokemon.forEach(pokemon => {
        const li = document.createElement('li');
        li.classList.add('time-card');
        li.textContent = pokemon.nome;
        timeListElement.appendChild(li);
    });
}

async function initialize() {
    const pokemonList = await fetchPokemonList();
    renderPokemonList(pokemonList);
}

initialize();
// -------------------------------------------------------------------------------------

// -------------------------- Fotos nos cards de time 00 ----------------------

function renderEquipePokemon() {
    const timeListElement = document.getElementById('time-list');
    timeListElement.innerHTML = '';

    if (equipePokemon.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Nenhum Pokémon capturado ainda.';
        timeListElement.appendChild(emptyMessage);
    } else {
        equipePokemon.forEach(pokemon => {
            const li = document.createElement('li');
            li.classList.add('time-card');

            const img = document.createElement('img');
            img.src = pokemon.imagem;
            img.alt = pokemon.nome;
            img.classList.add('time-card-img');

            const ul = document.createElement('ul');
            ul.classList.add('time-card-list');

            const nomeLi = document.createElement('li');
            nomeLi.textContent = `Nome: ${pokemon.nome}`;

            ul.appendChild(nomeLi);

            li.appendChild(img);
            li.appendChild(ul);

            timeListElement.appendChild(li);
        });
    }
}
// -------------------------------------------------------------------------------------
// ------------------------- Detalhes do Pokémon 00 ---------------------------------------

function renderPokemonList(pokemonList) {
    const pokemonListElement = document.getElementById('pokemon-list');

    pokemonList.forEach(pokemon => {
        const li = document.createElement('li');
        li.classList.add('pokemon-card');
        li.textContent = `${pokemon.name}`;

        fetchPokemonDetails(pokemon.url)
            .then(pokemonDetails => {
                const img = document.createElement('img');
                img.src = pokemonDetails.sprites.front_default;
                img.alt = pokemonDetails.name;
                img.classList.add('pokemon-image');

                const height = pokemonDetails.height / 10; // Deiva em metros
                const weight = pokemonDetails.weight / 10; // Deixa em quilogramas

                const heightElement = document.createElement('p');
                heightElement.textContent = `Altura: ${height} m`;

                const weightElement = document.createElement('p');
                weightElement.textContent = `Peso: ${weight} kg`;

                li.appendChild(img);
                li.appendChild(heightElement);
                li.appendChild(weightElement);

                li.addEventListener('click', () => showPokemonDetails(pokemonDetails));
            });

        pokemonListElement.appendChild(li);
    });
}
// -------------------------------------------------------------------------------------
// ------------------------- Imagem e informações na captura 00 ----------------------

function showPokemonDetails(pokemonDetails) {
    const pokemonDetailsElement = document.getElementById('pokemon-details');
    const imageElement = document.getElementById('pokemon-image');
    const numberElement = document.getElementById('pokemon-number');
    const nameElement = document.getElementById('pokemon-name');
    const heightElement = document.getElementById('pokemon-height');
    const weightElement = document.getElementById('pokemon-weight');
    const capturarButton = document.getElementById('capturar-button');

    imageElement.src = pokemonDetails.sprites.front_default;
    imageElement.alt = pokemonDetails.name;
    numberElement.textContent = `Número: ${pokemonDetails.id}`;
    nameElement.textContent = `Nome: ${pokemonDetails.name}`;
    heightElement.textContent = `Altura: ${pokemonDetails.height / 10} m`;
    weightElement.textContent = `Peso: ${pokemonDetails.weight / 10} kg`;
    capturarButton.onclick = () => capturarPokemon(pokemonDetails.name, pokemonDetails.sprites.front_default);

    pokemonDetailsElement.classList.remove('hidden');
}
// -------------------------------------------------------------------------------------