import styles from '/styles/BackgroundComponentStyle.module.css'
import DpadAndConfirmButtonsContainer from './DpadAndConfirmButtonsContainer'
import SlimButtonsContainer from './SlimButtonsContainer'
import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import placeHolderImage from '/public/noMatch.png'


export default function BackgroundComponent() {
  const inputValComponent = useRef(null);

  const [currentPokemonPicture, setCurrentPokemonPicture] = useState('')

  const submittedPokemon = useCallback(async () => {
    const currentValue = inputValComponent.current.value;
    const lowerCasedValue = currentValue.toLowerCase();

    try {
      const getData = await fetch(`https://pokeapi.co/api/v2/pokemon/${lowerCasedValue}`)
      const convertToJson = await getData.json()
      const getPokemonSprite = convertToJson.sprites.front_default
      setCurrentPokemonPicture(getPokemonSprite)
      console.log(getPokemonSprite)
    }
    catch (err) {
      console.log(err + "pokemon not found")
      setCurrentPokemonPicture('/noMatch.png');
    }
  })
  function PokemonDisplay({ imageToDisplay }) {
    return (
      <div className={styles.pokemonDisplayContainer}>
        <img src={imageToDisplay}></img>
      </div>
    );
  }
  
  return (
    <div className={styles.bgImage}>
      {/* <PokemonDisplayContainer image={currentPokemonPicture} /> */}
      <PokemonDisplay imageToDisplay={currentPokemonPicture} />
      <DpadAndConfirmButtonsContainer buttonClickedFunction={submittedPokemon} />
      <SlimButtonsContainer />
      <div className={styles.greenScreen}>
        <input type="text"
          ref={inputValComponent}
          id={styles.textField}
          placeholder="Search Pokemon"
          onKeyUp={(e) => {
            if (e.key === 'Enter') submittedPokemon();
          }}

        />
      </div>
    </div>
  )
}
