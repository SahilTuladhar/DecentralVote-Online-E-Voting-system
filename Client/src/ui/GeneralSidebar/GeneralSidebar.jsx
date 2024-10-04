import styles from "./GeneralSidebar.module.css";
import SidebarComponent from "../SiderbarComponent/SidebarComponent";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import HowToVoteOutlinedIcon from "@mui/icons-material/HowToVoteOutlined";
import { Link } from "react-router-dom";

const GeneralSidebar = () => {
  return (
    <div className={styles.sidebarCover}>
      <div className={styles.sidebarContents}>
        <Link to="/election-form">
          <SidebarComponent
            optionTitle="Create Election"
            iconTitle={<AddOutlinedIcon />}
          />
        </Link>

        <Link to="/election-list">
          <SidebarComponent
            optionTitle="My Elections"
            iconTitle={<PollOutlinedIcon />}
          />
        </Link>

        <Link to="/participated-elections-list">
          <SidebarComponent
            optionTitle="Participated Elections"
            iconTitle={<HowToVoteOutlinedIcon />}
          />
        </Link>
      </div>
    </div>
  );
};

export default GeneralSidebar;
