let pokeSearch = document.getElementById('search-term');
let pokeImage = document.getElementById('image');
let pokeName = document.getElementById('name');
let pokeType = document.getElementById('type')
let pokeWeight = document.getElementById('weight');
let pokeAbility = document.getElementById('ability');
let btnSearch = document.getElementById('search');
let container = document.getElementById('result');
let pokeSprite = document.getElementById('sprite');

const fetchApi = (pkmn) => {
  const pokeInfos = fetch(`https://pokeapi.co/api/v2/pokemon/${pkmn}`)
  .then((response) => response.json())
  .then((data) => {
    return data;
  });
  pokeSearch.value = '';
  container.style.display = 'flex';
  return pokeInfos;
}

function pressEnter() {
  pokeSearch.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
      btnSearch.click();
    }
  })
}

btnSearch.addEventListener('click', async (event) => {
  event.preventDefault();

  const pokeInfos = await fetchApi(pokeSearch.value.toLowerCase());
  let habilidades = '';
  let tipos = '';

  const newArray = pokeInfos.abilities;
  for (let i = 0; i < newArray.length; i++) {
  habilidades += `${newArray[i].ability.name} / `;
  }

  const arrayTipos = pokeInfos.types;
  for(let i = 0; i < arrayTipos.length; i++) {
    tipos += `${arrayTipos[i].type.name} / `;
  }
  
  habilidades = habilidades.slice(0, -2);
  tipos = tipos.slice(0, -2);

  pokeName.innerHTML = pokeInfos.species.name;
  pokeSprite.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokeInfos.id}.gif`;
  pokeType.innerHTML = `Tipo: ${tipos}`;
  pokeAbility.innerHTML = `Habilidades: ${habilidades} `;
  pokeWeight.innerHTML = `Peso: ${pokeInfos.weight}Kg`;
  container.removeAttribute('class');
  container.classList.toggle(`${pokeInfos.types[0].type.name}`)
})

pressEnter();
