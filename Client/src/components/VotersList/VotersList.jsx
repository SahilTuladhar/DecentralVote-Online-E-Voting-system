import styles from "./VotersList.module.css";
import Sidebar from "../../ui/Sidebar/Sidebar";
import Navbar from "../../ui/Navbar/Navbar";
import VoterUserItemCover from "../../ui/VoterUserItemCover/VoterUserItemCover";
import { bouncy } from "ldrs";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VotersList = (props) => {
  bouncy.register();

  const [votersList, setVotersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const onRemoveClicked = (removeId) => {
    setVotersList(votersList.filter((item) => item.voterID !== removeId));
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      console.log("id", id);

      const response = await axios.get(
        `http://localhost:4000/voter/getvoter/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setvotersList(response.data);
      } else {
        setError("Data not found"); // Provide a specific error message for 404
      }

      console.log("Response:", response.data);
      setVotersList(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Data not found"); // Handle 404 error explicitly
      } else {
        setError("Error fetching candidate data"); // Generic error message for other errors
      };
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let content = <p>No Voters Present Yet</p>;

  if (votersList.length > 0) {
    content = votersList.map((item) => {
      return (
        <VoterUserItemCover
          name={item.name}
          id={item.voterID}
          electionId={id}
          onRemove={onRemoveClicked}
        />
      );
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

      <div className={styles.votersListPageCover}>
        <Sidebar eid={id} />
        <div className={styles.pageContent}>
          <h2>Voters List</h2>
          <div
            className={`${styles["contentCover"]} ${
              isLoading || votersList.length === 0 ? styles.noData : ""
            } `}
          >
            {" "}
            {content}
          </div>
        </div>
      </div>
    </>
  );
};

export default VotersList;
