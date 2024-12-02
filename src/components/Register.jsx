import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Divider } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);
      console.log(response);
      
      //  alert(response.data.message);
      navigate("/");
    } catch (error) {
      alert("Error registering user: " + (error.response?.data?.error || "An unexpected error occurred."));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        padding: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 400,
          padding: 4,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Register
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
          sx={{ marginTop: 2, padding: "10px 0" }}
        >
          Register
        </Button>
        <Box sx={{ textAlign: "center", marginTop: 3 }}>
          <Typography variant="body1">
            Already have an account?{" "}
            <Button
              color="primary"
              size="small"
              onClick={() => navigate("/")}
              sx={{ textTransform: "none", padding: 0 }}
            >
              Login
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
