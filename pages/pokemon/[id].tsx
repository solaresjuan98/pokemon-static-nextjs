import { useState } from 'react';

import { GetStaticProps, NextPage, GetStaticPaths } from 'next';

// ?
import { Layout } from '../../components/layouts/Layout';
import { pokeApi } from '../../api';
import { Pokemon } from '../../interfaces';
import { Button, Card, Container, Grid, Text, Image } from '@nextui-org/react';
import { localFavorites } from '../../util';



interface Props {
  pokemon: Pokemon;
  // id: string;
  // name: string;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorites, setIsInFavorites] = useState(localFavorites.pokemonExists(pokemon.id));

  // console.log(pokemon)

  const onToggleFavorite = () => {
    // console.log("id: ", pokemon.id)
    // localStorage.setItem('favorites', pokemon.id.toString())
    localFavorites.toggleFavorite(pokemon.id)
    setIsInFavorites(!isInFavorites);
  }



  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>

        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>

              <Button
                color="gradient"
                ghost={!isInFavorites}
                onPress={onToggleFavorite}
              >
                {isInFavorites ? 'Favorites' : 'Save in favorites'}
                
              </Button>

            </Card.Header>

            <Card.Body>
              <Text size={30}>
                Sprites:
              </Text>

              <Container direction='row' display='flex'>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}

                />

                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}

                />

                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}

                />

                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}

                />
              </Container>

            </Card.Body>


          </Card>
        </Grid>

      </Grid.Container>
    </Layout>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  ////const { data } = await  // your fetch function here 
  const allPokemons = [...Array(151)].map((value, index) => `${index + 1}`)

  return {
    paths: allPokemons.map(id => ({
      params: { id }
    })),
    fallback: false
  }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {

  //console.log(params);

  const { id } = params as { id: string };

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);


  return {
    props: {
      pokemon: data
    }
  }
}


export default PokemonPage;