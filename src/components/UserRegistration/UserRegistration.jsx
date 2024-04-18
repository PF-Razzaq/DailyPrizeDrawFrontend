import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import "./UserRegistration.css";
import { API_URL_USERS } from "../../index";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    address: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    try {
      await axios.post(API_URL_USERS, formData);
      setFormData({
        fname: "",
        lname: "",
        address: "",
        email: "",
        phoneNo: "",
        password: "",
        confirmPassword: "",
        role: "user",
      });
      setPasswordError("");
      setSubmitError("");
      console.log("Form submitted successfully");
      navigate("/users");
    } catch (error) {
      setSubmitError("Error submitting data. Please try again later.");
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      <div className="form-bg-color">
        <Container
          className="mt-5 col-md-4 border-none p-3 bg-light rounded"
          style={{ background: `linear-gradient(135deg, #FF3366, #33FFCC)` }}
        >
          <h1 className="text-center">User Registration</h1>
          {submitError && <Alert variant="danger">{submitError}</Alert>}
          <Form onSubmit={handleSubmit} method="post">
            <Form.Group controlId="fname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="lname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

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

            <Form.Group controlId="phoneNo">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
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

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                required
              />
              {passwordError && (
                <Form.Text className="text-danger">{passwordError}</Form.Text>
              )}
            </Form.Group>

            <Form.Control type="hidden" name="role" value="user" />

            <Button variant="primary" className="mt-4 w-100" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default UserForm;
