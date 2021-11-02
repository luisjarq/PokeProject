window.onload = run;
async function loadPokemonAsync(limit = 151) {
  console.log("fetching pokemons");
  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`
  );
  let json = await response.json();
  return json.results;
}
async function loadPokemonData(pokemon) {
  let response = await fetch(pokemon.url);
  let json = await response.json();
  return json;
}
async function run() {
  let pokemons = await loadPokemonAsync(151);
  for (const pokemon of pokemons) {
    let pokeData = await loadPokemonData(pokemon);
    let types = pokeData.types.map((t) => t.type.name.capitalize()).join(" ");
    let className = `div_${pokeData.types.map((t) => t.type.name).join("")}`;
    let imageNew = pokeData.sprites.other.dream_world.front_default;
    let imageClassic = pokeData.sprites.front_default;
    let content = document.querySelector(".content");
    let pokeDiv = document.createElement("div");
    pokeDiv.classList.add(className);
    pokeDiv.classList.add('target');
    let img = document.createElement("img");
    img.src = imageNew;
    img.alt = `${pokemon.name}_${pokeData.id}`;
    img.classList.add("zoom");
    let info = document.createElement("div");
    info.innerHTML = `
    <p class="info"># ${pokeData.id}</p>
    <p class="info">Name: ${pokemon.name.capitalize()}</p>
    <p class="info">Type: ${types}</p>
    <p class="info">Height: ${pokeData.height*10} Cm</p>
    <p class="info">Weight: ${pokeData.weight/10} Kg</p>
    `;
    console.log(pokeData);
    pokeDiv.appendChild(img);
    pokeDiv.appendChild(info);
    content.appendChild(pokeDiv);
  }
}
