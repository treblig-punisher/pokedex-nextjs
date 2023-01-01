import styles from '/styles/BackgroundComponentStyle.module.css'
import DpadAndConfirmButtonsContainer from './DpadAndConfirmButtonsContainer'
import SlimButtonsContainer from './SlimButtonsContainer'
import { useRef, useState, useCallback, useEffect } from 'react'


export default function BackgroundComponent() {
  const inputValComponent = useRef(null);
  const [arrayOfAllPokemonObjects, setArrayOfAllPokemonObjects] = useState([])
  // const [currentPokemonPicture, setCurrentPokemonPicture] = useState('')
  const noMatchPicture = '/noMatch.png'

  const [currentPokemonStats, setCurrentPokemonStats] = useState({
    name: '',
    picture: '',
    abilities: [],
    types: "",
    stats: {},
  })

  //this checks for locally stored cached pokemons 
  useEffect(() => {
    // localStorage.removeItem('cachedPokemonsArray')
    if (localStorage.getItem('cachedPokemonsArray') === null) {
      console.log('No cached pokemons')
      return;
    }
    const localStoragePokemons = localStorage.getItem('cachedPokemonsArray')
    const parsedPokemons = JSON.parse(localStoragePokemons)
    console.log('cached pokemons loaded: ', parsedPokemons)
    setArrayOfAllPokemonObjects(arrayOfAllPokemonObjects => [...arrayOfAllPokemonObjects, ...parsedPokemons])
  }, [])
  const upperCasedWord = useCallback((value) => {
    let valueNow = value
    if (valueNow !== undefined && valueNow !== "") {
      const upperCasedWord = (valueNow.slice(0, 1)).toUpperCase() + valueNow.slice(1)
      return upperCasedWord
    }
  })
  const submittedPokemon = useCallback(async () => {
    const currentValue = inputValComponent.current.value;
    const lowerCasedValue = currentValue.toLowerCase();
    console.log('local array of pokemons: ', arrayOfAllPokemonObjects)
    const tempPokemonObjects = [...arrayOfAllPokemonObjects]
    if (tempPokemonObjects.find(pokemon => pokemon.name === lowerCasedValue)) {
      const getAllPokemons = [...arrayOfAllPokemonObjects]
      const foundCachedPokemon = getAllPokemons.filter(cachedPokemon => cachedPokemon.name === lowerCasedValue)[0]
      console.log('array of all pokemon objects, found cached pokemon: ', foundCachedPokemon);
      setCurrentPokemonStats(currentPokemonStats => ({ ...currentPokemonStats, foundCachedPokemon }))
    }
    else {
      try {
        const getPokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${lowerCasedValue}`)
        const foundPokemon = await getPokemonData.json()
        console.log('pokemon fetched: ', foundPokemon)
        const foundPokemonStats =
        {
          name: foundPokemon.name,
          picture: foundPokemon.sprites.front_default,
          abilities: [],
          types: foundPokemon.types[0].type.name,
          stats: {},
        }
        setArrayOfAllPokemonObjects(arrayOfAllPokemonObjects => [...arrayOfAllPokemonObjects, foundPokemonStats])
        // console.log('new pokemon array: ', arrayOfAllPokemonObjects);
        setCurrentPokemonStats(
          currentPokemonStats =>
          (
            {
              ...currentPokemonStats,
              ...foundPokemonStats
            }
          )
        )
        console.log(arrayOfAllPokemonObjects)
        localStorage.setItem('cachedPokemonsArray', JSON.stringify(arrayOfAllPokemonObjects))
      }
      catch (err) {
        console.log(`Error, no pokemon found: ${err}`)
        const foundPokemonStats = {
          name: '',
          picture: noMatchPicture,
          abilities: [],
          types: "",
          stats: {},

        }
        setCurrentPokemonStats(
          currentPokemonStats =>
          (
            {
              ...currentPokemonStats,
              ...foundPokemonStats
            }
          )

        )
      }

    }

  })
  

  function PokemonDisplay({ imageToDisplay, type, pokeName }) {
    const DivBasedOnTypes = ({ types }) => {
      // const typesArray = types.abilities.forEach(element => element.ability.name);
      const name = 'arrayOfAllPokemonObjects'
      return (<div className={styles.pokemonType}>{types}</div>)

    }
    return (
      <div className={styles.pokemonDisplayContainer}>
        <img draggable={false} src={imageToDisplay}></img>

        <DivBasedOnTypes types={type} />
        <div className={styles.pokemonName}>{pokeName}</div>
      </div>
    );
  }

  return (
    <div className={styles.bgImage}>
      {/* <PokemonDisplayContainer image={currentPokemonPicture} /> */}
      <PokemonDisplay
        imageToDisplay={currentPokemonStats.picture}
        type={upperCasedWord(currentPokemonStats.types)}
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
