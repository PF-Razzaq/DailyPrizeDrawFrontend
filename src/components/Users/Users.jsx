import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap"; // Assuming you're using Bootstrap for styling
import { API_URL_USERS } from "../../index";
import { Navigate, useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const getUsers = async () => {
    try {
      const res = await axios.get(API_URL_USERS); // Corrected API_URL_USERS variable
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (userid) => {
    try {
      console.log("Deleting user with ID:", userid);
      await axios.delete(API_URL_USERS + userid);
      window.location.reload();
      console.log("Deletion successful");
      // Optionally, update the state to reflect the deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2>Users</h2>
      <Button
        variant="info"
        className="my-2"
        onClick={() => navigate("/registration")}
      >
        Add User
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.fname} {user.lname}
              </td>
              <td>{user.address}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.phoneNo}</td>
              <td>
                <Button variant="info">Edit</Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
