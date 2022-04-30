// pokemon date from url 1
let Pokemon;

// pokemon data from url 2
let Pokemon2;

// all checkboxes
let checkboxs;

let colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5',
    ghost: '#ADADAD'
};

let type = ['fire', 'grass', 'electric', 'water', 'ground', 'rock', 'fairy', 'poison', 'bug', 'dragon', 'psychic', 'flying', 'fighting', 'normal', 'ghost']

//  Number of Loaded pokemon
let pokemon_number = 51;



/**
 * deta from function renderAllPokemonInfoForCard()
 */
let AllWeight = [];
let Allheight = [];
let AllName = [];
let AllSpecies = [];
let AllType = [];
let AllImg = [];
let AllHabitat = [];
let AllAbility1 = [];



/**
 * deta from function renderAllPokemonStatForcard()
 */
let AllHP = [];
let AllAttack = [];
let AllDefense = [];
let AllSpec_atk = [];
let AllSpec_def = [];
let AllSpeed = [];



/**
 * load date from API 
 * load Pokedex with all pokemons
 */
async function loadPokedex() {

    checkbox()
    checkboxs = document.getElementsByClassName('input_filterBox');

    for (let i = 1; i < pokemon_number; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        Pokemon = await response.json();


        let url2 = `https://pokeapi.co/api/v2/pokemon-species/${i}`;
        let response2 = await fetch(url2);
        Pokemon2 = await response2.json();


        renderAllPokemonCardMini(i) /* rendert alle daten für die kleine Pokemon Karte // div ist im JavaScript definiert */
        renderAllPokemonInfoForCard() /* rendert alle daten für die grosse Pokemon Karte // div ist im HTML teil definiert */
        renderAllPokemonStatForcard()
        
    }

}


/**
 * render all mini pokemon cards
 * 
 * @param {number} i - number of loaded pokemon cards
 */
function renderAllPokemonCardMini(i) {

    let name = Pokemon['name'];
    name = name[0].toUpperCase() + name.slice(1); /*name[0].toUpperCase() -> name als string nulte stelle & slice(1) ab stelle 1 setzt alles zurück  */

    let img = Pokemon['sprites']['other']['dream_world']['front_default'];
    let type = Pokemon['types'][0]['type']['name'];


    document.getElementById('allPokemon').innerHTML += `
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

    document.getElementById(`CardMiniColor${i}`).style.backgroundColor = colors[type];


}




/**
 * Reads all abaut infos for Pokemons and stores in array
 */
function renderAllPokemonInfoForCard() {

    let species = Pokemon2['genera'][7]['genus'];
    species = species.split(" ").slice(0, -1).join(" "); // removes last word, which is always Pokemon
    AllSpecies.push(species)

    let type = Pokemon['types'][0]['type']['name'];
    AllType.push(type)

    let weight = Pokemon['weight'];
    AllWeight.push(weight)

    let height = Pokemon['height'];
    Allheight.push(height)

    let ability1 = Pokemon['abilities'][0]['ability']['name'];
    AllAbility1.push(ability1)

    let habitat = Pokemon2['habitat']['name'];
    AllHabitat.push(habitat)

    let img = Pokemon['sprites']['other']['dream_world']['front_default'];
    AllImg.push(img)

    let pokemonName = Pokemon['name'];
    AllName.push(pokemonName)

}

/**
 * Reads all stats for Pokemons and stores in array
 */
function renderAllPokemonStatForcard() {

    let HP = Pokemon['stats'][0]['base_stat'];
    AllHP.push(HP)

    let attack = Pokemon['stats'][1]['base_stat'];
    AllAttack.push(attack)

    let defense = Pokemon['stats'][2]['base_stat'];
    AllDefense.push(defense)

    let spec_atk = Pokemon['stats'][3]['base_stat'];
    AllSpec_atk.push(spec_atk)

    let spec_def = Pokemon['stats'][4]['base_stat'];
    AllSpec_def.push(spec_def)

    let speed = Pokemon['stats'][5]['base_stat'];
    AllSpeed.push(speed)

}


/**
 * load stats for big pokemon card
 * 
 * @param {number} i - number of the pokemon card you clicked on
 */
function showAllStatForPokemonCard(i) {

    let HP = AllHP[i - 1];
    let attack = AllAttack[i - 1];
    let defense = AllDefense[i - 1];
    let spec_atk = AllSpec_atk[i - 1];
    let spec_def = AllSpec_def[i - 1];
    let speed = AllSpeed[i - 1];

    document.getElementById('HP').innerHTML = HP;
    document.getElementById('attack').innerHTML = attack;
    document.getElementById('defense').innerHTML = defense;
    document.getElementById('spec-atk').innerHTML = spec_atk;
    document.getElementById('spec-def').innerHTML = spec_def;
    document.getElementById('speed').innerHTML = speed;


    /* Progress Bar width */
    document.getElementById('HPBar').style.width = `${HP}%`;
    document.getElementById('attackBar').style.width = `${attack}%`;
    document.getElementById('defenseBar').style.width = `${defense}%`;
    document.getElementById('specAtkBar').style.width = `${spec_atk}%`;
    document.getElementById('specDefBar').style.width = `${spec_def}%`;
    document.getElementById('speedBar').style.width = `${speed}%`;


    document.getElementById('pokemonNumber').innerHTML = `#${i}`;

}




/**
 * load abaut for big pokemon card
 * 
 * @param {number} i - number of the pokemon card you clicked on
 */
