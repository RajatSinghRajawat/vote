import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, LinearScale, CategoryScale, PointElement } from 'chart.js';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import './dash.css';

Chart.register(LineElement, LinearScale, CategoryScale, PointElement);

const Dashboards = () => {
    // Data for the chart
    const data = {
        labels: ['Nov 5', 'Nov 6', 'Nov 7', 'Nov 8', 'Nov 9', 'Nov 10', 'Nov 11', 'Nov 12'],
        datasets: [
            {
                label: 'Bitcoin',
                data: [100, 120, 110, 130, 100, 90, 120, 110],
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="dashboard">

            <div className="statistics">
        <h3>Statistic</h3>
        <Line data={data} options={options} />
      </div>

            <div className="dashboard-row">
                {/* Crypto Marketplace Section */}
                <div className="crypto-marketplace">
                    <h3>Crypto Marketplace</h3>
                    <div className="crypto-item">
                        <FaBitcoin size={20} />
                        <div className="crypto-info">
                            <span>Bitcoin</span>
                            <span>$124</span>
                        </div>
                        <div className="crypto-status">Pending</div>
                    </div>
                    <div className="crypto-item">
                        <FaEthereum size={20} />
                        <div className="crypto-info">
                            <span>Ethereum</span>
                            <span>$432</span>
                        </div>
                        <div className="crypto-status complete">Complete</div>
                    </div>
                </div>

                {/* My Balance Section */}
                <div className="my-balance">
                    <h3>My Balance</h3>
                    <div className="balance-info">
                        <span>Dashing</span>
                        <span>$124,302,111</span>
                        <div className="balance-progress">
                            <div className="progress-bar" style={{ width: '48%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Transfer Section */}
            <div className="quick-transfer -100">
                <h3>Quick Transfer</h3>
                <div className="transfer-card">
                    <div className="transfer-limit">
                        <span>My Limit</span>
                        <span>$592,000</span>
                    </div>
                    <div className="transfer-input">
                        <input type="text" placeholder="Amount" value="$323.00" readOnly />
                        <button>Transfer</button>
                    </div>
                </div>
                <div className="transaction-history">
                    <p>Transactions</p>
                </div>
            </div>
{/* 
            <div style={{height:"40rem" , width:"30rem" , backgroundColor:"blue"}}>

            </div> */}
        </div>

    );
};

export default Dashboards;
