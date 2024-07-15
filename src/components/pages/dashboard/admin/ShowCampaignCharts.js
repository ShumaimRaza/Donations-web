import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';

const ShowCampaignCharts = ({ campaign }) => {
    const { title, ngo } = campaign;

    // Data for Pie Chart
    const pieData = {
        labels: ['Zakat', 'Fitrana', 'Sadqa', 'Fidya'],
        datasets: [
            {
                label: 'NGO Ratings',
                data: [
                    ngo.Zakat_Rating,
                    ngo.Fitrana_Rating,
                    ngo.Sadqa_Rating,
                    ngo.Fidya_Rating,
                ],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    // Data for Bar Chart
    const barData = {
        labels: Object.keys(ngo).filter(key => key.endsWith('_Rating')),
        datasets: [
            {
                label: 'NGO Ratings',
                backgroundColor: '#FF6384',
                borderColor: '#FF6384',
                borderWidth: 1,
                hoverBackgroundColor: '#36A2EB',
                hoverBorderColor: '#36A2EB',
                data: Object.values(ngo).filter(val => typeof val === 'number'),
            },
        ],
    };

    return (
        <div className="container mt-4">
            <h1 style={{color: "#3B71CA"}}>Analytics</h1>
            <div className="row">
                <div className="col">
                    <Pie data={pieData} />
                </div>
                <div className="col">
                    <Bar data={barData} />
                </div>
            </div>
        </div>
    );
};

export default ShowCampaignCharts;
