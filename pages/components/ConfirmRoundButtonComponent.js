import styles from "/styles/ConfirmRoundButtonComponent.module.css"

export default function ConfirmRoundButtonComponent({buttonClicked}) {
  return (
    // <div>
    //     <img src="PokedexRoundButton.png"/>
    // </div>
    <button
     className= {styles.confirmButton}
     onClick={buttonClicked}

    >

    </button>
  )
}
