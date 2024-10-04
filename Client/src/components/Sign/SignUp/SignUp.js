import { useState, useEffect } from "react";
import styles from "./SignUp.module.css";
import useInput from "../../../hooks/use-input";
import axios from "axios";
const SignUp = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const {
    value: enteredUsername,
    valueIsInvalid: usernameIsInvalid,
    valueIsValid: usernameIsValid,
    valueInputHandler: usernameInputHandler,
    valueBlurHandler: usernameBlurHandler,
    reset: usernameReset,
  } = useInput((value) => {
    return value && value.trim() !== "";
  });

  const {
    value: enteredAddress,
    valueIsInvalid: addressIsInvalid,
    valueIsValid: addressIsValid,
    valueInputHandler: addressInputHandler,
    valueBlurHandler: addressBlurHandler,
    reset: addressReset,
  } = useInput((value) => {
    return value && value.trim() !== "";
  });

  const {
    value: enteredPassword,
    valueIsValid: passwordIsValid,
    valueIsInvalid: passwordIsInvalid,
    valueInputHandler: passwordInputHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput((value) => {
    return value && value.length >= 8;
  });

  const {
    value: enteredNewPassword,
    valueIsValid: newPasswordIsValid,
    valueIsInvalid: newPasswordIsInvalid,
    valueInputHandler: newPasswordInputHandler,
    valueBlurHandler: newPasswordBlurHandler,
    reset: newPasswordReset,
  } = useInput((value) => {
    return value && value.trim() === enteredPassword;
  });

  const {
    value: enteredAge,
    valueIsValid: ageIsValid,
    valueIsInvalid: ageIsInvalid,
    valueInputHandler: ageInputHandler,
    valueBlurHandler: ageBlurHandler,
    reset: agePasswordReset,
  } = useInput((value) => {
    return value && value.trim() === enteredPassword;
  });

  useEffect(() => {
    if (usernameIsValid && passwordIsValid && newPasswordIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [usernameIsValid, passwordIsValid, newPasswordIsValid]);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const newUserData = {
      username: enteredUsername,
      password: enteredPassword,
      age:enteredAge,
      address:enteredAddress
    };

    onSubmitNewUser(newUserData);

    console.log(newUserData);
    usernameReset();
    passwordReset();
    newPasswordReset();
  };

  const onSubmitNewUser = async (event) => {
    const name = enteredUsername;
    const password = enteredNewPassword;
    const age = enteredAge;
    const address = enteredAddress;

    try {
      const response = await axios.post("http://localhost:4000/user/signup", {
        name,
        password,
        age, 
        address
      }, {withCredentials:true});

      window.location.href = "/landing-page";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`${styles["signUpContainer"]} ${
        props.value === "signUp" ? styles.rightPanelActive : ""
      }`}
    >
      {" "}
      <div className={styles.logoCover}>
        <img
          className={styles.logo}
          src="\images\navbarlogo.png"
          alt="decentral vote logo"
        />
      </div>
      <h4>Welcome To Decentral Vote!!</h4>
      <h7>Please Sign-In to your account</h7>
      <form onSubmit={formSubmitHandler}>
        <div
          className={`${styles["formInputs"]} ${
            usernameIsInvalid || passwordIsInvalid || newPasswordIsInvalid
              ? styles.invalid
              : ""
          }`}
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={usernameInputHandler}
            onBlur={usernameBlurHandler}
            value={enteredUsername}
          />

          {usernameIsInvalid && <p>Please enter Valid Username</p>}

          <label htmlFor="address">Location</label>
          <input
            type="text"
            id="address"
            onChange={addressInputHandler}
            onBlur={addressBlurHandler}
            value={enteredAddress}
          />

          {addressIsInvalid && <p>Please enter Valid Address</p>}

          <label htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            onChange={ageInputHandler}
            onBlur={ageBlurHandler}
            value={enteredAge}
          />

          {addressIsInvalid && <p>Please enter Valid Address</p>}

          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            onChange={passwordInputHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
          />

          {passwordIsInvalid && <p>Please enter Valid Password</p>}

          <label htmlFor="confirm-password">Confirm New Password</label>
          <input
            type="password"
            id="confirm-password"
            onChange={newPasswordInputHandler}
            onBlur={newPasswordBlurHandler}
            value={enteredNewPassword}
          />

          {newPasswordIsInvalid && <p>Password does not match</p>}
        </div>

        <div className={styles.formActions}>
          <button className={styles.signUpButton} disabled={!formIsValid}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
