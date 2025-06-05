let allPokemons = [];

async function init() {
    await loadPokemon();
    renderPokemonCards();
}

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=24'; // Lädt die ersten 151 Pokemon
    let response = await fetch(url);
    let data = await response.json();
    
    for (let pokemon of data.results) {
        let pokemonData = await fetch(pokemon.url);
        let pokemonJson = await pokemonData.json();
        allPokemons.push(pokemonJson);
    }
}

function renderPokemonCards() {
    let main = document.querySelector('main');
    let pokemonContainer = document.createElement('div');
    pokemonContainer.className = 'pokemon-container';
    
    for (let pokemon of allPokemons) {
        let card = createPokemonCard(pokemon);
        pokemonContainer.appendChild(card);
    }
    
    main.appendChild(pokemonContainer);
}

// function createPokemonCard(pokemon) {
//     let card = document.createElement('div');
//     card.className = 'pokemon-card br box-s';
    
//     card.innerHTML = `
//         <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
//         <h3>#${pokemon.id} ${pokemon.name}</h3>
//         <div class="types">
//             ${pokemon.types.map(type => `<span class="type ${type.type.name}">${type.type.name}</span>`).join('')}
//         </div>
//     `;
    
//     return card;
// }

function createPokemonCard(pokemon) {
    let card = document.createElement('div');
    let primaryType = pokemon.types[0].type.name; // Nimmt den ersten Type des Pokemons
    card.className = `pokemon-card br box-s ${primaryType}-bg`; // Fügt Type-spezifische Klasse hinzu
    
    card.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h3>#${pokemon.id} ${pokemon.name}</h3>
        <div class="types">
            ${pokemon.types.map(type => `<span class="type ${type.type.name}">${type.type.name}</span>`).join('')}
        </div>
    `;
    
    return card;
}