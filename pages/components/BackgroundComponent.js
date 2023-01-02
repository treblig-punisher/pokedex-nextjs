import styles from '/styles/BackgroundComponentStyle.module.css'
import DpadAndConfirmButtonsContainer from './DpadAndConfirmButtonsContainer'
import SlimButtonsContainer from './SlimButtonsContainer'
import { useRef, useState, useCallback, useEffect } from 'react'


export default function BackgroundComponent() {
  const inputValComponent = useRef(null);
  const [arrayOfAllPokemonObjects, setArrayOfAllPokemonObjects] = useState([])
  // const [currentPokemonPicture, setCurrentPokemonPicture] = useState('')
  const noMatchPicture = '/noMatch.png'

  // const [currentPokemonPicture, setCurrentPokemonPicture] = useState('')
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
    
    const tempPokemonObjects = [...arrayOfAllPokemonObjects]
    if (tempPokemonObjects.find(pokemon => pokemon.name === lowerCasedValue)) {
      const getAllPokemons = [...arrayOfAllPokemonObjects]
      const foundCachedPokemon = getAllPokemons.filter(cachedPokemon => cachedPokemon.name === lowerCasedValue)[0]
      setCurrentPokemonStats(currentPokemonStats=>({ ...currentPokemonStats, ...foundCachedPokemon }))
    }
    else {
      try {
        const getPokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${lowerCasedValue}`)
        const foundPokemon = await getPokemonData.json()
        const foundPokemonStats =
        {
          name: foundPokemon.name,
          picture: foundPokemon.sprites.front_default,
          abilities: [],
          types: foundPokemon.types,
          stats: {},
        }
        setArrayOfAllPokemonObjects([...arrayOfAllPokemonObjects, foundPokemonStats])
        
        setCurrentPokemonStats(currentPokemonStats=>
          
          ({
            ...currentPokemonStats,
            ...foundPokemonStats
          })

        )  
        // console.log('arrayOfAllPokemonObjects updated -Try block', arrayOfAllPokemonObjects)     
      }
      catch (err) {
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
  //show the array of objects updated
  useEffect(()=>{
    // console.log('arrayOfAllPokemonObjects updated -useEffect', arrayOfAllPokemonObjects)
    if(arrayOfAllPokemonObjects.length > 0) localStorage.setItem('cachedPokemonsArray', JSON.stringify(arrayOfAllPokemonObjects))
  },[currentPokemonStats])

  function PokemonDisplay({ imageToDisplay, type, pokeName }) {
    const DivBasedOnTypes = ({ types }) => {
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
