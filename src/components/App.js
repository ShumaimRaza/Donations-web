import React  from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {AuthProvider} from '../context/AuthContext';

// Components
import ProtectedRoute from "./pages/dashboard/ProtectedRoute";
import Login from './pages/login/Login';
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import Home from './pages/home/Home';
import NavBar from "./navbar/Navbar";
import About from './pages/about/About'
import Campaigns from "./pages/dashboard/admin/Campaigns";
import NGOs from "./pages/dashboard/admin/ngo/NGOs";
import AddNGO from "./pages/dashboard/admin/ngo/AddNGO";
import Register from "./pages/register/Register";
import Donations from "./pages/dashboard/admin/Donations";
import Campaign from "./pages/dashboard/admin/Campaign";
import Dashboard from "./pages/dashboard/Dashboard";
import NGOCampaigns from "./pages/dashboard/ngo/campaigns/NGOCampaigns";
import CreateCampaign from "./pages/dashboard/ngo/CreateCampaign";


function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <NavBar />
                    
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<ProtectedRoute />}>
                            <Route exact path="/dashboard" element={<Dashboard />} />
                            <Route exact path="/dashboard/ngos" element={<NGOs />} />
                            <Route exact path="/dashboard/add-ngo" element={<AddNGO />}/>
                            <Route exact path="/dashboard/donations" element={<Donations />}/>
                            <Route exact path="/dashboard/campaigns" element={<Campaigns />} />
                            <Route path="campaign/:id" element={<Campaign />} />
                            <Route path="/dashboard/my/campaigns" element={<NGOCampaigns />} />
                            <Route path="/dashboard/create/campaign" element={<CreateCampaign />} />
                        </Route>
                        <Route path="/about" element={<About />} />
                        {/* Redirect to homepage if no match */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;