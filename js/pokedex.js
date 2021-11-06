async function loadPokemonsAsync(limit, offset) {
  //console.log("fetching pokemons");
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
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
function createNavigator() {
  const navContainer = document.querySelector(".navigator");
  const nav = document.createElement("button");
  nav.innerText = "Load More";
  nav.addEventListener("click", loadPaginated);
  nav.classList.add("navigator_button");
  navContainer.appendChild(nav);
}
async function loadInitialView() {
  const pokemons = await loadPokemonsAsync(count, 0);
  for (const iterator of pokemons) {
    await createViewAsync(iterator);
  }
}

async function loadPaginated() {
  const offset = document.querySelector(".content").children.length;
  console.log(offset);
  if (offset > 151 - count) {
    count = 151 - offset;
    console.log(document.querySelector(".navigator_button").remove());
  }
  const pokemons = await loadPokemonsAsync(count, offset);
  for (const iterator of pokemons) {
    await createViewAsync(iterator);
  }
}

const pokemonCount = 151;
let count = 24;
loadInitialView();
createNavigator();
