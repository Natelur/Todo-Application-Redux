import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/user/userSlice";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 

  const handleLogin = () => {
    if (username === "guest@gmail.com" && password === "123") {
      const user = {
        username: username,
      };
      dispatch(login(user));
      navigate("/"); 
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form className="p-5 bg-light rounded shadow-sm">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </Form.Group>

        <Button
          className="mt-3"
          variant="primary"
          onClick={handleLogin} 
        >
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
