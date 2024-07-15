import React, {useEffect, useState} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from "../../../context/AuthContext";
import UnAuthorized from "../../errors/UnAuthorized";
import SideNavBar from "./admin/sidebar/SideNavBar";

export default function ProtectedRoute() {
    const {currentUser, getCurrentUser} = useAuth()
    const [loading, setLoading] = useState(false)
    console.log(currentUser)
    return (
        <div className="protected-route-container">  {/* Added container for layout */}
            {loading ? (
                <>Connecting to server...</>
            ) : currentUser ? (
                (currentUser.role !== "Manager"
                    && currentUser.role !== "NGO") ? (
                    <UnAuthorized/>
                ) : (
                    <>
                        <SideNavBar/>
                        <div className="protected-content" style={{marginLeft: "13%"}}>
                            <Outlet/>
                        </div>
                    </>
                )
            ) : (
                <Navigate to="/login"/>
            )}
        </div>
    );
};


