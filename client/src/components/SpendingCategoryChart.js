import { useState, useEffect } from "react";
import axios from "../apis/axios";
import dayjs from "dayjs";
import Box from "@mui/material/Box";

export default function SpendingCategoryChart() {
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [data, setData] = useState([]);
  const [year, setYear] = useState(dayjs().year());

  const populateData = async (year) => {
    const spendingByCategory = await axios.get(
      `/getspendingbycategory/${year}`
    );
    return spendingByCategory.data;
  };

  useEffect(() => {
    populateData(year).then(result => {
        setData(result);
        setIsDataFetched(true);
        console.log(result);
    })
  }, [year]);

  return (
    <Box>
      <h1>SpendingCategoryChart. Currently set data to be an array with objects (category, spending). If there are no entries, the array will be null. </h1>
      <h1> Next step will be to display the data as a pie chart. </h1>
    </Box>
  );
}
