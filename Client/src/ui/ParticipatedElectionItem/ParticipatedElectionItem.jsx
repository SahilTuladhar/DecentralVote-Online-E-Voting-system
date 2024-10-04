import styles from "./ParticipatedElectionItem.module.css";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link } from "react-router-dom";
import ElectionItemContext from "../../contexts/electionItem-context";
import { useContext } from "react";

const ParticipatedElectionItem = (props) => {
  const partElectionData = {
    eTitle: props.title,
    eOrganizer: props.organizer,
    eStart: props.sDate,
    eEnd: props.eDate,
  };

  const pElectionCtx = useContext(ElectionItemContext);

  const onElectionItemClicked = () => {
    pElectionCtx.setItemTitle(props.title);
    pElectionCtx.setItemOrganizer(props.organizer);
    pElectionCtx.setItemStartDate(props.sDate);
    pElectionCtx.setItemEndDate(props.eDate);
    console.log(pElectionCtx.title);
  };

  return (
    <Link to="/voter-election-page">
      <div className={styles.itemCover} onClick={onElectionItemClicked}>
        <div className={styles.infoCover}>
          <div className={styles.upComponent}>
            <h4>{props.title}</h4>
            <h5>
              Start Date <CalendarTodayOutlinedIcon className={styles.icon} />
            </h5>
            <h5>
              End Date <CalendarTodayOutlinedIcon className={styles.icon} />
            </h5>
          </div>
          <div className={styles.downComponent}>
            <h4>{props.organizer}</h4>
            <h5 className={styles.startDate}>{props.sDate}</h5>
            <h5 className={styles.endDate}>{props.eDate}</h5>
          </div>
        </div>

        <div className={styles.itemActions}>
          <EditOutlinedIcon />
          <DeleteOutlineOutlinedIcon />
        </div>
      </div>
    </Link>
  );
};

export default ParticipatedElectionItem;
