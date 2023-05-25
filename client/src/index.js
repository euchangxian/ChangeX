import React from "react";
import ReactDOM from "react-dom/client";
import Auth from "./pages/Auth";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth />
    </BrowserRouter>
  </React.StrictMode>
);
