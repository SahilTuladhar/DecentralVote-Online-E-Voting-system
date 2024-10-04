import styles from "./AddVoter.module.css";
import Sidebar from "../../ui/Sidebar/Sidebar";
import Navbar from "../../ui/Navbar/Navbar";
import useInput from "../../hooks/use-input";
import { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";

import axios from 'axios'
const AddVoter = () => {
  const [error, setError] = useState(null);
  const { id } = useParams();
  const {
    value: enteredName,
    valueIsValid: nameIsValid,
    valueIsInvalid: nameIsInvalid,
    valueBlurHandler: nameBlurHandler,
    valueInputHandler: nameInputHandler,
    reset: nameReset,
  } = useInput((value) => {
    return value && value.trim() != "";
  });

  const {
    value: enteredId,
    valueIsValid: idIsValid,
    valueIsInvalid: idIsInvalid,
    valueBlurHandler: idBlurHandler,
    valueInputHandler: idInputHandler,
    reset: idReset,
  } = useInput((value) => {
    return value && value.length >= 5;
  });

  const onSubmitHandler = (event) => {
    const newVoter = {
      voterName: enteredName,
      voterId: enteredId,
    };

    event.preventDefault();

    onAddVoter(newVoter);

    nameReset();
    idReset();
  };

  const onAddVoter = async (event) => {

    const name = enteredName
    const voterID= enteredId
  

  try {
    const response = await axios.post(`http://localhost:4000/voter/addvoter/${id}`, {
      name,
      voterID

    });

    ;
  } catch (err) {
    console.log(err);
  }
};
  
  return (
    <>
      <Navbar />
      <div className={styles.electionPageCover}>
        <Sidebar eid = {id} />
        <div className={styles.pageContent}>
          <h2>Add Voter</h2>

          <div className={styles.imageCover}>
            <img src="\images\add-voter-image.png" alt="add-voter-page-image" />
          </div>
          

          <form onSubmit={onSubmitHandler}>
            <div
              className={`${styles["addVoterForm"]} ${
                nameIsInvalid || idIsInvalid ? styles.invalid : ""
              }`}
            >
              <p>Please Enter Voter's Details</p>
              <label htmlFor="voter-name">Name</label>
              <input
                id="voter-name"
                type="text"
                placeholder="Enter Voter's Name"
                onChange={nameInputHandler}
                onBlur={nameBlurHandler}
                value={enteredName}
              />

              {nameIsInvalid ? (
                <p className={styles.errorMessage}>
                  Please Enter a Valid Voter Name
                </p>
              ) : (
                ""
              )}

              <label htmlFor="voter-id">Voter Id</label>
              <input
                id="voter-id"
                type="text"
                placeholder="Enter Voter's Id"
                onChange={idInputHandler}
                onBlur={idBlurHandler}
                value={enteredId}
              />

              {idIsInvalid ? (
                <p className={styles.errorMessage}>
                  Please Enter a Valid Voter Id
                </p>
              ) : (
                ""
              )}

              <div className={styles.formActions}>
                <button className={styles.addVoterButton}>Add Voter</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddVoter;
