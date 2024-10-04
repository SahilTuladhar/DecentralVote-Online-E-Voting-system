import styles from "./VoterUserItemCover.module.css"
import axios from 'axios'
const VoterUserItemCover = (props) => {

 const onRemoveVoterHandler = async() => {
  props.onRemove(props.id)
  try {
    const voterId = props.id;
    console.log('voterId',voterId)
    const electionId = props.electionId;
    console.log("aaa", electionId);
 
    const response = await axios.patch(
      `http://localhost:4000/voter/deletevoter/${electionId}`,
      { voterId }
    );
  } catch (error) {
    console.error("Error fetching voter data:", error);
    // or setError('Error fetching voter data');
  }
 }

 return(
   <>
      <div className={styles.voterItemCover}>
        <div className={styles.dropColor}>
          {" "}
          <div className={styles.imageCover}>
            <img src="\images\add-candidate-image.png" alt="" />
          </div>
          <div className={styles.information}>
            <h3>{props.name}</h3>
            <h4 className={styles.description}>{props.id}</h4>
            <button className={styles.removeBtn} onClick={onRemoveVoterHandler}>
              Remove
            </button>
          </div>
        </div>{" "}
      </div>
    </>
 );
}

export default VoterUserItemCover