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
import FetchSN from "./fetchSN";
import fetchSN from "./fetchSN";
import {Message, toaster, useToaster} from "rsuite";
import async from "async";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const labels = ['5 hours ago', '3 hours ago', '1 hour ago', '30 min ago', 'Now'];


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


    const {serviceNowData} = FetchSN()
    console.log(serviceNowData)

    const toaster = useToaster();
    const message = (
        <Message showIcon type={'info'} closable>
            Service now data not available.
        </Message>
    );

    const getData = (element) => {
        try{
            if(serviceNowData.data[element] === undefined){
                toaster.push(message)
                return 0
            }
            else{
                return serviceNowData.data[element]
            }}
        catch {
            toaster.push(message)
        }
    }

    return (
        <div className="chart-container" style={{ height: "100%", width: "100%"}}>
            <Bar options={options} data={{
                labels,
                datasets: [
                    {
                        fill: true,
                        label: 'Contact Center',
                        data: [5,5,5,5, getData('contactCenter')],
                        borderColor: 'rgba(157,0,255,0.7)',
                        backgroundColor: '#4942E4',

                    },
                    {
                        label: 'Tier II',
                        data: [5,5,5,5, getData('advanced')],
                        borderColor: 'rgba(255,128,0,0.7)',
                        backgroundColor: '#8696FE',
                        fill: true
                    },
                    {
                        label: 'Triage',
                        data: [5,5,5,5, getData('triage')],
                        borderColor: 'rgba(235,53,53,0.7)',
                        backgroundColor: '#ccbcfc',
                        fill: true
                    },
                ],
            }} />
        </div>
    );
};
export default SNQueueStatChart;
