

const toggleFavorite = (id: number) => {

    console.log('toggleFavorite');

    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');


    if (favorites.includes(id)) {
        favorites = favorites.filter(pokemonId => pokemonId !== id);
    } else {
        favorites.push(id)
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))

}

const pokemonExists  = (id: number): boolean => {

    if (typeof window === 'undefined') return false;

    const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');


    return favorites.includes(id);


}

export default {
    toggleFavorite,
    pokemonExists
}