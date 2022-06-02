
import { Card, Grid } from '@nextui-org/react';
import { useState, useEffect } from 'react'
import { Layout } from '../../components/layouts'
import { FavoritePokemons } from '../../components/pokemon';
import { NoFavorites } from '../../components/ui'
import { localFavorites } from '../../util';

const FavovitesPage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {

    setFavoritePokemons(localFavorites.pokemons());
  }, [])


  return (
    <Layout title='Pokemons - Favorites'>

      {
        favoritePokemons.length === 0
          ? (
            <NoFavorites />
          )
          :
          (
            <FavoritePokemons pokemons={favoritePokemons} />
          )
      }


    </Layout>
  )
}

export default FavovitesPage