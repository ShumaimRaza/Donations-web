import React, { useEffect, useState } from 'react';
import { getAllDonations } from "../../../../api/Donations";

const Donations = () => {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        getAllDonations().then(donationsData => {
            setDonations(donationsData);
        });
    }, []);

    return (
        <div className="container-fluid mt-4">
            <h2>Donations</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Donor Name</th>
                    <th>Email</th>
                    <th>Amount</th>
                    <th>Campaign Title</th>
                    <th>Campaign Type</th>
                    <th>Payment Method</th>
                    <th>Donation Date</th>
                </tr>
                </thead>
                <tbody>
                {donations.map(donation => (
                    <tr key={donation._id}>
                        <td>{donation.donor.fullname}</td>
                        <td>{donation.donor.email}</td>
                        <td>${donation.amount}</td>
                        <td>{donation.campaign.title}</td>
                        <td>{donation.campaign.type}</td>
                        <td>{donation.paymentMethod}</td>
                        <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Donations;
