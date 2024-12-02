import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      navigate("/admin-dashboard");
    } catch (error) {
      alert("Error logging in: " + error.response.data.error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        ADMIN LOGIN
      </Typography>
      <TextField
        label="Email"
        name="email"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={handleInputChange}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        value={formData.password}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        fullWidth
        onClick={handleLogin}
        sx={{ marginTop: 2 }}
      >
        Login
      </Button>

      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Typography variant="body2">
          Are you a user?{" "}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/")}
          >
            Go to User Login
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminLogin;
