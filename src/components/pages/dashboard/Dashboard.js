import React, { useEffect, useState, useRef } from 'react';
import {useAuth} from "../../../context/AuthContext";
import AdminDashboard from "./admin/AdminDashboard";
import NGODashboard from "./ngo/analytics/NGODashboard";


const Dashboard = () => {
   const {currentUser} = useAuth()

    return (
        <div className="container mt-4">
            {currentUser.role === "Manager" &&<AdminDashboard/>}
            {currentUser.role === "NGO" &&<NGODashboard/>}
        </div>
    );
};


export default Dashboard;
