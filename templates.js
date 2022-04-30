function allPokemonCardMiniTemplate(i, img, type, name) {
    return `
    <div onclick="openPokemonCard(${i})" id="CardMiniColor${i}" class="pokemon-card-mini">
        <div>
            <div class="pokemon-number">#${i}</div>
            <div id="pokemonNameMini${i}" class="pokemon-card-name-mini">${name}</div>
            <span id="pokemonTypeMini${i}" class="pokemon-card-type">${type}</span>
        </div>
        <div class="pokemon-card-img-mini">
            <img id="pokedexCardImgMini" src="${img}" alt="">
        </div>
    </div>
    `;
}


function checkboxTemplate(pokemonType) {
    return`
    <div class="filterBox">
        <input class="input_filterBox" onclick="filterPokemon('${pokemonType}')" type="checkbox" id="checkbox-${pokemonType}" value="${pokemonType}">
        <label class="label" for="checkbox-${pokemonType}">${pokemonType}</label>
    </div>
`;
}