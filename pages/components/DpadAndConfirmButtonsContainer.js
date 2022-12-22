import ConfirmRoundButtonComponent from "./ConfirmRoundButtonComponent"
import DpadComponent from "./DpadComponent"
import styles from "/styles/DpadAndConfirmButtonsContainer.module.css"
export default function DpadAndConfirmButtonsContainer({buttonClickedFunction}) {
  return (
    <div className={styles.DpadAndConfirmButtonsContainer}>
        <ConfirmRoundButtonComponent
          buttonClicked = {buttonClickedFunction}
        />
        <DpadComponent/>
    </div>
  )
}
