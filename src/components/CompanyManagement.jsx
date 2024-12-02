import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Modal, Box, TextField, MenuItem, Typography, Divider } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material"; 

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    location: "",
    linkedIn: "",
    emails: "",
    phoneNumbers: "",
    comments: "",
    periodicity: "",
  });

  const fetchCompanies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/companies");
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleOpenModal = (company = null) => {
    if (company) {
      setCurrentCompany(company);
      setFormValues({
        name: company.name,
        location: company.location,
        linkedIn: company.linkedIn,
        emails: company.emails.join(", "),
        phoneNumbers: company.phoneNumbers.join(", "),
        comments: company.comments,
        periodicity: company.periodicity,
      });
    } else {
      setCurrentCompany(null);
      setFormValues({
        name: "",
        location: "",
        linkedIn: "",
        emails: "",
        phoneNumbers: "",
        comments: "",
        periodicity: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formValues).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = `${key} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    const data = {
      ...formValues,
      emails: formValues.emails.split(",").map((email) => email.trim()),
      phoneNumbers: formValues.phoneNumbers.split(",").map((phone) => phone.trim()),
    };

    if (validateForm()) {
      try {
        if (currentCompany) {
          await axios.put(
            `http://localhost:5000/api/companies/edit/${currentCompany._id}`,
            data
          );
        } else {
          await axios.post(`http://localhost:5000/api/companies/add`, data);
        }
        fetchCompanies();
        handleCloseModal();
      } catch (error) {
        console.error("Error saving company:", error);
      }
    } else {
      alert("Please fill all required fields");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await axios.delete(`http://localhost:5000/api/companies/delete/${id}`);
        fetchCompanies();
      } catch (error) {
        console.error("Error deleting company:", error);
      }
    }
  };

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "linkedIn", headerName: "LinkedIn Profile", width: 200 },
    { field: "emails", headerName: "Emails", width: 200 },
    { field: "phoneNumbers", headerName: "Phone Numbers", width: 200 },
    { field: "comments", headerName: "Comments", width: 150 },
    { field: "periodicity", headerName: "Periodicity", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleOpenModal(params.row)}
            startIcon={<Edit />}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row._id)}
            startIcon={<Delete />}
            sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Company Management
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal()}
        style={{ marginBottom: 20 }}
      >
        Add Company
      </Button>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={companies}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </div>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {currentCompany ? "Edit Company" : "Add Company"}
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <form>
            <TextField
              label="Name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Location"
              name="location"
              value={formValues.location}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.location}
              helperText={errors.location}
            />
            <TextField
              label="LinkedIn Profile"
              name="linkedIn"
              value={formValues.linkedIn}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.linkedIn}
              helperText={errors.linkedIn}
            />
            <TextField
              label="Emails (comma-separated)"
              name="emails"
              value={formValues.emails}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.emails}
              helperText={errors.emails}
            />
            <TextField
              label="Phone Numbers (comma-separated)"
              name="phoneNumbers"
              value={formValues.phoneNumbers}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.phoneNumbers}
              helperText={errors.phoneNumbers}
            />
            <TextField
              label="Comments"
              name="comments"
              value={formValues.comments}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.comments}
              helperText={errors.comments}
            />
            <TextField
              label="Periodicity"
              name="periodicity"
              value={formValues.periodicity}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              select
              error={!!errors.periodicity}
              helperText={errors.periodicity}
            >
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Bi-Weekly">Bi-Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
            </TextField>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ marginTop: 20 }}
              fullWidth
            >
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default CompanyManagement;
