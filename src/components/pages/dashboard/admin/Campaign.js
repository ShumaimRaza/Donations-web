import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getCampaign } from "../../../../api/Campaign";
import { getImageUrl } from "../../../../helper/Helper";
import ShowCampaignCharts from "./ShowCampaignCharts";

const Campaign = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);

    useEffect(() => {
        getCampaign(id)
            .then(campaignData => {
                setCampaign(campaignData);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    if (!campaign) {
        return <div>Loading...</div>; // Placeholder for loading state
    }

    return (
        <div className="container mt-4">
            <div className='d-flex justify-content-center' style={{ fontSize: "50px", fontWeight: "bolder", color: "#3B71CA", marginBottom: "40px" }}>
                Campaign Title: {campaign.title}
            </div>
            <div className="row">
                <div className="col-md-8">

                    {/* Campaign Image */}
                    <img src={getImageUrl(campaign.image)} alt={campaign.title} className="img-fluid rounded mb-4" />
                </div>
                {/* Donations List */}
                <div className="col-md-4">
                    <h4>Recent Donations</h4>
                    <ul className="list-group">
                        {campaign.donations.length > 0 ? (
                            campaign.donations.map((donation, index) => (
                                <li key={index} className="list-group-item">
                                    {donation.amount} - {donation.donorName}
                                </li>
                            ))
                        ) : (
                            <li className="list-group-item">No donations yet.</li>
                        )}
                    </ul>
                </div>

                <div className="col-md-8">
                    {/* Campaign Description */}
                    <p className="text-justify mb-4" style={{ fontSize: "24px" }}><span style={{ fontWeight: "bold", color: "#3B71CA" }}>Description: </span>{campaign.description}</p>
                    <hr></hr>
                    <h4 style={{ color: "#3B71CA" }}><strong>Current Progress:</strong></h4>
                    {/* Progress Bar */}
                    <div className="progress mb-4">

                        <div className="progress-bar" role="progressbar" style={{ width: `${campaign.progress}%` }}>
                            {campaign.progress}%
                        </div>
                    </div>

                    {/* Amount Raised */}
                    <h4 className="mb-2" style={{ color: "#3B71CA" }}><strong>Amount Raised:</strong> <p style={{ marginLeft: "20px", color: "black" }}>${campaign.amountRaised}</p></h4>

                    {/* Total Goal */}
                    <h4 className="mb-2" style={{ color: "#3B71CA" }}><strong>Total Goal:</strong> <p style={{ marginLeft: "20px", color: "black" }}>${campaign.total}</p></h4>

                </div>
                <div className="col-md-12">
                    <div className='d-flex justify-content-center' style={{ fontSize: "30px", fontWeight: "bolder", color: "#3B71CA", marginBottom: "40px" }}>
                        NGO Details: {campaign.ngo.title}
                    </div>
                    <hr></hr>
                    {/* NGO Details */}
                    <div className="mb-4">
                        <img src={getImageUrl(campaign.ngo.icon)} alt={campaign.ngo.title} className="img-fluid rounded" style={{ maxWidth: '' }} />
                        {/*<p className="mt-2">Zakat Rating: {campaign.ngo.Zakat_Rating}</p>*/}
                    </div>
                </div>

            </div>
            <ShowCampaignCharts campaign={campaign} />
        </div>
    );
};

export default Campaign;
