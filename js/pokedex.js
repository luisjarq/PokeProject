window.onload = loadAll;
async function loadPokemonAsync(limit = 151) {
  console.log("fetching pokemons");
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`
  );
  const json = await response.json();
  return json.results;
}
async function loadPokemonDataAsync(pokemon) {
  const response = await fetch(pokemon.url);
  const json = await response.json();
  return json;
}
async function createViewAsync(pokemon) {
  const pokeData = await loadPokemonDataAsync(pokemon);
  const types = pokeData.types.map((t) => t.type.name.capitalize()).join(" ");
  const className = `div_${pokeData.types.map((t) => t.type.name).join("")}`;
  const imageNew = pokeData.sprites.other.dream_world.front_default;
  const content = document.querySelector(".content");
  const pokeDiv = document.createElement("div");
  pokeDiv.classList.add(className);
  pokeDiv.classList.add("target");
  const img = document.createElement("img");
  img.src = imageNew;
  img.alt = `${pokemon.name}_${pokeData.id}`;
  img.classList.add("zoom");
  const info = document.createElement("div");
  info.innerHTML = `
    <p class="info"># ${pokeData.id}</p>
    <p class="info">Name: ${pokemon.name.capitalize()}</p>
    <p class="info">Type: ${types}</p>
    <p class="info">Height: ${pokeData.height * 10} Cm</p>
    <p class="info">Weight: ${pokeData.weight / 10} Kg</p>
    `;
  pokeDiv.appendChild(img);
  pokeDiv.appendChild(info);
  content.appendChild(pokeDiv);
}
async function loadAll() {
  const pokemons = await loadPokemonAsync(151);
  pokemons.forEach(createViewAsync);
}
