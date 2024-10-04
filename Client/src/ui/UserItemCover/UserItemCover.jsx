import styles from "./UserItemCover.module.css";
import axios from "axios";
const UserItemCover = (props) => {
  const onRemoveUserHandler = async () => {
    props.onRemove(props.id);

    try {
      const candidateId = props.id;
      const electionId = props.electionId;
      console.log("aaa", electionId);
      console.log("bbb", candidateId);
      const response = await axios.patch(
        `http://localhost:4000/candidate/deletecandidate/${electionId}`,
        { candidateId }
      );
    } catch (error) {
      console.error("Error fetching voter data:", error);
      // or setError('Error fetching voter data');
    }
  };

  return (
    <>
      <div className={styles.itemCover}>
        <div className={styles.dropColor}>
          {" "}
          <div className={styles.imageCover}>
            <img src="\images\add-candidate-image.png" alt="" />
          </div>
          <div className={styles.information}>
            <h3>{props.name}</h3>
            <h4 className={styles.description}>{props.id}</h4>
            <button className={styles.removeBtn} onClick={onRemoveUserHandler}>
              Remove
            </button>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default UserItemCover;
