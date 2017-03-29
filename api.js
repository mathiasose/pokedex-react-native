const root = 'https://pokeapi.co/api/v2/'

const resources = {
    pokemonList: () => fetch(root + 'pokemon/').then((response) => response.json()),
    pokemon: (id) => fetch(root + 'pokemon/' + id + '/').then((response) => response.json()),
}

export default resources;