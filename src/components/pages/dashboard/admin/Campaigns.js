import React, { useEffect, useState } from 'react';
import { getAllCampaigns } from '../../../../api/Campaign';
import {useNavigate} from "react-router-dom";

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        getAllCampaigns().then(campaignsData => {
            setCampaigns(campaignsData);
        });
    }, []);

    const onDetailsBtnClicked = (id) => {
        navigate(`/dashboard/campaign/${id}`)
    };
    return (
        <div className="container mt-4">
            <div className="row">
                {campaigns.map(campaign => (
                    <div key={campaign._id} className="col-md-6 mb-4">
                        <div className="card">
                            <img src={campaign.image} className="card-img-top" alt={campaign.title} />
                            <div className="card-body">
                                <h5 className="card-title">{campaign.title}</h5>
                                <p className="card-text">{campaign.description}</p>
                                <div className="progress mb-3">
                                    <div className="progress-bar" role="progressbar" style={{ width: `${campaign.progress}%` }} aria-valuenow={campaign.progress} aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <p className="card-text">Raised: ${campaign.amountRaised} of ${campaign.total}</p>
                                <p className="card-text">NGO: {campaign.ngo.title}</p>
                                <div className={"btn btn-primary"} onClick={() => {
                                    onDetailsBtnClicked(campaign._id)
                                }}>See details</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CampaignList;
