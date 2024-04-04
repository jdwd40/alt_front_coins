import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const PriceHistoryGraph = ({ coinId }) => {
    const [priceHistory, setPriceHistory] = useState([]);

    useEffect(() => {
        const fetchPriceHistory = async () => {
            try {
                const response = await fetch(`http://localhost:9001/api/history/${coinId}`);
                const data = await response.json();
                
                const thirtyMinutesAgo = new Date(new Date().getTime() - (30 * 60 * 1000));
                const filteredData = filterDataForThreeMinuteIntervals(data, thirtyMinutesAgo);

                setPriceHistory(filteredData);
            } catch (error) {
                console.error('Error fetching price history:', error);
            }
        };

        fetchPriceHistory();
    }, [coinId]);

    const filterDataForThreeMinuteIntervals = (data, startTime) => {
        let result = [];
        let lastTime = startTime;

        for (let entry of data) {
            const entryTime = new Date(entry.timestamp);
            if (entryTime >= lastTime) {
                result.push(entry);
                lastTime = new Date(entryTime.getTime() + 3 * 60000); // Add 3 minutes
            }
        }

        return result;
    };

    const chartData = {
        labels: priceHistory.map(entry => new Date(entry.timestamp).toLocaleTimeString()),
        datasets: [
            {
                label: 'Price History',
                data: priceHistory.map(entry => entry.price),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return (
        <div>
            <h3>Price History Graph</h3>
            <Line data={chartData} />
        </div>
    );
};

export default PriceHistoryGraph;
