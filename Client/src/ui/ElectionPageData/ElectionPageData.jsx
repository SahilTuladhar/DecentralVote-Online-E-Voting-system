import styles from "./ElectionPageData.module.css";
import HowToVoteOutlinedIcon from "@mui/icons-material/HowToVoteOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import axios from "axios";
import { useState, useRef, useEffect, useContext } from "react";

const ElectionPageData = (props) => {
  console.log('totalvotes',props.totalvotes)
  return (
    <div className={styles.dataBlockCover}>
      <div className={styles.votes}>
        <div className={styles.iconCover}>
          <HowToVoteOutlinedIcon className={styles.icon} />
        </div>
        <div className={styles.dataContent}>
          <h1>{props.totalvotes}</h1>
          <h2>Total Votes</h2>
        </div>
      </div>
      <div className={styles.voters}>
        {" "}
        <div className={styles.iconCover}>
          <PeopleAltOutlinedIcon className={styles.icon} />
        </div>
        <div className={styles.dataContent}>
          <h1>{props.num[0]}</h1>
          <h2>Voters</h2>
        </div>
      </div>
      <div className={styles.candidates}>
        {" "}
        <div className={styles.iconCover}>
          <Diversity3OutlinedIcon className={styles.icon} />
        </div>
        <div className={styles.dataContent}>
          <h1>{props.num[1]}</h1>
          <h2>Candidates</h2>
        </div>
      </div>
    </div>
  );
};

export default ElectionPageData;
