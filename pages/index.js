import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import BackgroundComponent from './components/BackgroundComponent'

import MainPokedexContainer from '/styles/MainPokedexContainer.module.css'
export default function Home() {
  console.log("component mainpokedex container");
  return (

    <div className={MainPokedexContainer.pokedexContainer}>
      <BackgroundComponent />  
    </div>
  )
  
}
