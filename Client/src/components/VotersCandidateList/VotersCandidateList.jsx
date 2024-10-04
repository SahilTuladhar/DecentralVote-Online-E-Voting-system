import styles from "./VotersCandidateList.module.css";
import Navbar from "../../ui/Navbar/Navbar";
import VoterSidebar from "../../ui/VoterSidebar/VoterSidebar";
import UserItemCover from "../../ui/UserItemCover/UserItemCover";
import VotersCandidateItemCover from "../../ui/VotersCandidateItemCover/VotersCandidateItemCover";
import { bouncy } from "ldrs";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VotersCandidateList = () => {
  bouncy.register();

  const [candidateList, setCandidateList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchData = async () => {
    setError(null);
    setIsLoading(true);
    try {
      console.log("id", id);

      const response = await axios.get(
        `http://localhost:4000/candidate/getcandidate/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setCandidateList(response.data);
      } else {
        setError("Data not found"); // Provide a specific error message for 404
      }

      console.log("Response:", response.data);
      setCandidateList(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Data not found"); // Handle 404 error explicitly
      } else {
        setError("Error fetching candidate data"); // Generic error message for other errors
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let content = <p>No Data Found</p>;

  if (candidateList.length > 0) {
    content = candidateList.map((item) => {
      return <VotersCandidateItemCover name={item.name} id={item.voterID} />;
    });
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = (
      // Default values shown
      <l-bouncy size="85" speed="1.75" color="#3c3e43"></l-bouncy>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.candidateListPageCover}>
        <VoterSidebar eid={id} />
        <div className={styles.pageContent}>
          <h2>Candidate List</h2>
          <div
            className={`${styles["contentCover"]}  ${
              isLoading ? styles.noData : ""
            }`}
          >
            {content}
          </div>
        </div>
      </div>
    </>
  );
};

export default VotersCandidateList;
