import styles from "./ProfileElectionItem.module.css";
import ElectionItemContext from "../../contexts/electionItem-context";
import { useContext } from "react";
import { Link } from "react-router-dom";

const ProfileElectionItem = (props) => {
  const profElectionItemCtx = useContext(ElectionItemContext);

  const onElectionItemClicked = () => {
    localStorage.setItem('electionid',props.id)
    profElectionItemCtx.setItemId(props.id);
    profElectionItemCtx.setItemTitle(props.title);
    profElectionItemCtx.setItemOrganizer(props.organizer);
    profElectionItemCtx.setItemStartDate(props.sDate);
    profElectionItemCtx.setItemEndDate(props.eDate);
    console.log(profElectionItemCtx.title);
  };

  return (
    <>
      <Link to="/election-page">
        <div className={styles.itemCover} onClick={onElectionItemClicked}>
          <div className={styles.itemUp}>
            <h4>{props.title}</h4>
          </div>
          <div className={styles.itemDowm}>
            <h5> {props.organizer}</h5>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProfileElectionItem;
