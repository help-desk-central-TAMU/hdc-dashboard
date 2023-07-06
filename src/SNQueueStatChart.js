import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {faker} from "@faker-js/faker";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    maintainAspectRatio: false,
    responsive: true,
    color: 'white',
    plugins: {
        legend: {
            labels: {
                boxWidth: 40,  // Width of the coloured box
                padding: 20,  // Spacing between legend items
                font: {
                    size: 40
                },
                color: "#cecece"
            },
            position: 'top',
        },
        title: {
            display: true,
            text: 'Open tickets in all queues',
            font: {
                size: 30,
                weight: 'bold'
            },
            color: 'white'
        }
    },
    scales: {
        x: {
            stacked: true,
            ticks: {
                font: {
                    size: 30,
                    weight: 'bold'
                },
                color: '#cecece'
            }
        },
        y: {
            stacked: true,
            title: {
                display: true,
                text: 'Tickets',
                font: {
                    size: 30,
                    weight: 'bold'
                },
                color: '#cecece'
            },
            ticks: {
                font: {
                    size: 30,
                    weight: 'bold'
                },
                color: '#cecece'
            },
            grid: {
                color: 'rgb(255,255,255)' // Set x-axis grid color to a light color
            }
        }
    }
};

const labels = ['1 hour ago', '45 min ago', '30 min ago', '15 min ago', 'Now'];

export const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Contact Center',
            data: labels.map(() => faker.datatype.number({ min: -0, max: 20 })),
            borderColor: 'rgba(157,0,255,0.7)',
            backgroundColor: 'rgba(157,0,255,0.7)',

        },
        {
            label: 'Tier II',
            data: labels.map(() => faker.datatype.number({ min: -0, max: 20 })),
            borderColor: 'rgba(255,128,0,0.7)',
            backgroundColor: 'rgba(255,128,0,0.7)',
            fill: true
        },
        {
            label: 'Triage',
            data: labels.map(() => faker.datatype.number({ min: -0, max: 20 })),
            borderColor: 'rgba(235,53,53,0.7)',
            backgroundColor: 'rgba(255,0,0,0.7)',
            fill: true
        },
    ],
};

const SNQueueStatChart = () => {
    return (
        <div className="chart-container" style={{ height: "100%", width: "100%"}}>
            <Bar options={options} data={data} />
        </div>
    );
};
export default SNQueueStatChart