import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap"; // Assuming you're using Bootstrap for styling
import { API_URL_USERS } from "../../index";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: "",
    fname: "",
    lname: "",
    address: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const res = await axios.get(API_URL_USERS);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleEdit = (user) => {
    setEditFormData(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL_USERS}${editFormData.id}/`, editFormData);
      setShowEditModal(false);
      getUsers(); // Refresh user list after editing
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      console.log("Deleting user with ID:", userId);
      await axios.delete(`${API_URL_USERS}${userId}`);
      getUsers(); // Refresh user list after deleting
      console.log("Deletion successful");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className="d-flex">
        <div className="h-100">
          <Sidebar />
        </div>
        <div className=" mx-auto mt-5 w-75">
          <h2 className="text-center fs-1">Admin Dashboard</h2>
          <Button
            variant="warning"
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
                <th>Role</th>
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
                  <td>{user.role}</td>
                  <td>
                    <Button variant="success" onClick={() => handleEdit(user)}>
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal show={showEditModal} onHide={handleCloseEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleEditSubmit}>
                <Form.Group controlId="fname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    value={editFormData.fname}
                    onChange={handleEditChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="lname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lname"
                    value={editFormData.lname}
                    onChange={handleEditChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="textarea"
                    name="address"
                    value={editFormData.address}
                    onChange={handleEditChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="phoneNo">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNo"
                    value={editFormData.phoneNo}
                    onChange={handleEditChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={editFormData.password}
                    onChange={handleEditChange}
                    required
                  />
                </Form.Group>
                {/* Add other form fields for editing */}
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Users;
