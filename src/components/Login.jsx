import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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
        `https://calander-application-for-communication.onrender.com/api/login`,
        formData
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      navigate("/user-dashboard");
    } catch (error) {
      alert(
        "Error logging in: " + error.response?.data?.error ||
          "An error occurred"
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
          borderRadius: "15px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: "linear-gradient(90deg, #2196f3, #e91e63)",
          }}
        />

        <Box
          sx={{
            p: 2,
            borderRadius: "50%",
            bgcolor: "#1976d2",
            mb: 2,
          }}
        >
          <LockOutlinedIcon sx={{ color: "white" }} />
        </Box>

        <Typography
          component="h1"
          variant="h4"
          sx={{ mb: 4, fontWeight: 600, color: "#333" }}
        >
          Welcome Back
        </Typography>

        <TextField
          label="Email Address"
          name="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleInputChange}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#1976d2",
              },
            },
          }}
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
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#1976d2",
              },
            },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            mt: 3,
            mb: 2,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "8px",
            background: "linear-gradient(45deg, #1976d2, #2196f3)",
            "&:hover": {
              background: "linear-gradient(45deg, #1565c0, #1976d2)",
              transform: "translateY(-2px)",
              transition: "all 0.3s",
            },
          }}
        >
          Sign In
        </Button>

        <Box sx={{ mt: 3, width: "100%", textAlign: "center" }}>
          <Button
            onClick={() => navigate("/admin-login")}
            variant="outlined"
            color="error"
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                transform: "translateY(-2px)",
                transition: "all 0.3s",
              },
            }}
          >
            Admin Login
          </Button>
        </Box>

        <Typography
          sx={{
            mt: 3,
            cursor: "pointer",
            color: "#1976d2",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          onClick={() => navigate("/register")}
        >
          Don't have an account?{" "}
          <span style={{ fontWeight: 600 }}>Sign Up</span>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
