import React, { useEffect, useState, useRef } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import {getAllCampaigns} from "../../../../api/Campaign";
import {getAllDonations} from "../../../../api/Donations";
import {getAllNGO} from "../../../../api/NGO";
import ShowCampaignTable from "./ShowCampaignTable";

ChartJS.register(
    ArcElement, Tooltip, Legend,
    CategoryScale, LinearScale, BarElement, Title
);

const AdminDashboard = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [donations, setDonations] = useState([]);
    const [ngos, setNGOs] = useState([]);
    const [pieChartData, setPieChartData] = useState({});
    const [barChartData, setBarChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                display: true,
            },
            title: {
                display: true,
                text: 'Donation Charts'
            }
        },
        events: [],
        maintainAspectRatio: false,
    };

    const pieChartColors = [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
    ];

    useEffect(() => {
        setLoading(true);
        setError(null);

        Promise.all([
            getAllCampaigns(),
            getAllDonations(),
            getAllNGO()
        ])
            .then(([campaignsData, donationsData, ngosData]) => {
                setCampaigns(campaignsData || []);
                setDonations(donationsData || []);
                setNGOs(ngosData || []);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setError("Failed to load data. Please try again later.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    useEffect(() => {
        // Pie Chart Data (with empty state check)
        const campaignTypeCount = donations.reduce((acc, donation) => {
            const type = donation.campaign?.type;
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});

        setPieChartData(campaignTypeCount ? {
            labels: Object.keys(campaignTypeCount),
            datasets: [{ data: Object.values(campaignTypeCount) }]
        } : {});

        const campaignDonations = donations.reduce((acc, donation) => {
            const campaignId = donation.campaign?._id;
            const campaignTitle = donation.campaign?.title || "Unknown Campaign";
            acc[campaignTitle] = (acc[campaignTitle] || 0) + (donation.amount || 0);
            return acc;
        }, {});

        const barColors = campaigns.map((campaign, index) => {
            return pieChartColors[index % pieChartColors.length];
        });

        setBarChartData(campaigns.length > 0 ? {
            labels: campaigns.map(campaign => campaign.title),
            datasets: [{
                label: 'Amount Raised',
                data: campaigns.map(campaign => campaignDonations[campaign.title] || 0),
                backgroundColor: barColors
            }]
        } : {});
    }, [donations, campaigns]);

    useEffect(() => {
        if (pieChartData.datasets) {
            pieChartData.datasets[0].backgroundColor = pieChartColors;
        }
    }, [pieChartData]);

    return (
        <div className="container mt-4">
            <h2>Donations Dashboard</h2>
            <div className="row mt-4 d-flex align-items-start"> {/* Align charts to top */}
                <div className="col-md-6 chart-container"> {/* Add a container for styling */}
                    <h3>Pie Chart: Donations by Campaign Type</h3>
                    {pieChartData.datasets?.[0]?.data?.length > 0 ? (
                        <Pie data={pieChartData} options={chartOptions} />
                    ) : (
                        <p>No data available for pie chart.</p>
                    )}
                </div>

                <div className="col-md-6 chart-container">
                    <h3>Bar Chart: Amount Raised per Campaign</h3>
                    {barChartData.datasets?.[0]?.data?.length > 0 ? (
                        <Bar data={barChartData} options={chartOptions} />
                    ) : (
                        <p>No data available for bar chart.</p>
                    )}
                </div>
            </div>
            <ShowCampaignTable campaigns={campaigns}/>
        </div>
    );
};


export default AdminDashboard;
