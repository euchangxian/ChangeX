import { useState, useEffect } from "react";
import axios from "../apis/axios";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function BudgetSpendingChart() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(dayjs().year());

  const populateData = async (year) => {
    const janInYear = dayjs(new Date(year, 0));
    const dataTmp = [];

    for (let i = 0; i < 12; i++) {
      const currMonth = janInYear.add(i, "month");
      const responseSpending = await axios.get(`/getspending/${currMonth}`);
      const responseBudget = await axios.get(`/getbudget/${currMonth}`);
      const dataEntry = {
        month: currMonth.format("MMM"),
        spending: -responseSpending.data,
        budget: responseBudget.data,
      };
      dataTmp.push(dataEntry);
    }
    return dataTmp;
  };

  useEffect(() => {
    populateData(year).then((result) => {
        setData(result);
        console.log(result);
    })
  }, [year]);

  return (
    <Box>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="spending" fill="#8884d8" />
        <Bar dataKey="budget" fill="#82ca9d" />
      </BarChart>
    </Box>
  );
}
