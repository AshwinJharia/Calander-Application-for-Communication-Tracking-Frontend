import React from "react";
import { useNavigate } from "react-router-dom";
import CompanyManagement from "./CompanyManagement";
import CommunicationMethodManagement from "./CommunicationManagement";
import { Button } from "@mui/material";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="mt-5 ml-5">
      <div className="flex w-fit ml-auto mr-4">
        <Button
          className="bg-red-600 text-white px-4 py-2 rounded-md ml-auto mr-4"
          variant="contained"
          color="secondary"
          size="small"
          sx={{
            backgroundColor: "red",
            "&:hover": { backgroundColor: "darkred" },
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <div className="text-4xl font-extrabold capitalize underline mx-auto w-fit">
        ADMIN DASHBOARD
      </div>

      <CompanyManagement />
      <CommunicationMethodManagement />
    </div>
  );
};
export default AdminDashboard;
