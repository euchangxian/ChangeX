import Auth from "./pages/Auth";
import ChangeX from "./pages/ChangeX";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="signup" element={<SignUpForm />} />
        </Route>
        <Route path="/changex" element={<ChangeX />} >
          <Route path="/changex" element={<Home />} />
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}