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
                setPriceHistory(data);
            } catch (error) {
                console.error('Error fetching price history:', error);
            }
        };

        fetchPriceHistory();
    }, [coinId]);

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
