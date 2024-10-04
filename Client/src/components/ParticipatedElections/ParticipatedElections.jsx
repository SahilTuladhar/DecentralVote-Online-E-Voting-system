import styles from "./ParticipatedElections.module.css";
import { partElectionData } from "./partElectionData";
import { react, useState, useCallback, useEffect } from "react";
import ParticipatedElectionItem from "../../ui/ParticipatedElectionItem/ParticipatedElectionItem";
import ElectionItem from "../../ui/ElectionItem/ElectionItem";
import Navbar from "../../ui/Navbar/Navbar";
import { bouncy } from "ldrs";
import { Link } from "react-router-dom";
import axios from "axios";

const ParticipatedElections = () => {
  bouncy.register();
  const [elections, setElections] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    setError(null);
    setIsloading(true);

    try {
    
      axios
      .get("http://localhost:4000/election/getvoterselection", {
        withCredentials: true,
      })
      .then((res) => {
    
        setElections(res.data.elections);
        console.log('elections',elections)
      })

    } catch (error) {
      setError(error.meesage);
    }

    setIsloading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
 

  let content = <p>No Data Found</p>;

  if (elections.length > 0) {
    content = elections.map((item) => {
      return (
        <ParticipatedElectionItem
          electionid = {item._id}
          title={item.title}
          organizer={item.organizer}
          sDate={item.startdate}
          eDate={item.enddate}
        />
      );
    });
  }

  if (isLoading) {
    content = (
      // Default values shown
      <l-bouncy size="85" speed="1.75" color="#c6c2f8"></l-bouncy>
    );
  }

  return (
    <div className={styles.cover}>
      <Navbar />
      <div className={styles.formContent}>
        <img
          className={styles.logo}
          src="\images\logo.png"
          alt="decentral vote logo"
        />

        <div
          className={`${styles["formContainer"]} ${
            isLoading ? styles.loading : ""
          }`}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default ParticipatedElections;
