import React from "react";
import styles from "./LandingPage.module.css";
import Navbar from "../../ui/Navbar/Navbar";
import EastIcon from "@mui/icons-material/East";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import BorderClearOutlinedIcon from "@mui/icons-material/BorderClearOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <div className={styles.imageCover}>
        <Navbar />
        <div className={styles.body}>
          <h1 className={styles.bodyTitle}>Decentralized Safe Voting System</h1>
          <h5 className={styles.bodyContent}>
            Our decentralized voting application utilizes secure blockchain
            technology, ensuring transparent and authentic voting experiences.
            Empowering users, it guarantees privacy, trust, and direct
            engagement in democratic processes, revolutionizing the way we
            participate in elections.
          </h5>
        </div>

        <Link to="/election-form">
          <button className={styles.startButton}>
            <p>Get Started</p>
            <EastIcon />
          </button>
        </Link>
      </div>

      <div className={styles.featureCover}>
        <div className={styles.feature}>
          <p>Safe Voting</p>

          <ShieldOutlinedIcon className={styles.icon} />
        </div>

        <div className={styles.feature}>
          <p>Transparency</p>
          <BorderClearOutlinedIcon className={styles.icon} />
        </div>

        <div className={styles.feature}>
          <p>Immutability</p>
          <SaveAsOutlinedIcon className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
