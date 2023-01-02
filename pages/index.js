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
        <title>Pokedex by Gilbert Matos</title>
        <meta property= "og: title" content="Pokedex by Gilbert Matos" key="title"/>
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
