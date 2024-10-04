import React from "react";
import { Line } from "react-chartjs-2";
import ElectionItemContext from "../../contexts/electionItem-context";

import axios from "axios";
import { useState, useRef, useEffect, useContext } from "react";

const LineChart = (props) => {
  const electionItemCtx = useContext(ElectionItemContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
 

  return <Line data={props.chartData} options={props.chartOptions} />;
};

export default LineChart;
