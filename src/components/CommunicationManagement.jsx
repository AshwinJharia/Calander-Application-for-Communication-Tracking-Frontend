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
} from "@mui/material";

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
        "http://localhost:5000/api/communications"
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
          `http://localhost:5000/api/communications/${editId}`,
          form
        );
        setEditId(null);
      } else {
        await axios.post(`http://localhost:5000/api/communications`, form);
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
      await axios.delete(`http://localhost:5000/api/communications/${id}`);
      fetchMethods();
    } catch (error) {
      console.error("Failed to delete communication method", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <hr
        style={{
          border: "0.5px solid black",
          height: "4px",
          background: "linear-gradient(to right, #00bcd4, #2196f3)",
          margin: "10px 0",
        }}
      />
      
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
        Communication Method Management
      </Typography>

      <Paper sx={{ padding: 3, boxShadow: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              label="Sequence"
              name="sequence"
              value={form.sequence}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Checkbox
              name="mandatory"
              checked={form.mandatory}
              onChange={handleInputChange}
            />
            Mandatory
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              {editId ? "Update" : "Add"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Sequence</TableCell>
              <TableCell>Mandatory</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {methods.map((method) => (
              <TableRow key={method._id}>
                <TableCell>{method.name}</TableCell>
                <TableCell>{method.description}</TableCell>
                <TableCell>{method.sequence}</TableCell>
                <TableCell>{method.mandatory ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Box display="flex" gap={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(method)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      sx={{
                        backgroundColor: "red",
                        "&:hover": { backgroundColor: "darkred" },
                      }}
                      onClick={() => handleDelete(method._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <hr
        style={{
          border: "0.5px solid black",
          height: "4px",
          background: "linear-gradient(to right, #00bcd4, #2196f3)",
          margin: "20px 0",
        }}
      />
    </Box>
  );
};

export default CommunicationMethodManagement;
