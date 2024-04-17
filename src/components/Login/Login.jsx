import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log(formData);
  };

  return (
    <>
      <div className="form-bg-color">
        <Container
          className="mt-5 col-md-4 border-none p-3 bg-light rounded"
          style={{ background: `linear-gradient(135deg, #FF3366, #33FFCC)` }}
        >
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

            <Button variant="primary" className="mt-2" type="submit">
              Login
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default Login;
