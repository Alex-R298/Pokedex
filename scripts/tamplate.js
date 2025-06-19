const statMap = {
    hp: 'HP',
    attack: 'ATK',
    defense: 'DEF',
    specialattack: 'SpA',
    specialdefense: 'SpD',
    speed: 'SPD',
}


const normalizeStatName = (name) => {
    return name
        .toLowerCase()
        .replace('special-attack', 'specialattack')
        .replace('special-defense', 'specialdefense')
        .replace('special attack', 'specialattack')
        .replace('special defense', 'specialdefense')
        .replace(/-/g, '');
};


function generatePokemonCardHTML(pokemon) {
    return `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h3>#${pokemon.id} ${pokemon.name}</h3>
        <div class="types">
            ${pokemon.types.map(type => `<span class="type ${type.type.name}">${type.type.name}</span>`).join('')}
        </div>
    `;
}


function generatePokemonOverlayHTML(pokemon, prevPokemon, nextPokemon, currentIndex, pokemonDescription) {
    return `
        <div class="overlay-content">
            <button onclick="closeOverlay(event)" class="close-btn">
                <img class="img-btn" src="./img/close.png" alt="">
            </button>
            
            <div class="pokemon-main-info">
    <div class="pokemon-header br box-s ${pokemon.types[0].type.name}-bg">
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" class="large-pokemon-image">
        <div class="pokemon-id">#${String(pokemon.id).padStart(3, '0')}</div>
        <h1 class="pokemon-name">${pokemon.name}</h1>
        <div class="types">
            ${pokemon.types.map(type => `<span class="type ${type.type.name}">${type.type.name}</span>`).join('')}
        </div>
    </div>
</div>

            <h3 class="section-title">POKEDEX ENTRY</h3>
            <div class="info-box box-s">
                ${pokemonDescription}
            </div>

            <h3 class="section-title">ABILITIES</h3>
            <div class="info-ability">
                ${pokemon.abilities.map(ability => `<span class="ability box-s">${ability.ability.name}</span>`).join('')}
            </div>

            <div class="measurements-container">
                <div class="measurement-group">
                <h3>HEIGHT</h3>
                <div class="measurement-box box-s">
            <p>${pokemon.height / 10}m</p>
        </div>
            </div>
            <div class="measurement-group">
        <h3>WEIGHT</h3>
                <div class="measurement-box box-s">
            <p>${pokemon.weight / 10}kg</p>
                </div>
            </div>
            </div>

            <h3 class="section-title">STATS</h3>
            <div class="stats-container ">
                ${pokemon.stats.map(stat => `
                    <div class="stat-box box-s ${stat.stat.name}">
                        <div class="stat-name">${statMap[normalizeStatName(stat.stat.name)] || stat.stat.name.toUpperCase()}</div>
                        <div class="stat-value">${stat.base_stat}</div>
                    </div>
                `).join('')}
            </div>


            <div class="navigation-buttons">
                ${prevPokemon ? `
                    <button class="nav-btn prev box-s" onclick="showPokemonDetails(allPokemons[${currentIndex - 1}])">
                         <img class="" src="./img/left.png" alt=""> #${String(prevPokemon.id).padStart(3, '0')} ${prevPokemon.name}
                    </button>
                ` : ''}
                ${nextPokemon ? `
                    <button class="nav-btn next box-s" onclick="showPokemonDetails(allPokemons[${currentIndex + 1}])">
                        #${String(nextPokemon.id).padStart(3, '0')} ${nextPokemon.name} <img class="" src="./img/right.png" alt="">
                    </button>
                ` : ''}
            </div>
        </div>
    `;
}