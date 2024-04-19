import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { API_URL_USERS } from "../../index";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Sidebar from "../Sidebar/Sidebar";

const Login = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "", // Added role to formData state
  });
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const matchingUser = users.find(
        (data) =>
          data.email === formData.email &&
          data.password === formData.password &&
          data.role === formData.role // Check role from form data
      );

      if (matchingUser) {
        // Store user authentication in local storage
        const isLoggedIn = localStorage.setItem("isLoggedIn", true);
        const userId = localStorage.setItem("userId", matchingUser.id); // Assuming user ID is available
        navigate(`/${formData.role}Dashboard`);
        console.log("isLoggedIn", isLoggedIn); // Redirect to respective dashboard
        console.log("userId", userId); // Redirect to respective dashboard
      } else {
        setPasswordError("Invalid email, password, or role");
      }
    } catch (error) {
      console.error("Error handling form submission:", error);
      // Handle error gracefully, display an error message to the user, etc.
    }
  };

  const getUsers = async () => {
    try {
      const res = await axios.get(API_URL_USERS);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching Users:", error);
      // Handle error gracefully, display an error message to the user, etc.
    }
  };

  return (
    <>
      <div className="d-flex">
        <div className="form-bg-color w-100">
          <Container className="mt-5 col-md-4 border-none p-3 bg-light rounded">
            <h1 className="text-center">User Login</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </Form.Control>
              </Form.Group>

              {passwordError && <Alert variant="danger">{passwordError}</Alert>}

              <Button variant="primary" className="mt-4 w-100" type="submit">
                Login
              </Button>
            </Form>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Login;
