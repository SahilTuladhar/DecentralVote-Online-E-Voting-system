import { React, useState } from "react";
import styles from "./SignCover.module.css";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";

const SignCover = () => {
  const [type, setType] = useState("signIn");

  const onSignUpChangeHandler = () => {
    setType("signUp");
  };

  const onSignInChangeHandler = () => {
    setType("signIn");
  };

  const ContainerClass = `${styles["container"]} ${
    type === "signUp" ? styles.rightPanelActive : ""
  }`;

  return (
    <div className={styles.signBody}>
      <div className={ContainerClass}>
        <SignIn value={type} />
        <SignUp value={type} />
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles["overlayPanel"]} ${styles.leftOverlay}`}>
              <img className={styles.logo} src="images\logo-pink.png" alt="" />
              <p>Already Have an Account?</p>
              <button
                className={styles.coverButton}
                onClick={onSignInChangeHandler}
              >
                Sign In
              </button>
            </div>
            <div className={`${styles["overlayPanel"]} ${styles.rightOverlay}`}>
              <img className={styles.logo} src="images\logo-pink.png" alt="" />
              <h5> Voting made Safer</h5>
              <p>Need to Create an Account?</p>
              <button
                className={styles.coverButton}
                onClick={onSignUpChangeHandler}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignCover;
