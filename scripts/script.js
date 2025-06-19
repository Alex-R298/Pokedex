let offset = 0;
const limit = 24;
let allPokemons = [];


async function init() {
    await loadPokemon();
    renderPokemonCards();
    initSearchFunction();
}


async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    let response = await fetch(url);
    let data = await response.json();

    for (let pokemon of data.results) {
        let pokemonData = await fetch(pokemon.url);
        let pokemonJson = await pokemonData.json();
        allPokemons.push(pokemonJson);
    }
}


function renderPokemonCards(pokemonList = allPokemons) {
    let pokemonContainer = document.getElementById('pokedex');
    pokemonContainer.innerHTML = '';

    for (let pokemon of pokemonList) {
        let card = createPokemonCard(pokemon);
        pokemonContainer.appendChild(card);
    }
}


function createPokemonCard(pokemon) {
    let card = document.createElement('div');
    let primaryType = pokemon.types[0].type.name;
    card.className = `pokemon-card br box-s ${primaryType}-bg`;

    card.innerHTML = generatePokemonCardHTML(pokemon);

    card.addEventListener('click', () => showPokemonDetails(pokemon));
    return card;
}


async function showPokemonDetails(pokemon) {
    const overlay = document.getElementById('overlay');
    const currentIndex = allPokemons.findIndex(p => p.id === pokemon.id);
    const prevPokemon = allPokemons[currentIndex - 1];
    const nextPokemon = allPokemons[currentIndex + 1];

    const pokemonDescription = await getPokemonDescription(pokemon);

    overlay.innerHTML = generatePokemonOverlayHTML(
        pokemon,
        prevPokemon,
        nextPokemon,
        currentIndex,
        pokemonDescription
    );

    overlay.classList.remove('d-none');
}


function toggleOverlay() {
    let overlayRef = document.getElementById('overlay');
    let handleClickOutside = (event) => {
        if (event.target === overlayRef) {
            overlayRef.classList.add('d-none');
            overlayRef.removeEventListener('click', handleClickOutside);
        }
    };

    if (!overlayRef.classList.contains('d-none')) {
        overlayRef.addEventListener('click', handleClickOutside);
    }
}


function closeOverlay(event) {
    if (event) {
        event.stopPropagation();
    }
    const overlay = document.getElementById('overlay');
    overlay.classList.add('d-none');
}


async function getPokemonDescription(pokemon) {
    const speciesResponse = await fetch(pokemon.species.url);
    const speciesData = await speciesResponse.json();
    const englishEntry = speciesData.flavor_text_entries.find(
        entry => entry.language.name === "en"
    );
    return englishEntry ? englishEntry.flavor_text.replace(/\f/g, ' ') : 'No description available.';
}


async function loadMore() {
    loadingScreen();

    setTimeout(async () => {
        offset += limit;
        await loadPokemon();
        renderPokemonCards();
    }, 1250);
}


function loadingScreen() {
    let loading = document.getElementById('loadOverlay');
    loading.classList.remove('d-none');

    setTimeout(() => {
        loading.classList.add('d-none');
    }, 1250);
}


function initSearchFunction() {
    const searchInput = document.querySelector('.input-design');
    searchInput.addEventListener('input', handleSearch);
}


function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm.startsWith('#')) {
        const searchId = searchTerm.substring(1);
        const filteredPokemon = allPokemons.filter(pokemon =>
            String(pokemon.id).padStart(3, '0').includes(searchId)
        );
        renderPokemonCards(filteredPokemon);
    }

    else {
        const filteredPokemon = allPokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchTerm)
        );
        renderPokemonCards(filteredPokemon);
    }
}

