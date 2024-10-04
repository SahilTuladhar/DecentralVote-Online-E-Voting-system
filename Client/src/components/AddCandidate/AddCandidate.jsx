import styles from "./AddCandidate.module.css";
import Sidebar from "../../ui/Sidebar/Sidebar";
import Navbar from "../../ui/Navbar/Navbar";
import useInput from "../../hooks/use-input";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AddCandidate = () => {
  const [error, setError] = useState(null);
  const {id} = useParams()

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
    const newCandidate = {
      candidateName: enteredName,
      candidateId: enteredId,
    };

    event.preventDefault();

    onAddCandidate(newCandidate);

    nameReset();
    idReset();
  };

  const onAddCandidate = async (event) => {

    const name = enteredName
    const voterID= enteredId
  

  try {
    const response = await axios.post(`http://localhost:4000/candidate/addcandidate/${id}`, {
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
      <div className={styles.candidatePageCover}>
        <Sidebar eid = {id}/>
        <div className={styles.pageContent}>
          <h2>Add Candidate</h2>

          <div className={styles.imageCover}>
            <img
              src="\images\add-candidate-image.png"
              alt="add-voter-page-image"
            />
          </div>

          <form onSubmit={onSubmitHandler}>
            <div
              className={`${styles["addCandidateForm"]} ${
                nameIsInvalid || idIsInvalid ? styles.invalid : ""
              }`}
            >
              <p>Please Enter Candidate's Details</p>
              <label htmlFor="candidate-name">Name</label>
              <input
                id="candidate-name"
                type="text"
                placeholder="Enter Candidate's Name"
                onChange={nameInputHandler}
                onBlur={nameBlurHandler}
                value={enteredName}
              />

              {nameIsInvalid ? (
                <p className={styles.errorMessage}>
                  Please Enter a Valid Candidate Name
                </p>
              ) : (
                ""
              )}

              <label htmlFor="candidate-id">Candidate Id</label>
              <input
                id="candidate-id"
                type="text"
                placeholder="Enter Candidate's Id"
                onChange={idInputHandler}
                onBlur={idBlurHandler}
                value={enteredId}
              />

              {idIsInvalid ? (
                <p className={styles.errorMessage}>
                  Please Enter a Valid Candidate Id
                </p>
              ) : (
                ""
              )}

              <div className={styles.formActions}>
                <button className={styles.addCandidateButton}>
                  Add Candidate
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCandidate;
