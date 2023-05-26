import React from "react";
import ReactDOM from "react-dom/client";
import Auth from "./pages/Auth";
import App from "./pages/App";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="signup" element={<SignUpForm />} />
        </Route>
        <Route path="/changex" element={<App />} >
          <Route path="/changex" element={<Home />} />
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
