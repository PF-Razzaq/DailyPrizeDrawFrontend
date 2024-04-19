import React, { useState, useEffect } from "react";
import UserSidebar from "../Sidebar/UserSidebar";
import "./UserDashboard.css";
import axios from "axios";
import { API_URL_USERS } from "../../index";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const [checkboxes, setCheckboxes] = useState(Array(5).fill(false));

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const getUserData = async () => {
      try {
        const res = await axios.get(`${API_URL_USERS}${userId}`);
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const storedCheckboxes = JSON.parse(localStorage.getItem("checkboxes"));
    if (storedCheckboxes) {
      setCheckboxes(storedCheckboxes);
    }

    if (userId) {
      getUserData();
    }
  }, []);

  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
    localStorage.setItem("checkboxes", JSON.stringify(newCheckboxes));
  };

  const handleFormSubmit = (e, value) => {
    e.preventDefault();
    if (checkboxes.some((checkbox) => checkbox)) {
      setTotalValue(totalValue + value);
      localStorage.setItem("totalValue", JSON.stringify(totalValue + value));
    }
  };

  const getTotalValue = JSON.parse(localStorage.getItem("totalValue"));
  return (
    <>
      <div className="d-flex">
        <div>
          <UserSidebar />
        </div>
        <div>
          <div className="mx-auto mt-5 user-width">
            <h2 className="text-center fs-1">User Dashboard</h2>
            {userData && (
              <div>
                {checkboxes.map((isChecked, index) => (
                  <div key={index} className="mb-3">
                    <form onSubmit={(e) => handleFormSubmit(e, 100)}>
                      <label htmlFor={`checkbox${index}`}>100</label>
                      <input
                        id={`checkbox${index}`}
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      <button
                        type="submit"
                        className="btn btn-info ms-2"
                        disabled={!isChecked}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4">
              <h4>Total Value: {getTotalValue}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
