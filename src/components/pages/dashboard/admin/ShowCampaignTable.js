import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';


const ShowCampaignTable = ({ campaigns }) => {
    return (
        <div className="container mt-4">
            <h1 className="mb-4">Campaigns</h1>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead className="thead-dark">
                    <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Progress</th>
                        <th>Amount Raised</th>
                        <th>Total Needed</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {campaigns.map((campaign) => (
                        <tr key={campaign._id}>
                            <td>{campaign.title}</td>
                            <td>{campaign.type}</td>
                            <td>{campaign.description}</td>
                            <td>${campaign.amountRaised}</td>
                            <td>${campaign.total}</td>
                            <td>{campaign.progress}%</td>
                            <td>{campaign.progress < 100 ? (
                                <i className="bi bi-circle-fill text-warning"></i> // Yellow for in progress
                            ) : (
                                <i className="bi bi-circle-fill text-success"></i> // Green for completed
                            )}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShowCampaignTable;
