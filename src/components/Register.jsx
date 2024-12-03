import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff, PersonAdd } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `https://calander-application-for-communication.onrender.com/api/register`,
        formData
      );
      navigate("/");
    } catch (error) {
      alert(
        "Registration failed: " +
          (error.response?.data?.error || "Please try again.")
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: 3,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 450,
          width: "100%",
          padding: 5,
          borderRadius: 4,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <PersonAdd sx={{ fontSize: 40, color: "#764ba2", mr: 2 }} />
          <Typography variant="h4" fontWeight="700" color="#333">
            Create Account
          </Typography>
        </Box>

        <Divider sx={{ mb: 4, background: "#764ba2" }} />

        <TextField
          label="Email Address"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleInputChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#764ba2",
              },
            },
          }}
        />

        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#764ba2",
              },
            },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleRegister}
          sx={{
            mt: 4,
            mb: 2,
            py: 1.5,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            fontSize: "1.1rem",
            fontWeight: "600",
            "&:hover": {
              background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
            },
          }}
        >
          Register Now
        </Button>

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body1" color="text.secondary">
            Already have an account?{" "}
            <Button
              onClick={() => navigate("/")}
              sx={{
                textTransform: "none",
                color: "#764ba2",
                fontWeight: "600",
                "&:hover": {
                  background: "transparent",
                  color: "#667eea",
                },
              }}
            >
              Sign In
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
