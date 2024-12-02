import React from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  console.log(allowedRoles);
  
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  if (!token || !allowedRoles.includes(role)) {
    return (
      <div className="mt-20 items-center justify-center align-middle w-fit mx-auto">
        <h1 className="text-4xl font-bold ">Unauthorized Access!</h1>{" "}
        <div className="w-fit mx-auto mt-4">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              navigate("/");
            }}
            className="w-fit text-white bg-red-600 rounded-md px-4 py-2 mx-auto  hover:bg-red-800"
          >
            Back to login
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;