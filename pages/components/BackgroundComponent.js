import styles from '/styles/BackgroundComponentStyle.module.css'
import DpadAndConfirmButtonsContainer from './DpadAndConfirmButtonsContainer'
import SlimButtonsContainer from './SlimButtonsContainer'
import { useRef, useState, useCallback, useEffect } from 'react'


export default function BackgroundComponent() {
  const inputValComponent = useRef(null);

  const [currentPokemonPicture, setCurrentPokemonPicture] = useState('')
  const [currentPokemonStats, setCurrentPokemonStats] = useState({
    name: '',
    abilities: [],
    types: [],
    stats: {}
  })
 
  const upperCasedWord = useCallback((value) => {
    let valueNow = value
    if (valueNow !== undefined) {
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
      //this is the line that Ronni Commented out
      setCurrentPokemonStats(
        {
          name: convertToJson.name,
          abilities: convertToJson.abilities,
          types: convertToJson.types
        }
      )
      const getPokemonSprite = convertToJson.sprites.front_default
      setCurrentPokemonPicture(getPokemonSprite)
      console.log(getPokemonSprite)
      {
        
      // capturing pokemon information
      // const pokemonAbilities = [];
      // const pokemonTypes = [];
      // convertToJson.abilities.forEach(element => {
      //   pokemonAbilities.push(element.ability.name)
      // });
      // convertToJson.types.forEach(element => {
      //   pokemonTypes.push(element.type.name)
      // });
      // currentPokemonStats.stats = convertToJson.stats
      // currentPokemonStats.name = convertToJson.name
      // setCurrentPokemonStats(convertToJson)
      }
      console.log(currentPokemonStats)
      // -----------------------------------------
    }
    catch (err) {
      console.log(err + "pokemon not found")
      setCurrentPokemonPicture('/noMatch.png');
      setCurrentPokemonStats({});
    }
  })
  function PokemonDisplay({ imageToDisplay, type, pokeName }) {
    const DivBasedOnTypes = (types) => {
      // const typesArray = types.abilities.forEach(element => element.ability.name);
      return (<div className={styles.pokemonType}>{`Type here`}</div>)

    }
    return (
      <div className={styles.pokemonDisplayContainer}>
        <img draggable={false} src={imageToDisplay}></img>
        {/* <div className={styles.pokemonType}>{`${type[0]} ${type[1]}`}</div> */}
        <DivBasedOnTypes types={type} />
        <div className={styles.pokemonName}>{pokeName}</div>
      </div>
    );
  }

  return (
    <div className={styles.bgImage}>
      {/* <PokemonDisplayContainer image={currentPokemonPicture} /> */}
      <PokemonDisplay
        imageToDisplay={currentPokemonPicture}
        type={currentPokemonStats.types}
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
