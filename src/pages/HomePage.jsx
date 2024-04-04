import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CoinCard from '../components/CoinCard';
import MarketOverview from '../components/MarketOverview';

const HomePage = () => {
    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:9001/api/coins');
                const data = await response.json();
                setCoins(data);
            } catch (error) {
                console.error('Error fetching coins:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCoins();
    }, []);

    const handleCoinSelect = (coinId) => {
        navigate(`/CoinDetails/${coinId}`);
    };

    if (isLoading) {
        return <div>Loading coins...</div>;
    }

    return (
        <div>
            <MarketOverview />
            <div>
                {coins.map(coin => (
                    <CoinCard
                        key={coin.coin_id}
                        coinData={coin}
                        onCoinSelect={handleCoinSelect}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
