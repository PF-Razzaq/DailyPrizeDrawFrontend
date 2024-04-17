import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UserRegistration from "./components/UserRegistration/UserRegistration";
import Login from "./components/Login/Login";
import Users from "./components/Users/Users";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/registration" element={<UserRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
