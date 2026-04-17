//poke'mon got them all! fetch with DOM
const container = document.getElementById("pokemon-container");
const addBtn = document.getElementById("add-btn");
const removeBtn = document.getElementById("remove-btn");

function fetchRandomPokemon() {
  const randomId = Math.floor(Math.random() * 151) + 1;
  const url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

  fetch(url)
    .then(function (response) {
      if (!response.ok) throw new Error("not ok 200");
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderPokemon(data);
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

function renderPokemon(pokemonData) {
  const card = document.createElement("div");
  card.className =
    "w-[200px] h-[130px] bg-slate-200 border border-gray-800 relative rounded-md shadow-sm";

  const img = document.createElement("img");
  img.src = pokemonData.sprites.front_default;
  img.alt = pokemonData.name;
  img.className =
    "absolute top-[15px] right-[15px] w-[80px] h-[80px] object-contain";

  const name = document.createElement("span");
  name.innerText = pokemonData.name;
  name.className = "absolute bottom-[10px] left-[15px] text-[22px] capitalize";

  card.appendChild(img);
  card.appendChild(name);
  container.appendChild(card);
}

function removeLastPokemon() {
  const lastCard = container.lastElementChild;
  if (lastCard) {
    container.removeChild(lastCard);
  }
}

addBtn.addEventListener("click", fetchRandomPokemon);
removeBtn.addEventListener("click", removeLastPokemon);
