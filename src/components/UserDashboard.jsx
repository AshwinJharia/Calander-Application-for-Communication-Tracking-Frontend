import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CommunicationModal from "./CommunicationModal";
import CommunicationCalendar from "./CommunicationCalendar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  return (
    <Box className="p-6 bg-gray-100 min-h-screen">
      <Box className="flex justify-between items-center">
        <Typography variant="h4" className="font-bold text-gray-800">
          User Dashboard
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          className="shadow-lg"
        >
          Logout
        </Button>
      </Box>

      {/* Notifications Section */}
      <Box mt={4} className="space-y-6">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card className="shadow-lg">
              <CardContent>
                <Typography variant="h6" className="font-bold">
                  Overdue Communications
                </Typography>
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className="shadow-lg">
              <CardContent>
                <Typography variant="h6" className="font-bold">
                  Today's Communications
                </Typography>
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
          </Grid>
        </Grid>
      </Box>

      {/* Data Grid Section */}
      <Box mt={6}>
        <Typography variant="h6" className="font-bold mb-4">
          Communication History
        </Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={communications}
            getRowId={(row) => row._id + row.company.name}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
              setSelected(newRowSelectionModel.length > 0);
            }}
            rowSelectionModel={rowSelectionModel}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          disabled={!selected}
          className="mt-4"
          onClick={handleCommunicationPerformed}
        >
          Log Communication
        </Button>
      </Box>

      {/* Calendar Section */}
      <CommunicationCalendar communications={communications} />

      {/* Modal */}
      <CommunicationModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleLogCommunication}
        company={selectedCompanyId}
      />
    </Box>
  );
};

export default UserDashboard;
