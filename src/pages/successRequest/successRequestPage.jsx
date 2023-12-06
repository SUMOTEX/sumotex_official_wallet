/*global chrome*/
import React, { useEffect } from 'react';

const SuccessRequestPage = (props) => {

    useEffect(() => {
        setTimeout(function () {
            props.changeAuthPage(0)
        }, 1500)
    }, [])
    const selectLogOut = () => {
        chrome.storage.local.clear(function () {
            var error = chrome.runtime.lastError;
            if (error) {
            }
            // do something more
        });
        props.changeAuthPage(1);
    }

    return (
        <div>
            <div className="top-row">
                <div className="home-logo-style" onClick={() => window.open('https://metaguard.app', '_blank')}>
                    <p className="home-title">Metaguard</p>
                </div>
                <div>
                    <button className="logout-button" onClick={() => selectLogOut()}><span>Logout</span></button>
                </div>
            </div>
            Thank you for your request, we will get back to you shortly!
        </div >
    )
};

export default SuccessRequestPage;