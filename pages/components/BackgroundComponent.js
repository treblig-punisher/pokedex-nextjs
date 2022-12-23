import styles from '/styles/BackgroundComponentStyle.module.css'
import DpadAndConfirmButtonsContainer from './DpadAndConfirmButtonsContainer'
import SlimButtonsContainer from './SlimButtonsContainer'
import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import placeHolderImage from '/public/noMatch.png'


export default function BackgroundComponent() {
  const inputValComponent = useRef(null);

  const [currentPokemonPicture, setCurrentPokemonPicture] = useState('')
  const [currentPokemonStats, setCurrentPokemonStats] = useState({})

  const upperCasedWord = useCallback((value)=>{
    let valueNow = value
    if(valueNow !== undefined)
    {
      const upperCasedWord = valueNow.slice(0, 1).toUpperCase() + valueNow.slice(1)
      return upperCasedWord
    }
  })
  const submittedPokemon = useCallback(async () => {
    const currentValue = inputValComponent.current.value;
    const lowerCasedValue = currentValue.toLowerCase();

    try {
      const getData = await fetch(`https://pokeapi.co/api/v2/pokemon/${lowerCasedValue}`)
      const convertToJson = await getData.json()
      setCurrentPokemonStats(convertToJson)
      const getPokemonSprite = convertToJson.sprites.front_default
      setCurrentPokemonPicture(getPokemonSprite)
      console.log(getPokemonSprite)
    }
    catch (err) {
      console.log(err + "pokemon not found")
      setCurrentPokemonPicture('/noMatch.png');
      setCurrentPokemonStats({});
    }
  })
  function PokemonDisplay({ imageToDisplay, type, pokeName }) {
    return (
      <div className={styles.pokemonDisplayContainer}>
        <img draggable = {false} src={imageToDisplay}></img>
        <div className={styles.pokemonType}>{type}</div>
        <div className={styles.pokemonName}>{pokeName}</div>
      </div>
    );
  }
 
  return (
    <div className={styles.bgImage}>
      {/* <PokemonDisplayContainer image={currentPokemonPicture} /> */}
      <PokemonDisplay
        imageToDisplay={currentPokemonPicture}
        type={currentPokemonStats.type}
        pokeName={upperCasedWord(currentPokemonStats.name)}
       />
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
