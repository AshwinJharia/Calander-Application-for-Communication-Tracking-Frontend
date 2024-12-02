import React, { useState } from "react";
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Paper,
  Container,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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
    <Container component="main" maxWidth="xs">
      <Paper 
        elevation={6}
        sx={{
          marginTop: 8,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 3,
          background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)'
        }}
      >
        <Typography 
          variant="h4" 
          sx={{
            fontWeight: 700,
            color: '#1a237e',
            marginBottom: 3,
            textTransform: 'uppercase',
            letterSpacing: 1
          }}
        >
          Admin Portal
        </Typography>

        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{ 
            '& .MuiOutlinedInput-root': {
              borderRadius: 2
            }
          }}
        />

        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ 
            '& .MuiOutlinedInput-root': {
              borderRadius: 2
            }
          }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            marginTop: 3,
            marginBottom: 2,
            padding: 1.5,
            borderRadius: 2,
            background: 'linear-gradient(45deg, #1a237e 30%, #3949ab 90%)',
            fontWeight: 600,
            '&:hover': {
              background: 'linear-gradient(45deg, #3949ab 30%, #1a237e 90%)',
            }
          }}
        >
          Sign In
        </Button>

        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Need User Access?
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            sx={{
              marginTop: 1,
              borderRadius: 2,
              textTransform: 'none',
              borderColor: '#1a237e',
              color: '#1a237e',
              '&:hover': {
                borderColor: '#3949ab',
                background: 'rgba(57, 73, 171, 0.04)'
              }
            }}
          >
            Go to User Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
