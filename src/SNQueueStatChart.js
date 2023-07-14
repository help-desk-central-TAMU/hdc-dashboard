import React, { useContext, useMemo } from 'react';
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
import {ThemeContext} from './ThemeContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const labels = ['5 hours ago', '3 hours ago', '1 hour ago', '30 min ago', 'Now'];

const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Contact Center',
            data: labels.map(() => faker.datatype.number({ min: -0, max: 20 })),
            borderColor: 'rgba(157,0,255,0.7)',
            backgroundColor: '#4942E4',

        },
        {
            label: 'Tier II',
            data: labels.map(() => faker.datatype.number({ min: -0, max: 20 })),
            borderColor: 'rgba(255,128,0,0.7)',
            backgroundColor: '#8696FE',
            fill: true
        },
        {
            label: 'Triage',
            data: labels.map(() => faker.datatype.number({ min: -0, max: 20 })),
            borderColor: 'rgba(235,53,53,0.7)',
            backgroundColor: '#ccbcfc',
            fill: true
        },
    ],
};

const SNQueueStatChart = () => {
    const { theme } = useContext(ThemeContext);
    const text_color = (theme === 'dark') ? "#fff" : "#000000";

    const options = useMemo(() => ({
        maintainAspectRatio: false,
        responsive: true,
        color: text_color,
        plugins: {
            legend: {
                labels: {
                    boxWidth: 40,  // Width of the coloured box
                    padding: 20,  // Spacing between legend items
                    font: {
                        size: 40
                    },
                    color: text_color
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
                color: text_color
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
                    color: text_color
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
                    color: text_color
                },
                ticks: {
                    font: {
                        size: 30,
                        weight: 'bold'
                    },
                    color: text_color
                },
                grid: {
                    color: text_color // Set x-axis grid color to a light color
                }
            }
        }
    }), [theme, text_color]);

    return (
        <div className="chart-container" style={{ height: "100%", width: "100%"}}>
            <Bar options={options} data={data} />
        </div>
    );
};
export default SNQueueStatChart;
