import SlimButtonComponent from "./SlimButtonComponent"
import styles from "/styles/SlimButtonComponent.module.css"
export default function SlimButtonsContainer() {
  return (
    <div className={styles.buttonsContainer}>
        <SlimButtonComponent buttonClass={styles.buttonComponent}/>
        <SlimButtonComponent buttonClass={styles.buttonComponent}/>
    </div>
  )
}
