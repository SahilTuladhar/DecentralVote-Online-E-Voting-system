import { createContext , useState } from "react";

const ElectionItemContext = createContext({
  title: "",
  organizer: "",
  startDate: "",
  endDate: "",
  electionId:'',
});

export function ElectionItemContextProvider(props) {
const [itemId, setItemId] = useState("");
const [itemTitle, setItemTitle] = useState("");
const [itemOrganizer, setItemOrganizer] = useState("");
const [itemStartDate, setItemStartDate] = useState("");
const [itemEndDate, setItemEndDate] = useState("");
const [itemElectionId , setItemElectionId] = useState("")

  const context = {
    id:itemId,
    title: itemTitle,
    organizer: itemOrganizer,
    startDate: itemStartDate,
    endDate: itemEndDate,
    electionId: itemElectionId,
    setItemId,
    setItemTitle, 
    setItemOrganizer,
    setItemStartDate,
    setItemEndDate,
    setItemElectionId,
  };

  return (
    <ElectionItemContext.Provider value={context}>
      {props.children}
    </ElectionItemContext.Provider>
  );
}

export default ElectionItemContext;
