import React, { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";
import { getMyCampaigns } from "../../../../../api/Campaign";
import { getImageUrl } from "../../../../../helper/Helper";

const NGOCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        getMyCampaigns().then(campaignsData => {
            setCampaigns(campaignsData);
        });
    }, []);

    const onDetailsBtnClicked = (id) => {
        navigate(`/dashboard/campaign/${id}`)
    };
    return (
        <>
        <div className='d-flex justify-content-center' style={{fontSize: "50px", fontWeight: "bolder", color: "#3B71CA"}}>
            Active Campaigns
        </div>
            {campaigns.length === 0 ? (
                <div className='d-flex justify-content-center align-items-center' style={{marginTop: "200px", fontSize: "20px"}}>

<p style={{font: "50px", fontWeight: ""}}>There are no campaigns running.</p>
                </div>
            ) : (
                <div className="container mt-4">
                    <div className="row">
                        {campaigns.map(campaign => (
                            <div key={campaign._id} className="col-md-6 mb-4">
                                <div className="card">
                                    <img src={getImageUrl(campaign.image)} className="card-img-top" alt={campaign.title} />
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
                </div>)
            }
        </>
    );
};

export default NGOCampaigns;
