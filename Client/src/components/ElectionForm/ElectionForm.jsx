import React, { useCallback, useState } from "react";
import useInput from "../../hooks/use-input";
import Navbar from "../../ui/Navbar/Navbar";
import styles from "./ElectionForm.module.css";
import TimezoneSelect from "react-timezone-select";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
const ElectionForm = () => {
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const history = useNavigate();

  const [error, setError] = useState(null);
  const [elections, setElections] = useState([]);

  const {
    value: enteredTitle,
    valueIsValid: titleIsValid,
    valueIsInvalid: titleIsInvalid,
    valueInputHandler: titleInputHandler,
    valueBlurHandler: titleBlurHandler,
    reset: titleReset,
  } = useInput((value) => {
    return value && value.trim() !== "";
  });

  const {
    value: enteredStartDate,
    valueIsValid: startDateIsValid,
    valueIsInvalid: startDateIsInvalid,
    valueInputHandler: startDateInputHandler,
    valueBlurHandler: startDateBlurHandler,
    reset: startDateReset,
  } = useInput((value) => {
    return value && value.trim() !== "";
  });

  const {
    value: enteredEndDate,
    valueIsValid: endDateIsValid,
    valueIsInvalid: endDateIsInvalid,
    valueInputHandler: endDateInputHandler,
    valueBlurHandler: endDateBlurHandler,
    reset: endDateReset,
  } = useInput((value) => {
    return value && value.trim() !== "";
  });

  const {
    value: enteredOrganizer,
    valueIsValid: organizerIsValid,
    valueIsInvalid: organizerIsInvalid,
    valueInputHandler: organizerInputHandler,
    valueBlurHandler: organizerBlurHandler,
    reset: organizerReset,
  } = useInput((value) => {
    return value && value.trim() !== "";
  });

  const formSubmitHandler = (event) => {
    const electionData = {
      electionTitle: enteredTitle,
      electionStartDate: enteredStartDate,
      electionEndDate: enteredEndDate,
      electionOrganizer: enteredOrganizer,
    };

    event.preventDefault();

    onCreateElection(electionData);

    titleReset();
    startDateReset();
    endDateReset();
    organizerReset();
  };

  const onCreateElection = async (event) => {
 
    const title = enteredTitle;
    const startdate = enteredStartDate;
    const enddate = enteredEndDate;
    const organizer = enteredOrganizer
    try {
      const response = await axios.post(
        "http://localhost:4000/election/createelection",
        {
          title,
          startdate,
          enddate,
          organizer
        },
        {
          withCredentials: true,
        }
      );
  
   
    } catch (error) {
      console.error(error);
      alert("Failed to create election ");
    }
    window.location.href = "election-list"
  };

  return (
    <div className={styles.cover}>
      <Navbar style="color: black;" />
      <div className={styles.formContent}>
        <img
          className={styles.logo}
          src="\images\logo.png"
          alt="decentral vote logo"
        />
        <div className={styles.electionList}>
          <p>Create an Election</p>
          <button className={styles.listButton}>
            <Link to="/election-list">Election List</Link>
          </button>
        </div>

        <div className={styles.formContainer}>
          <form onSubmit={formSubmitHandler}>
            <div
              className={` ${styles["formInputs"]} ${
                titleIsInvalid ||
                startDateIsInvalid ||
                endDateIsInvalid ||
                organizerIsInvalid
                  ? styles.invalid
                  : ""
              }`}
            >
              <label htmlFor="election-title">Election Title</label>
              <input
                type="text"
                id="election-title"
                onChange={titleInputHandler}
                onBlur={titleBlurHandler}
                value={enteredTitle}
              />

              {titleIsInvalid && <p>Please enter a valid Title</p>}

              <div className={styles.formDates}>
                <div className={styles.formDate}>
                  <label htmlFor="start-date">Start Date</label>
                  <input
                    className={styles.dateInput}
                    type="date"
                    id="start-date"
                    onChange={startDateInputHandler}
                    onBlur={startDateBlurHandler}
                    value={enteredStartDate}
                  />
                </div>

                <div className={styles.formDate}>
                  <label htmlFor="end-date">End Date</label>
                  <input
                    className={styles.dateInput}
                    type="date"
                    id="end-date"
                    onChange={endDateInputHandler}
                    onBlur={endDateBlurHandler}
                    value={enteredEndDate}
                  />
                </div>
              </div>

              {(startDateIsInvalid || endDateIsInvalid) && (
                <p>Please Select a Date</p>
              )}

              <label htmlFor="administrator">
                Organization / Administrator
              </label>
              <input
                type="text"
                id="administrator"
                onChange={organizerInputHandler}
                onBlur={organizerBlurHandler}
                value={enteredOrganizer}
              />

              {organizerIsInvalid && <p>Please enter a valid organization</p>}

              <label htmlFor="time-zone">Time-zone</label>
              <TimezoneSelect
                className={styles.timezoneInput}
                id="time-zone"
                value={selectedTimezone}
                onChange={setSelectedTimezone}
              />
            </div>

            <div className={styles.formActions}>
              <button className={styles.createButton}>Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ElectionForm;
