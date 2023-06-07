import { useState, useEffect } from "react";
import axios from "../apis/axios";
import dayjs from "dayjs";
import { Box, LinearProgress } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function SpendingCategoryChart() {
  const [isDataFetched, setIsDataFetched] = useState(true);
  const [data, setData] = useState([
    { name: "Groceries", value: 400 },
    { name: "Entertainment", value: 200 },
    { name: "Transport", value: 300 },
  ]);
  const [year, setYear] = useState(dayjs().year());

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF19A3",
    "#19FF5A",
    "#D1FF19",
    "#FF5733",
  ];

  const populateData = async year => {
    const spendingByCategory = await axios.get(
      `/getspendingbycategory/${year}`
    );
    return spendingByCategory.data;
  };

  useEffect(() => {
    populateData(year).then(result => {
      setData(result);
      setIsDataFetched(true);
    });
  }, [year]);

  return (
    <Box>
      <h1>Spending by Category</h1>
      {isDataFetched ? (
        <PieChart width={400} height={400} key={year}>
          <Pie
            nameKey="name"
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={125}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
}
