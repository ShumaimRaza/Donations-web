import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Image } from 'react-bootstrap';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import './Navbar.css';
import { useAuth } from "../../context/AuthContext";
import ProfilePicture from "../../asset/profile.png"
import logo from '../logo.png';

function NavBar() {
    const location = useLocation();
    const { currentUser, logout } = useAuth()

    const navigate = useNavigate()
    const onLogoutBtnClicked = async (evt) => {
        evt.preventDefault();
        try {
            await logout();
            navigate("/home")
        } catch (err) {
            console.log(err)
        }
    };


    return (
        <Navbar bg="light" variant="light" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/" style={{ fontSize: "25px", fontWeight: "bolder" }}>
                    <img
                        alt=""
                        src={logo}
                        width=""
                        height="55"
                        className="d-inline-block align-top"
                    />{' '}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        {currentUser ? (
                            <>
                            <div style={{marginLeft: "40px"}}></div>
                                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                                <div style={{marginLeft: "20px"}}></div>
                                <Nav.Link onClick={onLogoutBtnClicked} to="/">Logout</Nav.Link>
                                </>
                        ) : (
                            <>
                            <div style={{marginLeft: "40px"}}></div>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <div style={{marginLeft: "20px"}}></div>
                        <Nav.Link as={Link} to="/register" active={location.pathname === '/register'}>Register</Nav.Link>
                        </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;

