import styles from "./Profile.module.css";
import GeneralSidebar from "../../ui/GeneralSidebar/GeneralSidebar";
import Navbar from "../../ui/Navbar/Navbar";
import { react, useState, useCallback, useEffect, useRef } from "react";
import { myElectionData } from "./myElectionData";
import ProfilePartElecItem from "../../ui/ProfilePartItem/ProfilePartElecItem";
import { participatedElections } from "./participatedElections";
import ProfileElectionItem from "../../ui/ProfileElectionItem/ProfileElectionItem";
import { InputText } from "primereact/inputtext";
import axios from "axios";
const Profile = () => {
  const [profile, setProfile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [elections, setElections] = useState();
  const [voterelections, setVoterelections] = useState();
  const [image, setImage] = useState("");
  const inputRef = useRef(null);

  const fetchData = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.get(`http://localhost:4000/user/profile`, {
        withCredentials: true,
      });
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching voter data:", error);
      setError(error.message); // or setError('Error fetching voter data');
    }
    setIsLoading(false);
  };

  const fetchElection = async () => {
    setError(null);
    setIsLoading(true);

    try {
      axios
        .get("http://localhost:4000/election/electionlist", {
          withCredentials: true,
        })
        .then((res) => {
          setElections(res.data.elections);
          console.log("elections", elections);
        });
    } catch (error) {
      setError(error.meesage);
    }

    setIsLoading(false);
  };
  const fetchvoterElection = async () => {
    setError(null);
    setIsLoading(true);

    try {
      axios
        .get("http://localhost:4000/election/getvoterselection", {
          withCredentials: true,
        })
        .then((res) => {
          setVoterelections(res.data.elections);
          console.log("elections", elections);
        });
    } catch (error) {
      setError(error.meesage);
    }

    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
    fetchElection();
    fetchvoterElection();
  }, []);

  let content1 = <p>No Data Found</p>;
  let content2 = <p>No Data Found</p>;

  if (elections && elections.length > 0) {
    content1 = elections.map((item) => {
      return (
        <ProfileElectionItem
          id={item._id}
          title={item.title}
          organizer={item.organizer}
        /> // ProfileElectionItem is used for My Elections
      );
    });
  }

  if (voterelections && voterelections.length > 0) {
    content2 = voterelections.map((item) => {
      return (
        <ProfilePartElecItem
          id={item._id}
          title={item.title}
          organizer={item.organizer}
          sDate={item.startdate}
          eDate={item.enddate}
        />
      );
    });
  }

  console.log(image);

  const onHandleImageClick = () => {
    inputRef.current.click();
  };

  const onHandleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(event.target.files[0]);
  };

  return (
    <>
      <Navbar />
      <div className={styles.pageCover}>
        <GeneralSidebar />
        <div className={styles.pageContent}>
          <h2>Dashboard</h2>
          <div className={styles.pageUpContent}>
            <div className={styles.imageCover} onClick={onHandleImageClick}>
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className={styles.imageAfter}
                />
              ) : (
                <img
                  src="\images\add-candidate-image.png"
                  alt=""
                  className={styles.imageBefore}
                />
              )}
              <input
                type="file"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={onHandleImageChange}
              />
            </div>

            <div className={styles.userInfo}>
              {profile && (
                <>
                  <h1>{profile.name}</h1>
                  <h3>Kathmandu, Nepal</h3>
                  <h4>Voter ID: {profile.voterID}</h4>
                </>
              )}
            </div>
          </div>
          <div className={styles.pageDownContent}>
            <div className={styles.myElections}>
              <h3>My Elections</h3>
              {content1}
            </div>
            <div className={styles.partElections}>
              <h3>Participated Elections</h3>
              {content2}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
