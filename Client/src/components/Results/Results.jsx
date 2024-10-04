import styles from "./Results.module.css";
import Sidebar from "../../ui/Sidebar/Sidebar";
import Navbar from "../../ui/Navbar/Navbar";
import ElectionPageData from "../../ui/ElectionPageData/ElectionPageData";
import Chart from "../../ui/PieChart/PieChart";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import axios from "axios";
import { useState, useRef, useEffect, useContext } from "react";
import ElectionItemContext from "../../contexts/electionItem-context";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "./../../utils/constants";
import { useParams } from "react-router-dom";
import { utils } from "ethers";

const Results = (props) => {
  const electionItemCtx = useContext(ElectionItemContext);
  const [numbers, setNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signer, setSigner] = useState(null);
  const [candidate, setCandidate] = useState();
  const [voteresult,setVoteresult] = useState([])
  const [totalvotes,setTotalvotes] = useState()
  let voterIDs = [];
  const fetchData = async () => {
    setError(null);
    setIsLoading(true);

    try {
      console.log("id", electionItemCtx.id);
      const response = await axios.get(
        `http://localhost:4000/election/electiondata/${electionItemCtx.id}`,
        {
          withCredentials: true,
        }
      );

      // const extractedVoterIds = response.data.map(item => item.voterID);
      //  console.log('candidates', extractedVoterIds)
      setNumbers(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleResult = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const candidateresponse = await axios.get(
        `http://localhost:4000/candidate/getcandidate/${electionItemCtx.id}`,
        {
          withCredentials: true,
        }
      );

      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      voterIDs = candidateresponse.data.map((item) => item.voterID);

      const result = await contract.getAllCandidateVotes(
        electionItemCtx.id,
        voterIDs
      );

      const formattedVotes = result.map((candidate) => ({
        candidateId: candidate[0],
        votes: utils.formatUnits(candidate[1], 0), // Adjust the decimals as needed
      }));
      setVoteresult(formattedVotes)
      const totalVotes = formattedVotes.reduce((accumulator, currentItem) => {
        // Convert 'votes' to a number and add to the accumulator
        const votes = parseInt(currentItem.votes, 10) || 0; // Use 0 if 'votes' is not a valid number
        return accumulator + votes;
      }, 0);
      
      console.log('Total Votes:', totalVotes);
      setTotalvotes(totalVotes)
     
    } catch (error) {
      console.log("error", error);
    }
  };

  const initializeSigner = async () => {
    try {
      // Connect to an Ethereum node or provider
      const provider = new ethers.providers.JsonRpcProvider(
        "http://127.0.0.1:8545"
      );

      // Get the signer using a private key or other authentication method
      const privateKey =
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
      const wallet = new ethers.Wallet(privateKey, provider);

      // Set the signer in the state
      setSigner(wallet);
    } catch (error) {
      console.error("Error initializing signer:", error);
      setError(
        "Failed to initialize signer. Please check your connection or private key."
      );
    }
  };

  useEffect(() => {
    fetchData();
    initializeSigner();
  }, []);

  useEffect(() => {
    handleResult();
  }, [signer]);

  let content = <p>No Votes has been Casted Yet</p>;

  if (voteresult.length !== 0) {
    content = <Chart id="chart" result={voteresult} />;
  }
  console.log(voteresult);

  return (
    <>
      <Navbar />

      <div className={styles.electionResultCover}>
        <Sidebar eid={electionItemCtx.electionId || electionItemCtx.id} />
        <div className={styles.pageContent}>
          <div className={styles.pageContentLeft}>
            <h2>Results</h2>
            <div className={styles.electionInfo}>
              <div className={styles.electionInfoUp}>
                <h2>{electionItemCtx.title}</h2>
              </div>
              <div className={styles.electionInfoDown}>
                <h3>{electionItemCtx.organizer}</h3>
                <div className={styles.electionDate}>
                  <CalendarTodayOutlinedIcon className={styles.icon} />
                  {console.log('date',electionItemCtx.startDate)}
                  <p>{electionItemCtx.startDate}</p>
                </div>
              </div>
            </div>
            <div
              className={`${styles["pieChartCover"]}  ${
                voteresult.length === 0 ? styles.empty : ""
              }`}
            >
              {content}
            </div>
          </div>
          <div className={styles.pageContentRight}>
            <div className={styles.infoBlocks}>
              <ElectionPageData num={numbers}  totalvotes = {totalvotes}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
