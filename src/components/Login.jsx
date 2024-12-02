import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
      console.log(response)
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      navigate("/user-dashboard");
    } catch (error) {
      alert("Error logging in: " + error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 4,
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        mt: 8,
      }}
    >
      <div className="text-4xl font-extrabold capitalize underline mx-auto w-fit mb-6 text-center">
        Login
      </div>

      <TextField
        label="Email"
        name="email"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={handleInputChange}
        variant="outlined"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        value={formData.password}
        onChange={handleInputChange}
        variant="outlined"
      />
      <Button
        variant="contained"
        fullWidth
        onClick={handleLogin}
        sx={{
          marginTop: 3,
          padding: "10px 0",
          fontSize: "16px",
          fontWeight: "bold",
          backgroundColor: "#1976d2",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        }}
      >
        Login
      </Button>

      <div className="w-full mt-8 text-center">
        <span className="text-md">Are you an admin?</span>
        <button
          onClick={() => navigate("/admin-login")}
          className="bg-red-600 text-white py-2 px-4 rounded-md ml-4 hover:bg-red-700 transition-transform transform hover:scale-105"
        >
          Admin Login
        </button>
      </div>

      <div className="w-full mt-6 text-center">
  <span
    onClick={() => navigate("/register")}
    className="text-md text-blue-500 cursor-pointer hover:underline transition-all duration-200"
  >
    Don't have an account? <span className="font-semibold">Register now</span>
  </span>
</div>

    </Box>
  );
};

export default Login;
