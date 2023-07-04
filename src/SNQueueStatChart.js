import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export const options = {
    maintainAspectRatio: false,
    responsive: true,
    color: 'white',
    plugins: {
        legend: {
            font: {
                size: 30,
                weight: 'bold'
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
            ticks: {
                font: {
                    size: 30,
                    weight: 'bold'
                },
                color: 'white'
            },
            grid: {
                color: 'rgb(255,255,255)' // Set x-axis grid color to a light color
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
             color: 'white'
            },
            ticks: {
                font: {
                    size: 30,
                    weight: 'bold'
                },
                color: 'white'
            },
            grid: {
                color: 'rgb(255,255,255)' // Set x-axis grid color to a light color
            }
        }
    }
};

const labels = ['-1 hour', '-45 min', '-30 min', '-15 min', '0 min'];

export const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: -0, max: 20 })),
            borderColor: 'rgba(157,0,255,0.99)',
            backgroundColor: 'rgba(157,0,255,0.99)',

        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: -0, max: 20 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            fill: true
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: -0, max: 20 })),
            borderColor: 'rgb(235,53,53)',
            backgroundColor: 'rgba(255,0,0,0.5)',
            fill: true
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: -0, max: 20 })),
            borderColor: 'rgb(0,107,31)',
            backgroundColor: 'rgba(10,134,0,0.5)',
            fill: true
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: -0, max: 20 })),
            borderColor: 'rgb(255,96,0)',
            backgroundColor: 'rgba(234,111,0,0.5)',
            fill: true
        },
    ],
};

const SNQueueStatChart = () => {
    return (
        <div className="chart-container" style={{ height: "100%", width: "100%"}}>
            <Line data={data} options={options} />
        </div>
    );
};
export default SNQueueStatChart