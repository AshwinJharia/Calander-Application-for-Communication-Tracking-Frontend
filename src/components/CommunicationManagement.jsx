import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Checkbox,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Box,
  Card,
  IconButton,
  Fade,
  Tooltip,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const CommunicationMethodManagement = () => {
  const [methods, setMethods] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    sequence: "",
    mandatory: false,
  });
  const [editId, setEditId] = useState(null);

  const fetchMethods = async () => {
    try {
      const response = await axios.get(
        `https://calander-application-for-communication.onrender.com/api/communications`
      );
      setMethods(response.data);
    } catch (error) {
      console.error("Failed to fetch communication methods", error);
    }
  };

  useEffect(() => {
    fetchMethods();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(
          `https://calander-application-for-communication.onrender.com/api/communications/${editId}`,
          form
        );
        setEditId(null);
      } else {
        await axios.post(
          `https://calander-application-for-communication.onrender.com/api/communications`,
          form
        );
      }
      setForm({ name: "", description: "", sequence: "", mandatory: false });
      fetchMethods();
    } catch (error) {
      console.error("Failed to save communication method", error);
    }
  };

  const handleEdit = (method) => {
    setForm(method);
    setEditId(method._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://calander-application-for-communication.onrender.com/api/communications/${id}`
      );
      fetchMethods();
    } catch (error) {
      console.error("Failed to delete communication method", error);
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Card
        elevation={5}
        sx={{
          borderRadius: "15px",
          background: "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
          padding: "2rem",
          marginBottom: "2rem",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "#1a237e",
            textAlign: "center",
            marginBottom: "2rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            borderBottom: "3px solid #1a237e",
            paddingBottom: "1rem",
          }}
        >
          Communication Method Management
        </Typography>

        <Paper
          sx={{
            padding: 4,
            borderRadius: "12px",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Description"
                name="description"
                value={form.description}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="Sequence"
                name="sequence"
                value={form.sequence}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  name="mandatory"
                  checked={form.mandatory}
                  onChange={handleInputChange}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                />
                <Typography>Mandatory</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                startIcon={<AddCircleIcon />}
                sx={{
                  borderRadius: "10px",
                  padding: "12px",
                  background:
                    "linear-gradient(45deg, #1a237e 30%, #283593 90%)",
                  color: "white",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #283593 30%, #1a237e 90%)",
                  },
                }}
              >
                {editId ? "Update" : "Add New"}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Card>

      <Card
        elevation={5}
        sx={{
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: "linear-gradient(45deg, #1a237e 30%, #283593 90%)",
              }}
            >
              <TableCell sx={{ color: "white", fontWeight: 600 }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>
                Description
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>
                Sequence
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>
                Mandatory
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {methods.map((method) => (
              <TableRow
                key={method._id}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(26, 35, 126, 0.04)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                <TableCell>{method.name}</TableCell>
                <TableCell>{method.description}</TableCell>
                <TableCell>{method.sequence}</TableCell>
                <TableCell>
                  <Chip
                    label={method.mandatory ? "Yes" : "No"}
                    color={method.mandatory ? "primary" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Tooltip title="Edit" TransitionComponent={Fade} arrow>
                      <IconButton
                        onClick={() => handleEdit(method)}
                        sx={{ color: "#1a237e" }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" TransitionComponent={Fade} arrow>
                      <IconButton
                        onClick={() => handleDelete(method._id)}
                        sx={{ color: "#d32f2f" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
};

export default CommunicationMethodManagement;
