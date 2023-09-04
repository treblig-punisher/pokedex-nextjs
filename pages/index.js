import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import BackgroundComponent from './components/BackgroundComponent'

import MainPokedexContainer from '/styles/MainPokedexContainer.module.css'
export default function Home() {

  return (

    <>
      <Head>
        <link rel="icon" href="pokeball.ico"/>
        <title>Pokedex</title>
        <meta property= "og: title" content="Pokedex by Gilbert Matos" key="title"/>
        <meta name="description" content="A web based pokedex that allows you to look up for pokemons." />
        <meta name="twitter:site" content="@punisherx6"/>
        <meta name="twitter:title" content="Punisherx6 web developer"/>
        <meta name="twitter:description" content="Game/Web Dev and everything tech!"/>

      </Head>
      
      <div className={MainPokedexContainer.titleContainer}>
        <div className={MainPokedexContainer.pokedexTitle}>Pokedex</div>
      </div>
      <div className={MainPokedexContainer.pokedexContainer}>
        <BackgroundComponent />
      </div>
    </>
  )

}
