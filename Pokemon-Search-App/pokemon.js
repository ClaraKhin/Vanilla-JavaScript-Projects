const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonDetails = document.querySelector(".pokemon-details");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const sprite = document.getElementById("sprite");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");

const stats = {
  hp: document.getElementById("hp"),
  attack: document.getElementById("attack"),
  defense: document.getElementById("defense"),
  "special-attack": document.getElementById("special-attack"),
  "special-defense": document.getElementById("special-defense"),
  speed: document.getElementById("speed"),
};

const API_URL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

// Function to fetch Pokémon data
async function fetchPokemon() {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    alert("Please enter a Pokémon name or ID!");
    return;
  }

  try {
    const response = await fetch(`${API_URL}${query}`);
    if (!response.ok) throw new Error("Pokémon not found");

    const data = await response.json();
    updateUI(data);
  } catch (error) {
    alert("Pokémon not found");
    pokemonDetails.style.display = "none"; // Hide details if not found
  }
}

// Listen for click event on the search button
searchButton.addEventListener("click", fetchPokemon);

// Listen for "Enter" key event on the input field
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    fetchPokemon();
  }
});

function updateUI(data) {
  pokemonDetails.style.display = "block"; // Show when search is successful

  // Name in uppercase
  pokemonName.textContent = data.name.toUpperCase();

  // ID should be in #id format
  pokemonId.textContent = `#${data.id}`;

  // Assign weight and height (only numbers)
  weight.textContent = data.weight;
  height.textContent = data.height;

  // Show Pokémon sprite
  sprite.src = data.sprites.front_default;
  sprite.hidden = false;

  // Clear and update types
  types.innerHTML = "";
  data.types.forEach((t) => {
    const typeElement = document.createElement("span");
    typeElement.textContent = t.type.name.toUpperCase();
    typeElement.style.marginRight = "8px";
    types.appendChild(typeElement);
  });

  // Assign stats values
  data.stats.forEach((s) => {
    stats[s.stat.name].textContent = s.base_stat;
  });
}
    