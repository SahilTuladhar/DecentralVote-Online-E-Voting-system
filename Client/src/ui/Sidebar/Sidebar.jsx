import styles from "./Sidebar.module.css";
import SidebarComponent from "../SiderbarComponent/SidebarComponent";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { Link } from "react-router-dom";

const Sidebar = (props) => {



  return (
    <div className={styles.sidebarCover}>
      <div className={styles.sidebarContents}>
        <Link to="/election-page">
          <SidebarComponent
            optionTitle="Overview"
            iconTitle={<SummarizeIcon />}
          />
        </Link>

        <Link to = "/results-page">
          <SidebarComponent
            optionTitle="Results"
            iconTitle={<PollOutlinedIcon />}
          />{" "}
        </Link>

        <Link to={`/voters-list/${props.eid}`}>
          <SidebarComponent
            optionTitle="Voters List"
            iconTitle={<PeopleAltOutlinedIcon />}
          />
        </Link>

        <Link to={`/candidate-list/${props.eid}`}>
          <SidebarComponent
            optionTitle="Candidate List"
            iconTitle={<EmojiPeopleOutlinedIcon />}
          />
        </Link>

        <Link to={`/add-voter/${props.eid}`}>
          <SidebarComponent
            optionTitle="Add Voter"
            iconTitle={<GroupAddOutlinedIcon />}
          />
        </Link>

        <Link to={`/add-candidate/${props.eid}`}>
          {" "}
          <SidebarComponent
            optionTitle="Add Candidate"
            iconTitle={<PersonAddAltOutlinedIcon />}
          />{" "}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
