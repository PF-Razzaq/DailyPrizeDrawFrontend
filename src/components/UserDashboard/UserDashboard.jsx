import React from "react";
import UserSidebar from "../Sidebar/UserSidebar";
import "./UserDashboard.css";

const UserDashboard = () => {
  return (
    <>
      <div className="d-flex">
        <div>
          <UserSidebar />
        </div>
        <div>
          <div className="mx-auto mt-5 user-width">
            <h2 className="text-center fs-1">User Dashboard</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
