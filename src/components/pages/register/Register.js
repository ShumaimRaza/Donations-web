import React, {useState} from 'react';
import {Form, Button, Container, Row, Col, Card, Spinner, Alert} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext";
import './Register.css';
import bg from '../../bg.png'

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [ngoTitle, setNgoTitle] = useState('');
    const [ngoIcon, setNgoIcon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const {currentUser, register} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === 'ngoIcon') {
            setNgoIcon(e.target.files[0]);
        } else {
            switch (name) {
                case 'username':
                    setUsername(value);
                    break;
                case 'email':
                    setEmail(value);
                    break;
                case 'password':
                    setPassword(value);
                    break;
                case 'fullname':
                    setFullname(value);
                    break;
                case 'ngoTitle':
                    setNgoTitle(value);
                    break;
                default:
                    break;
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            const ngo = {username, email, password, fullname, ngoTitle, ngoIcon, role: "NGO"}
            const user = await register(ngo);
            console.log("User Data: ", user);
            navigate("/login");
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (currentUser) {
        navigate("/dashboard");
        return null;
    }

    return (<>
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
                        <Card className="shadow-lg p-4 w-70" style={{ width: 600, backgroundColor: 'rgba(0, 0, 0, 0.2)', color: "white" }}>
                            <Card.Title className="text-center mb-4" style={{ fontSize: "30px", fontWeight: "bolder" }}>REGISTER</Card.Title>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    name="username"
                                    value={username}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <div style={{ marginTop: '20px' }}></div>
                            <Form.Group controlId="fullname">
                                <Form.Label>Owner Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    name="fullname"
                                    value={fullname}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <div style={{ marginTop: '20px' }}></div>
                            <Form.Group controlId="email">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder=""
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <div style={{ marginTop: '20px' }}></div>
                            <Form.Group controlId="password">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder=""
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>


                            <div style={{ marginTop: '20px' }}></div>
                            <Form.Group controlId="ngoTitle">
                                <Form.Label>NGO Title:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    name="ngoTitle"
                                    value={ngoTitle}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <div style={{ marginTop: '20px' }}></div>
                            <Form.Group controlId="ngoIcon" className={"m-1"}>
                                <Form.Label>NGO Icon (Image):</Form.Label>
                                <Form.Control className={"p-1"}
                                              type="file"
                                              accept=".jpg,.jpeg,.png" // Limit file types if needed
                                              name="ngoIcon"
                                              onChange={handleChange}
                                              required
                                />
                            </Form.Group>

                                <div style={{ marginTop: '20px' }}></div>
                                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                                    {loading ? (
                                        <Spinner animation="border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                    ) : (
                                        "Submit"
                                    )}
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
    );
}

export default Register;
