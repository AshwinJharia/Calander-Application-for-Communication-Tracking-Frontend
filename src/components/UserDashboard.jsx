import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Container,
  Paper,
  IconButton,
  Fade,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CommunicationModal from "./CommunicationModal";
import CommunicationCalendar from "./CommunicationCalendar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LogoutIcon from '@mui/icons-material/Logout';

const UserDashboard = () => {
  const [communications, setCommunications] = useState([]);
  const [over, setOver] = useState([]);
  const [today, setToday] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState([]);
  const [selected, setSelected] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleCommunicationPerformed = () => {
    const selectedIds = rowSelectionModel.map((id) =>
      id.slice(24, id.length)
    );
    const uniqueCompanies = Array.from(new Set(selectedIds)).map((id) => ({
      name: id,
    }));
    setSelectedCompanyId(uniqueCompanies);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogCommunication = (data) => {
    data.company.forEach((el) => {
      setCommunications((prev) => [
        ...prev,
        {
          company: { name: el.name },
          date: data.date,
          type: { name: data.type },
          notes: data.notes,
        },
      ]);
    });
  };

  const fetchCommsFromAPI = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/communications-user"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching communications:", error);
    }
  };

  const fetchNotificationsFromAPI = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/notifications"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const communicationsData = await fetchCommsFromAPI();
      setCommunications(communicationsData);
      const notifications = await fetchNotificationsFromAPI();
      setOver(notifications.filter((item) => item.type === "overdue"));
      setToday(notifications.filter((item) => item.type === "due today"));
    };
    fetchData();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Company Name",
      width: 200,
      renderCell: (params) => (
        <Typography fontWeight="bold">{params.row.company.name}</Typography>
      ),
    },
    {
      field: "lastCommunications",
      headerName: "Last Communication",
      width: 300,
      renderCell: (params) => (
        <Typography>
          {`${params.row.type.name} - ${new Date(
            params.row.date
          ).toLocaleDateString()}`}
        </Typography>
      ),
    },
    {
      field: "nextCommunication",
      headerName: "Next Communication",
      width: 300,
      renderCell: (params) => {
        const nextDate = new Date(params.row.date);
        nextDate.setDate(nextDate.getDate() + 5);
        return (
          <Typography>
            {`${params.row.type.name} - ${nextDate.toLocaleDateString()}`}
          </Typography>
        );
      },
    },
  ];

  const customCardStyle = {
    background: 'linear-gradient(135deg, #6B8DD6 0%, #8E37D7 100%)',
    color: 'white',
    borderRadius: '15px',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)'
    }
  };

  const customDataGridStyle = {
    border: 'none',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    '& .MuiDataGrid-cell': {
      borderBottom: '1px solid #f0f0f0'
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#f8f9fa',
      borderRadius: '15px 15px 0 0'
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: '20px', background: '#f8f9fa' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box display="flex" alignItems="center" gap={2}>
            <DashboardIcon sx={{ fontSize: 40, color: '#8E37D7' }} />
            <Typography variant="h4" fontWeight="700" color="primary">
              Communication Hub
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ borderRadius: '12px', textTransform: 'none' }}
          >
            Sign Out
          </Button>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={1000}>
              <Card sx={customCardStyle}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <NotificationsActiveIcon />
                    <Typography variant="h6" fontWeight="600">
                      Pending Communications
                    </Typography>
                  </Box>
                  {over.length > 0 ? (
                    over.map((item, idx) => (
                      <Typography key={idx}>
                        {idx + 1}. {item.company.name} - {item.message}
                      </Typography>
                    ))
                  ) : (
                    <Typography>No overdue communications</Typography>
                  )}
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={1500}>
              <Card sx={customCardStyle}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <EventNoteIcon />
                    <Typography variant="h6" fontWeight="600">
                      Today's Schedule
                    </Typography>
                  </Box>
                  {today.length > 0 ? (
                    today.map((item, idx) => (
                      <Typography key={idx}>
                        {idx + 1}. {item.company.name} - {item.message}
                      </Typography>
                    ))
                  ) : (
                    <Typography>No communications due today</Typography>
                  )}
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>

        <Box mt={6}>
          <Typography variant="h5" fontWeight="600" mb={3}>
            Communication History
          </Typography>
          <Box sx={customDataGridStyle}>
            <DataGrid
              rows={communications}
              getRowId={(row) => row._id + row.company.name}
              columns={columns}
              pageSize={5}
              checkboxSelection
              autoHeight
              onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
                setSelected(newRowSelectionModel.length > 0);
              }}
              rowSelectionModel={rowSelectionModel}
              sx={{
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: 'rgba(142, 55, 215, 0.1)',
                  transition: 'background-color 0.3s ease'
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                  padding: '16px',
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#6B8DD6',
                  color: '#fff',
                  fontWeight: '600',
                },
                '& .MuiDataGrid-footerContainer': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            />
          </Box>
          <Button
            variant="contained"
            disabled={!selected}
            onClick={handleCommunicationPerformed}
            sx={{
              mt: 3,
              borderRadius: '12px',
              textTransform: 'none',
              background: 'linear-gradient(135deg, #6B8DD6 0%, #8E37D7 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5B7DC6 0%, #7E27C7 100%)'
              }
            }}
          >
            Log New Communication
          </Button>
        </Box>

        <Box mt={6}>
          <CommunicationCalendar communications={communications} />
        </Box>

        <CommunicationModal
          open={openModal}
          onClose={handleCloseModal}
          onSubmit={handleLogCommunication}
          company={selectedCompanyId}
        />
      </Paper>
    </Container>
  );
};

export default UserDashboard;