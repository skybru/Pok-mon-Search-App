const pokeInput = document.getElementById("search-input");
const pokeForm = document.getElementById("search-container");
const pokeName = document.getElementById("pokemon-name");
const pokeId = document.getElementById("pokemon-id");
const pokeWeight = document.getElementById("weight");
const pokeHeight = document.getElementById("height");
const pokeTypes = document.getElementById("types");
const pokeHp = document.getElementById("hp");
const pokeAttack = document.getElementById("attack");
const pokeDefense = document.getElementById("defense");
const pokeSpAtt = document.getElementById("special-attack");
const pokeSpDef = document.getElementById("special-defense");
const pokeSpeed = document.getElementById("speed");
const pokeSprite = document.getElementById("sprite-container");
const pokeEndpoint = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
const infoContainer = document.getElementById("information-container");

const fetchData = async (input) => {
    let allData = {};

    try {
        const allPokemon = await fetch(pokeEndpoint);
        allData = await allPokemon.json();
        //console.log(allData);
    } catch (e) {
        console.log(e);
    }
    
    const {results} = allData;

    for (let item of results) {
        const {id, name, url} = item;
        //number, string, string
        //console.log(typeof(input)) = string

        if (id.toString() === input || name === input ) {
            //console.log(url);
            return showPokemonData(url);
        }
    }

    alert("Pokémon not found");
    infoContainer.style.display = "none";
};

const showPokemonData = async (pokeUrl) => {
    let pokeDataJson = {};

    try {
        const pokemonData = await fetch(pokeUrl);
        pokeDataJson = await pokemonData.json();
        //console.log(pokeDataJson);
    } catch (e) {
        console.log(e);
    }

    const {name, id, weight, height, stats, sprites, types} = pokeDataJson;
    infoContainer.style.display = "block";

    pokeName.innerHTML = `${name.toUpperCase()}`;
    pokeId.innerHTML = `#${id}`;
    pokeWeight.innerHTML += `${weight}lbs`;
    pokeHeight.innerHTML += `${height}"`;
    pokeTypes.innerHTML = types.map(item => {
        return `<div id=${item.type.name}>${item.type.name.toUpperCase()}</div>`;
    }).join("");
    pokeSprite.innerHTML = `<img id="sprite" src=${sprites.front_default}>`;
    pokeHp.innerHTML += stats[0].base_stat;
    pokeAttack.innerHTML += stats[1].base_stat;
    pokeDefense.innerHTML += stats[2].base_stat;
    pokeSpAtt.innerHTML += stats[3].base_stat;
    pokeSpDef.innerHTML += stats[4].base_stat;
    pokeSpeed.innerHTML += stats[5].base_stat;
};

const formatInput = (input) => {
    const regex = /(\s)|[^a-zA-Z0-9-]/g;
    const formatted = input.toLowerCase().replace(regex, "");
    //console.log(formatted);
    fetchData(formatted);
};

pokeForm.addEventListener("submit", (event) => {
    event.preventDefault(); //prevent page refresh after clicking submit
    formatInput(pokeInput.value);
    infoContainer.style.display = "none";
    pokeName.innerHTML = "Name: ";
    pokeId.innerHTML = "ID: ";
    pokeWeight.innerHTML = "Weight: ";
    pokeHeight.innerHTML = "Height: ";
    pokeHp.innerHTML = "HP: "
    pokeAttack.innerHTML = "Att: ";
    pokeDefense.innerHTML = "Def: ";
    pokeSpAtt.innerHTML = "Sp. Att: ";
    pokeSpDef.innerHTML = "Sp. Def: ";
    pokeSpeed.innerHTML = "Speed: ";
    pokeTypes.innerHTML = "";
    pokeSprite.innerHTML = "";
});