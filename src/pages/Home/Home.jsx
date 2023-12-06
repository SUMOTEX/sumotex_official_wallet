/*global chrome*/
import React, { useEffect, useState } from 'react';
import API from '../../services/API';

const HomePage = (props) => {

    const [state, setState] = useState({
        url: ""
    })
    useEffect(() => {
        chrome.storage.local.get(['wallet_address'], function (items) {
            setState(state => ({ ...state, pub_key: items.wallet_address }))
            // chrome.runtime.sendMessage({ 
            //     action: 'getWalletBalance', 
            //     inputBody: {"pub_address": items.wallet_address} 
            // }, function(response) {
            //     if (chrome.runtime.lastError) {
            //         console.log("Error or no response:", chrome.runtime.lastError.message);
            //         return;
            //     }
            //     setState(state => ({ ...state, balance: response }));
            // });
        })
    }, [])


    return (
        <div>
            <div className="top-row">
                <div className="home-logo-style" onClick={() => window.open('www.sumotex.co', '_blank')}>
                    <img src={"https://imgur.com/VH6nMzb.png"} alt="logo" className="" height="60" />
                    <p className="home-title">SUMOTEX Wallet</p>
                </div>
                <div>
                    <button className="logout-button"><span>Settings</span></button>
                </div>
            </div>
            <div className="home-account-detail">
                <p>{state.pub_key}</p>
            </div>
            <div className="home-account-detail">
                <h4>Balance: {state.balance} SMTX</h4>
            </div>
            <div class="button-container">
            <button className="home-button"><span>Create Wallet</span></button>
            <button className="home-button"><span>View Private Key</span></button>
            <button className="home-button"><span>Create Contract</span></button>
            <button className="home-button"><span>Send</span></button>
            </div>
            <div class="home-border">

            </div>
        </div >
    )
};

export default HomePage;