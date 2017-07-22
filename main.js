'use strict';

const baseURL = 'http://pokeapi.co/api/v2/';
const pokemonURL = num => `${baseURL}pokemon/${num}/`;

const numbers = [3,27,384];

const getAndRenderPokemon = number =>
  fetch(pokemonURL(number))
  .then(response1 =>
    response1.json()
  )
  .then(json1 =>{
    const pokemon = {
      name: json1.name,
      id: json1.id,
      image: json1.sprites.front_default
    };
    return fetch(json1.species.url)
    .then(response2 =>
      response2.json()
    )
    .then(json2 => {
      if (json2.evolves_from_species !== null) {
        pokemon.evolution = json2.evolves_from_species.name;
      } else {
        pokemon.evolution = 'Es un bebito';
      }
      return pokemon;
    }
  );
  });

Promise.all(
  numbers.map(number =>
    getAndRenderPokemon(number)
  )
)
.then(pokemonList => {
  for (const pokemon of pokemonList) {
    paint(pokemon);
  }
})

const paint = pokemonData => {
  const results = document.querySelector('.pokemon-list');
  const {
    name,
    id,
    image,
    evolution
  } = pokemonData;

   results.innerHTML += `
     <div class="card">
       <p>${id}</p>
       <p>${name}</p>
       <p>${evolution}</p>
       <img src="${image}" />
     </div>
   `;
 }

for (const number of numbers) {
  getAndRenderPokemon(number);
}
