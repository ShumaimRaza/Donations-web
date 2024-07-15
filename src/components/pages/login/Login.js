import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import './Login.css';
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import bg from '../../bg.png'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { currentUser, login } = useAuth();
    const navigate = useNavigate()
    const [isHovered, setIsHovered] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            const user = await login(email, password);
            console.log("User Data: ", user)
            navigate("/dashboard")
        } catch (err) {
            setError(err.message);
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterBtn = (evt) => {
        evt.preventDefault();
        navigate("/register")
    }

    if (currentUser) {
        navigate("/dashboard")
        return null;
    }


    return (
        <>
            <div style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh',
            }}>

                <Container className="d-flex justify-content-center align-items-center vh-100">
                    <Row>
                        <Col md={12} className="d-flex justify-content-center align-items-center">
                            <h1 className="text-primary font-bold text-3xl" style={{ fontSize: "50px", fontWeight: "bolder" }}>DONOSPHERE</h1>

                        </Col>
                        <Col md={12} className="d-flex justify-content-center align-items-center">
                            <h1 className="text-7xl font-bold text-white">
                                Give Hope, Change Lives
                            </h1>
                        </Col>
                        <Col md={12} className="d-flex justify-content-center align-items-center">
                            <p className="text-3xl text-white">
                                Join our mission, and change a life.
                            </p>
                        </Col>
                        <Col md={12} className="d-flex justify-content-center align-items-center">
                            <Card className="shadow-lg p-4 w-70" style={{ width: 500, backgroundColor: 'rgba(0, 0, 0, 0.2)', color: "white" }}>
                                <Card.Title className="text-center mb-4" style={{fontSize: "30px", fontWeight: "bolder"}}>LOGIN</Card.Title>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email/Phone:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <div style={{ marginTop: '20px' }}></div>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder=""
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <div style={{ marginTop: '15px' }}></div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div onClick={handleRegisterBtn}
                                            onMouseEnter={() => setIsHovered(true)} // Add hover state
                                            onMouseLeave={() => setIsHovered(false)}
                                            style={{
                                                cursor: 'pointer', // Make it look clickable
                                                color: isHovered ? 'blue' : 'green', // Change color on hover
                                                textDecoration: isHovered ? 'underline' : 'none', // Add underline
                                                fontSize: "20px", fontWeight: "bold",
                                            }}
                                            className='text-primary'>
                                            Forgot Password
                                        </div>
                                    </div>
                                    <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
                                        {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
                                    </Button>
                                    {/*
                                    <div className={"d-inline-flex"}>
                                        Are you an NGO,
                                        <div
                                            onClick={handleRegisterBtn}
                                            onMouseEnter={() => setIsHovered(true)} // Add hover state
                                            onMouseLeave={() => setIsHovered(false)}
                                            style={{
                                                cursor: 'pointer', // Make it look clickable
                                                color: isHovered ? 'blue' : 'green', // Change color on hover
                                                textDecoration: isHovered ? 'underline' : 'none', // Add underline
                                            }}
                                        >
                                            Register now
                                        </div>
                                    </div>
                                    */}
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/*
        <div className="relative h-[150vh] sm:h-screen w-full -z-50" style={{ backgroundImage: `url(${bg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'}}>
      
      <div className="bg-[#f2f2f2] w-full p-10">
        <h1 className="text-primary font-bold text-3xl">DONOSPHERE</h1>
      </div>
      <div className="flex flex-col sm:items-center sm:justify-center gap-10 mt-20 p-5">
        <h1 className="text-7xl font-bold text-white">
          Give Hope, Change Lives
        </h1>
        <p className="text-3xl text-white">
          Join our mission, and change a life.
        </p>
        <h1 className="text-5xl font-bold text-white">Login</h1>
        <div>
          <p className="text-white mb-2"> Email</p>
          <input
            className="p-3 rounded-lg  w-full sm:w-[400px] "
            type="email"
            placeholder="Enter Your Email"
          />
        </div>
        <div className="flex sm:items-end flex-col">
          <div>
            <p className="text-white mb-2"> Password</p>
            <input
              className="p-3 rounded-lg  w-full sm:w-[400px]   "
              type="password"
              placeholder="Enter Your Password"
            />
          </div>

          <a href={"/"} className="text-[#02a7f0]">
            Forgot Password
          </a>
        </div>
        <button className="bg-[#1e98d7] text-white rounded-lg p-3 w-full sm:w-[400px]  ">
          Submit{" "}
        </button>
      </div>
    </div>
*/}
        </>

    );
}

export default Login;
