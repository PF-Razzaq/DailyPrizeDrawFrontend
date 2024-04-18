import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="main-div">
        <div className="left">
          <div className="sidebar">
            <main className="main"></main>
            <div className="logout">
              <hr style={{ width: "60%" }} />
              <div
                style={{
                  fontWeight: "bold",
                }}
                className="responsive-sidebar"
              >
                Logged in as:
              </div>
              <div
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
                className="responsive-sidebar"
              ></div>
              <div className="responsive-logout-btn"></div>
              <button
                className="responsive-sidebar btn btn-danger"
                color="danger"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
