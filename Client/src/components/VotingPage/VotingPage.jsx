import styles from "./VotingPage.module.css";
import Navbar from "../../ui/Navbar/Navbar";
import VoterSidebar from "../../ui/VoterSidebar/VoterSidebar";
import CandidateItemCover from "../../ui/CandidateItemCover/CandidateItemCover";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { contractAbi, contractAddress } from "./../../utils/constants";
const { ethers } = require("ethers");

const VotingPage = () => {
 
  const [votingList, setVotingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signer, setSigner] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [voterId, setVoterId] = useState(); // Store the voter's unique identifier
  const { id } = useParams();

  const contract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );
  // Replace with your contract ABI

  const fetchData = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:4000/candidate/getcandidate/${id}`,
        {
          withCredentials: true,
        }
      );

      // const extractedVoterIds = response.data.map(item => item.voterID);
      //  console.log('candidates', extractedVoterIds)

      // Set the voterIDs to the state variable
      setVotingList(response.data);

      // Get the voter's unique identifier using an API call, assuming you have an endpoint for this
      const voterIdentifierResponse = await axios.get(
        `http://localhost:4000/user/profile`,
        {
          withCredentials: true,
        }
      );

      const voterIdFromResponse = voterIdentifierResponse.data.voterID;
      // console.log('voter', voterIdFromResponse);
      setVoterId(voterIdFromResponse);

      // Check if the voter has voted
      if (response.status === 200) {
        setVotingList(response.data);
      } else {
        setError("Data not found"); // Provide a specific error message for 404
      }

      console.log("Response:", response.data);
      setVotingList(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Data not found"); // Handle 404 error explicitly
      } else {
        setError("Error fetching candidate data"); // Generic error message for other errors
      }
    }
  };

  const initializeSigner = async () => {
    try {
      // Connect to an Ethereum node or provider
      const provider = new ethers.providers.JsonRpcProvider(
        "http://127.0.0.1:8545"
      );

      // You can also use other providers like WalletConnectProvider, etc.

      // Get the signer using a private key or other authentication method
      const privateKey =
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
      const wallet = new ethers.Wallet(privateKey, provider);

      setSigner(wallet);
    } catch (error) {
      console.error("Error initializing signer:", error);
      setError(
        "Failed to initialize signer. Please check your connection or private key."
      );
    }
  };

  const isVoted = async()=>{
    try {
     
      console.log(signer)

      const userHasVoted = await contract.hasUserVoted(id,voterId);
  
      if(userHasVoted){
        console.log('user has already voted')
        setHasVoted(true)
        console.log('xyxyx')
      }
      console.log('Updated hasVoted:', hasVoted);
    
      console.log('aaa',hasVoted)
    } catch (error) {
      console.log('err',error)
    }

 
  }

  useEffect(() => {

    fetchData();
    initializeSigner()
    
  }, []);

  useEffect(() => {
    // Call isVoted when both signer and voterId are available
    if (signer && voterId) {
      isVoted();
    }
  }, [signer , voterId]);




  const onVoteClicked = async () => {
    // Trigger a transaction to vote for the selected candidate
  };

  let content = <p>No Data Found</p>;

  const onAlreadyVotedError = () => {
    setHasVoted(true);
  };

  if (votingList.length > 0) {
    content = votingList.map((item) => {
      return (
        <CandidateItemCover
          key={item.id}
          candidate={votingList}
          onHasVoted = {hasVoted}
          name={item.name}
          eid={id}
          id={item.voterID}
          voterid={voterId}
          onVoted={onAlreadyVotedError}
          onVote={() => onVoteClicked(item.voterID)}
        />
      );
    });
  }

  return (
    <>
      <Navbar />
      <div className={styles.voterElectionPageCover}>
        <VoterSidebar eid={id} />

        <div
          className={`${styles["pageContent"]} ${
            isLoading ? styles.loading : ""
          }`}
        >
          <h2>Voting Page</h2>
          <div className={styles.contentCover}> {content}</div>
          <div className={styles.errorMessage}>
            {hasVoted ? <h3>You Have Already Voted</h3> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default VotingPage;
