import styles from "./VoterElectionPage.module.css";
import Navbar from "../../ui/Navbar/Navbar";
import VoterSidebar from "../../ui/VoterSidebar/VoterSidebar";
import ElectionPageData from "../../ui/ElectionPageData/ElectionPageData";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { UserData } from "../../ui/LineChart/Data";
import LineChart from "../../ui/LineChart/LineChart";
import { useState, useRef, useEffect, useContext } from "react";
import ElectionItemContext from "../../contexts/electionItem-context";
import axios from "axios";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "./../../utils/constants";
import { useParams } from "react-router-dom";
import { utils } from "ethers";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";

const VoterElectionPage = (props) => {
  const electionItemCtx = useContext(ElectionItemContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [numbers, setNumbers] = useState([]);
  const [signer, setSigner] = useState(null);
  const [candidate, setCandidate] = useState();
  const [voteresult, setVoteresult] = useState([]);
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [delayed, setDelayed] = useState(false);
  let voterIDs = [];
  const [agelist, setAgelist] = useState();
  const [totalvotes,setTotalvotes] = useState()

  const [userData, setUserData] = useState({
    // labels: agelist.map((data) => data.year),
    labels: [],
    datasets: [
      {
        label: "No of Votes",
        // data: agelist.map((data) => data.count),
        data: [],
        fill: true,
        borderColor: "#fff",
        borderWidth: 2,
        tension: 0.3,
        hitRadius: 20,
        pointBackgroundColor: "#fff",
        pointBorderColor: "rgba(0 , 0 , 255 ,0.3)",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(58,255,213,1)",
      },
    ],
  });

  const [options, setOptions] = useState({
    responsive: true,
    scales: {
      x: {
        type: "category",
        labels: [],
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    animation: {
      onComplete: () => {
        setDelayed(true);
      },
      duration: 1000,
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 100 + context.datasetIndex * 50;
        }
        return delay;
      },
    },
  });

  useEffect(() => {
    if (agelist && agelist.length > 0) {
      setUserData({
        labels: agelist.map((data) => data.year),
        datasets: [
          {
            label: "No of Votes",
            data: agelist.map((data) => data.count),
            // Other dataset properties...
          },
        ],
      });

      setOptions((prevOptions) => ({
        ...prevOptions,
        scales: {
          ...prevOptions.scales,
          x: {
            ...prevOptions.scales.x,
            labels: agelist.map((data) => data.age),
          },
        },
      }));
    }
  }, [agelist]);

  const handleClick = async () => {
    console.log("Button Clicked");
    try {
      // Check if signer is initialized
      if (!signer) {
        setError("Signer is not initialized. Please try again.");
        return;
      }

      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const endElection = await contract.endElection(electionItemCtx.id);
    } catch (err) {
      console.log("error", error);
    }
  };

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

  const fetchAge = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4000/election/getagestat/${electionItemCtx.id}`,
        {
          withCredentials: true,
        }
      );

      console.log("Response:", response.data);
      setAgelist(response.data);
    } catch (error) {
      console.error("Error fetching voter data:", error);
      setError(error.message); // or setError('Error fetching voter data');
    }
    setIsLoading(false);
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
      console.log("aa", voterIDs);
      const result = await contract.getAllCandidateVotes(
        electionItemCtx.id,
        voterIDs
      );

      console.log("xxx", result);
      const formattedVotes = result.map((candidate) => ({
        candidateId: candidate[0],
        votes: utils.formatUnits(candidate[1], 0), // Adjust the decimals as needed
      }));
      setVoteresult(formattedVotes);
      console.log("Formatted Votes:", formattedVotes);
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

  // Call initializeSigner when the component renders
  useEffect(() => {
    fetchData();
    initializeSigner();
    fetchAge();
  }, []); // Run this effect only once on mount

  useEffect(() => {
    // This will run whenever signer changes

    handleResult();

    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      let gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(58,255,213,1)");
      gradient.addColorStop(1, "rgba(0 , 0 , 255 ,0.3)");

      // Update the state with the new dataset including the backgroundColor
      setUserData((prevUserData) => ({
        ...prevUserData,
        datasets: [
          {
            ...prevUserData.datasets[0],
            backgroundColor: gradient,
          },
        ],
      }));
    }

    return () => {
      // Cleanup: Destroy the chart when the component unmounts
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [signer]);

  return (
    <>
      <Navbar />
      <div className={styles.voterElectionPageCover}>
        <VoterSidebar eid={electionItemCtx.id} />
        <div className={styles.pageContent}>
          <div className={styles.pageContentLeft}>
            <h2>Overview</h2>
            <div className={styles.electionInfo}>
              <div className={styles.electionInfoUp}>
                <h2>{electionItemCtx.title}</h2>
              </div>
              <div className={styles.electionInfoDown}>
                <h3>{electionItemCtx.organizer}</h3>
                <div className={styles.electionDate}>
                  <CalendarTodayOutlinedIcon className={styles.icon} />
                  <p>{electionItemCtx.startDate.split("T")[0]} to {electionItemCtx.endDate.split("T")[0]}</p>
                </div>
              </div>
            </div>
            <div className={styles.lineChartCover}>
              <canvas id="myChart" ref={canvasRef} className={styles.canvas} />
              <LineChart chartData={userData} chartOptions={options} />
            </div>
          </div>
          <div className={styles.pageContentRight}>
            <div className={styles.infoBlocks}>
              <ElectionPageData num={numbers} totalvotes = {totalvotes} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoterElectionPage;
