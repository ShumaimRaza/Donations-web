import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { createCampaignApi } from '../../../../api/Campaign';
import { Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';

const CreateCampaign = () => {
    const { currentUser } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [image, setImage] = useState(null); // image is a file
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [type, setType] = useState('Zakat');
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleAmountChange = (e) => setAmount(e.target.value);
    const handleImageChange = (e) => setImage(e.target.files[0]);
    const handleTypeChange = (e) => setType(e.target.value);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await createCampaignApi(title, description, amount, type, image);
            alert("Campaign added")
        } catch (err) {
            setError('Failed to create campaign');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className='d-flex justify-content-center' style={{ fontSize: "50px", fontWeight: "bolder", color: "#3B71CA", marginBottom: "40px" }}>
                        Create a Campaign
                    </div>
                    <div className="card p-4" style={{ width: "120%" }}>
                        <h2 className="mb-4">Create Campaign</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group style={{ margin: "10px" }} controlId="formTitle">
                                        <Form.Label>Title:</Form.Label>
                                        <Form.Control type="text" placeholder="" value={title}
                                            onChange={handleTitleChange} required />
                                    </Form.Group>
                                </Col><Col md={6}>
                                    <div style={{ marginTop: '43px' }}></div>
                                    <Form.Group style={{}} controlId="formType">
                                        <Form.Label>Type: </Form.Label>
                                        <Form.Select value={type} onChange={handleTypeChange} required style={{ marginLeft: "10px", padding: "5px", color: "#3B71CA" }}>
                                            <option value="Zakat">Zakat</option>
                                            <option value="Fitrana">Fitrana</option>
                                            <option value="Sadqa">Sadqa</option>
                                            <option value="Fidya">Fidya</option>
                                            <option value="Flood_Relief">Flood Relief</option>
                                            <option value="Ramazan_Package">Ramazan Package</option>
                                            <option value="Kaffara">Kaffara</option>
                                            <option value="Earthquake">Earthquake</option>
                                            <option value="Khairat">Khairat</option>
                                            <option value="Orphan_Care">Orphan Care</option>
                                            <option value="Khummas">Khummas</option>
                                            <option value="Education">Education</option>
                                            <option value="Marriage">Marriage</option>
                                            <option value="Old_Age_Home">Old Age Home</option>
                                            <option value="Aqiqah">Aqiqah</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div style={{ marginTop: '20px' }}></div>
                            <Form.Group style={{ margin: "10px" }} controlId="formDescription">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="" value={description}
                                    onChange={handleDescriptionChange} required />
                            </Form.Group>

                            <div style={{ marginTop: '20px' }}></div>
                            <Form.Group style={{ margin: "10px" }} controlId="formAmount">
                                <Form.Label>Amount Needed (In Rupees):</Form.Label>
                                <Form.Control type="number" placeholder="" value={amount}
                                    onChange={handleAmountChange} required />
                            </Form.Group>

                            <div style={{ marginTop: '20px' }}></div>
                            <Form.Group style={{ margin: "10px", padding: "" }} controlId="formImage">
                                <Form.Label>Image</Form.Label>
                                <Form.Control style={{ paddingTop: "20px", paddingBottom: "50px" }} type="file" onChange={handleImageChange} required />
                            </Form.Group>

                            <div style={{ marginTop: '20px' }}></div>
                            <div className='d-flex justify-content-center align-items-center'>
                            <Button variant="primary" type="submit" disabled={loading} className="mt-3" style={{paddingLeft: "60px", paddingRight: "60px"}}>
                                {loading ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" role="status"
                                            aria-hidden="true" />
                                        <span className="visually-hidden">Loading...</span>
                                    </>
                                ) : (
                                    'Submit'
                                )}
                            </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCampaign;
