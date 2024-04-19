import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UserRegistration from "./components/UserRegistration/UserRegistration";
import Login from "./components/Login/Login";
import Users from "./components/Users/Users";
import UserDashboard from "./components/UserDashboard/UserDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/registration" element={<UserRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/adminDashboard" element={<Users />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
