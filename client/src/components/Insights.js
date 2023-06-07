import { useState, useEffect } from "react";
import axios from "../apis/axios";
import dayjs from "dayjs";

export default function insights() {
  const currMonth = dayjs();
  const responseBudget = axios
    .get(`/comparespending/${currMonth}`)
    .then((result) => console.log(result.data));
  return <h1>Hello world</h1>;
}
