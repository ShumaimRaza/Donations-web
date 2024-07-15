import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { getMyCampaigns } from '../../../../../api/Campaign';
import Chart from 'chart.js/auto';  // Import Chart.js, is needed
import { useAuth } from '../../../../../context/AuthContext';
import "./NGODashboard.css"
import ShowCampaignTable from "../../admin/ShowCampaignTable";
const NGODashboard = () => {
    const [campaigns, setCampaigns] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        // Mock function to simulate API call
        getMyCampaigns().then(campaignData => {
            setCampaigns(campaignData);
        });
    }, []);

    // Function to prepare data for donations by date chart
    const prepareDonationsByDateData = () => {
        const donationsByDate = campaigns.reduce((acc, campaign) => {
            campaign.donations.forEach(donation => {
                const date = new Date(donation.createdAt).toLocaleDateString();
                if (acc[date]) {
                    acc[date] += donation.amount;
                } else {
                    acc[date] = donation.amount;
                }
            });
            return acc;
        }, {});

        const labels = Object.keys(donationsByDate);
        const data = Object.values(donationsByDate);
        return { labels, data };
    };

    const preparePieChartData = () => {
        const ngo = currentUser.ngo;
        const excludedFields = ['_id', 'icon', 'title', '__v'];
        const filteredRatings = Object.entries(ngo).filter(
            ([key, value]) =>
                !excludedFields.includes(key) &&
                key.endsWith('_Rating') &&
                typeof value === 'number'
        );
        const labels = filteredRatings.map(([key, _]) => key.replace('_Rating', '')); // Extract rating names
        const data = filteredRatings.map(([_, value]) => value);
        return { labels, data };
    };

    const prepareClicksByDateData = () => {
        const allClicks = campaigns.reduce((accumulator, campaign) => {
            return accumulator.concat(campaign.clicks);
        }, []);

        const mergedData = allClicks.reduce((accumulator, click) => {
            const date = click.date;
            const count = click.count;

            if (!accumulator[date]) {
                accumulator[date] = 0;
            }
            accumulator[date] += count;

            return accumulator;
        }, {});

        const labels = Object.keys(mergedData).sort();
        const data = labels.map(date => mergedData[date]);

        return { labels, data };
    };


    const donationsByDateData = prepareDonationsByDateData();
    const clicksByDateData = prepareClicksByDateData();
    const pieChartData = preparePieChartData();

    // Set a common options object with a fixed aspect ratio for both charts
    const commonOptions = {
        aspectRatio: 1, // 1:1 aspect ratio (adjust as needed)
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <>
            <div className='d-flex justify-content-center' style={{ fontSize: "50px", fontWeight: "bolder", color: "#3B71CA" }}>
                Analytics
            </div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Clicks by Date</h3>
                        <div className="chart-container">
                            <Line
                                data={{
                                    labels: clicksByDateData.labels,
                                    datasets: [
                                        {
                                            label: 'Clicks',
                                            data: clicksByDateData.data,
                                            fill: false,
                                            borderColor: 'rgba(54, 162, 235, 0.6)',
                                            tension: 0.1,
                                        },
                                    ],
                                }}
                                options={commonOptions}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3>NGO Ratings</h3>
                        <div className="chart-container">
                            <Pie
                                data={{
                                    labels: pieChartData.labels,
                                    datasets: [
                                        {
                                            data: pieChartData.data,
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.6)',
                                                'rgba(54, 162, 235, 0.6)',
                                                'rgba(255, 206, 86, 0.6)',
                                                'rgba(75, 192, 192, 0.6)',
                                            ],
                                            hoverOffset: 4,
                                        },
                                    ],
                                }}
                                options={commonOptions}
                            />
                        </div>
                    </div>
                    <ShowCampaignTable campaigns={campaigns} />
                </div>
            </div>
        </>
    );
};

export default NGODashboard;