function showAllInforForPokemonCard(i) {

    let PokemonName = AllName[i - 1]; /* i - 1 weil im Array fängt man von 0 an zu zählen */
    PokemonName = PokemonName[0].toUpperCase() + PokemonName.slice(1);

    let species = AllSpecies[i - 1];
    let type = AllType[i - 1];
    let weight = AllWeight[i - 1];
    weight = WeightInKg(weight);
    let height = Allheight[i - 1];
    height = HeightInCm(height);
    let img = AllImg[i - 1];
    let habitat = AllHabitat[i - 1];
    let ability1 = AllAbility1[i - 1];


    document.getElementById('pokedexCardName').innerHTML = PokemonName;
    document.getElementById('pokedexCardSpecies').innerHTML = species;
    document.getElementById('pokemonCardTyp').innerHTML = type;
    document.getElementById('pokedexCardWeight').innerHTML = `${weight} kg`;
    document.getElementById('pokedexCardHeight').innerHTML = `${height} cm`;
    document.getElementById('pokedexCardImg').src = img;
    document.getElementById('pokedexCardHabitat').innerHTML = habitat;
    document.getElementById('pokedexCardAbilities').innerHTML = ability1;

    document.getElementById('pokedex-card').style.backgroundColor = colors[type];

}



/**
 * show single pokemon on big card
 * @param {number} i - number of the pokemon card you clicked on
 */
function openPokemonCard(i) { 
    document.getElementById('PokemonCardBody').classList.remove('d-none1');

    document.getElementById('statsNav').classList.remove('table-nav-activ')
    document.getElementById('aboutNav').classList.add('table-nav-activ')

    showAllInforForPokemonCard(i); /* rendert alle infos für die grosse Karte */
    showAllStatForPokemonCard(i)/* rendert alle infos für die kleine Karte */
}



/**
 * close single pokemon view
 */
function ClosePokemonCard() {
    document.getElementById('PokemonCardBody').classList.add('d-none1');
    document.getElementById('PokemonCardBody').classList.add('d-none1');

    showAbout();
}





/**
 * calculated height to cm and weight to kg 
 * @param {number} weight 
 * @param {number} height
 */
function WeightInKg(weight) {
    return weight / 10;
}

function HeightInCm(height) {
    return height * 10;
}




/**
 * shows the about of the pokemon
 */
function showAbout() {
    document.getElementById('AboutTable').classList.remove('d-none')
    document.getElementById('StatTable').classList.add('d-none')

    document.getElementById('statsNav').classList.remove('table-nav-activ')
    document.getElementById('aboutNav').classList.add('table-nav-activ')

}



/**
 * shows the stats of the pokemon
 */
function showStats() {
    document.getElementById('AboutTable').classList.add('d-none')
    document.getElementById('StatTable').classList.remove('d-none')

    document.getElementById('statsNav').classList.add('table-nav-activ')
    document.getElementById('aboutNav').classList.remove('table-nav-activ')
}


/**
 * sets colors to dark
 */
function darkmode() {
    const dark = document.getElementById('accept');

    if (dark.checked) {
        document.body.style.backgroundColor = "#3d3d3d";
        document.getElementById('navbar').classList.add('darkmode-nav')
        document.getElementById('PokemonCardBottom').classList.add('darkmodeCard')
        document.getElementById('filterBox').classList.add('darkmode-nav')
    } else {
        document.body.style.backgroundColor = "";
        document.getElementById('navbar').classList.remove('darkmode-nav')
        document.getElementById('PokemonCardBottom').classList.remove('darkmodeCard')
        document.getElementById('filterBox').classList.remove('darkmode-nav')
    }
}


/**
 * render all checkboxes for filtering by type
 */
function checkbox() {
    for (let i = 0; i < type.length; i++) {
        const pokemonType = type[i];

        document.getElementById('filterBox').innerHTML += `
            <div class="filterBox">
                <input class="input_filterBox" onclick="filterPokemon('${pokemonType}')" type="checkbox" id="checkbox-${pokemonType}" value="${pokemonType}">
                <label class="label" for="checkbox-${pokemonType}">${pokemonType}</label>
            </div>
        `;
    }
}





/**
 * Filters poekemon by type
 */
function filterPokemon() {

    let check = false;
    let checked = [];
    console.log(checked)
    console.log(check)
    for (let index = 0; index < checkboxs.length; index++) {
        const element = checkboxs[index];
        console.log(element.checked + " " + element.value)
        
        
        if (element.checked) {
            check = true;
            checked.push(element.value) 
        } 
        
    }

    
    

    for (let i = 1; i < pokemon_number; i++) {

        let pokemonCardElement = document.getElementById(`CardMiniColor${i}`);
        let pokemonType = document.getElementById(`pokemonTypeMini${i}`).innerHTML;
        

       
        if (check) {
            pokemonCardElement.classList.add('d-none')
            for (let t = 0; t < checked.length; t++) {
                const Type = checked[t];
                console.log(Type)
                if (Type == pokemonType) {
                    pokemonCardElement.classList.remove('d-none')
                }
            }
            
        } else (pokemonCardElement.classList.remove('d-none'))
    }

}



/**
 * Search pokemon by name
 */
function searchPokemon() {

    const input = document.getElementById("search").value;
    console.log(input)



    for (let i = 1; i < pokemon_number; i++) {

        let pokemonCardElement = document.getElementById(`CardMiniColor${i}`);
        console.log(pokemonCardElement)

        let pokemonMini = document.getElementById(`pokemonNameMini${i}`).innerHTML;
        pokemonCardName = pokemonMini.toLowerCase();

        if (!pokemonCardName.includes(input)) {
            pokemonCardElement.classList.add('d-none');
        }
        else {
            if (pokemonCardElement.classList.contains('d-none')) {
                pokemonCardElement.classList.remove('d-none');
            }

        }
    }

}