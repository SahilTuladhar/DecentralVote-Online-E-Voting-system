import styles from "./ElectionItem.module.css";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ElectionPage from "../../components/ElectionPage/ElectionPage";
import { Link } from "react-router-dom";
import ElectionItemContext from "../../contexts/electionItem-context";
import { useContext } from "react";

const ElectionItem = (props) => {
  const electionItemCtx = useContext(ElectionItemContext);

  const electionItemData = {
    title: props.title,
    organizer: props.organizer,
    startDate: props.sDate,
    endDate: props.eDate,
    eId: props.electionid
  };

  const onElectionItemClicked = () => {
    electionItemCtx.setItemTitle(props.title);
    electionItemCtx.setItemOrganizer(props.organizer);
    electionItemCtx.setItemStartDate(props.sDate);
    electionItemCtx.setItemEndDate(props.eDate);
    electionItemCtx.setItemElectionId(props.electionid)
    console.log(electionItemCtx.title);
    console.log(electionItemData);
  };

  return (
    <Link to="/election-page">
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
            <h5 className={styles.startDate}>{props.sDate.split("T")[0]}</h5>
            <h5 className={styles.endDate}>{props.eDate.split("T")[0]}</h5>
          </div>
        </div>

        <div className={styles.itemActions}>
         
        </div>
      </div>
    </Link>
  );
};

export default ElectionItem;
