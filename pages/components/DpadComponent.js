import styles from "/styles/DpadAndConfirmButtonsContainer.module.css"
export default function DpadComponent() {
  return (
    <div className ={styles.Dpad}>
        <img draggable={false} src="PokedexDpad.png"/>
    </div>
  )
}
