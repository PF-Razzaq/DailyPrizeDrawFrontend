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
            <main className="main">
              <h4 className="fw-bold">Admin Dashboard</h4>
              <h5 className="fw-bold" style={{ marginTop: "5rem" }}>
                Home
              </h5>
              <h5 className="mt-4 fw-bold">About</h5>
              <h5 className="mt-4 fw-bold">Contact</h5>
              <h5 className="mt-4 fw-bold">Testimonial</h5>
            </main>
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
