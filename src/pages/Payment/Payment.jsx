/*global chrome*/
import React, { useEffect, useState } from 'react';
import API from '../../services/API';

const PaymentPage = (props) => {

    const [state, setState] = useState({
        loading: true,
        pendingVerification: false,
        verificationData: [],
        url: "",
        paidType: 1
    })
    useEffect(() => {
        chrome.storage.local.get(['name'], function (items) {
            setState(state => ({ ...state, username: items.name }))
        })
        chrome.storage.local.get(['email'], function (items) {
            setState(state => ({ ...state, email: items.email }))
        })
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

    const onMakePayment = () => {
        chrome.storage.local.get(["token"], function (items) {
            var authToken = items.token
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': authToken
            }
            try {
                API.post('/paymentStripe/createCheckoutSession', {
                    email: state.email
                }, {
                    "headers": headers
                }
                ).then(response => {
                    if (response.data.response_code === 1000) {
                        window.open(response.data.data.payment_url, '_blank').focus();
                        setState(state => ({ ...state, paidType: 2 }))
                    } else if (response.data.response_code === 2000) {
                        setState(state => ({ ...state, errorMessage: "Seems like your there's an error with the submission, please try again later" }))
                    }
                })
            } catch (error) {
                //setState(state => ({ ...state, errorMessage: "Seems like your token have expired, please retry" }))
            }
        })
    }
    const onVerifyPayment = () => {
        chrome.storage.local.get(["token"], function (items) {
            var authToken = items.token
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': authToken
            }
            try {
                API.post('/user/getUserStatus', {
                    email: state.email
                }, {
                    "headers": headers
                }
                ).then(response => {
                    if (response.data.response_code === 1000) {
                        chrome.storage.local.set({
                            "paid": response.data.data.paid,
                            "account_status": response.data.data.status
                        }, function () {
                            props.changeAuthPage(1)
                        })
                       
                    } else if (response.data.response_code === 2000) {
                        setState(state => ({ ...state, errorMessage: "Seems like your payment did not went through, if you are having issue, please contact us at hello@metaguard.app." }))
                    }
                })
            } catch (error) {
                //setState(state => ({ ...state, errorMessage: "Seems like your token have expired, please retry" }))
            }
        })

    }

    return (
        <div>
            <div className="top-row">
                <div className="home-logo-style" onClick={() => window.open('www.metaguard.app', '_blank')}>
                    <img src={"https://imgur.com/OghXkTf.png"} alt="logo" className="" height="30" />
                    <p className="home-title">Metaguard.app</p>
                </div>
                <div>
                    <button className="logout-button" onClick={() => selectLogOut()}><span>Logout</span></button>
                </div>
            </div>
            <div className="payment-container">
                <h4>Hello {state.username}'s</h4>
                <p>It seems like you have not make your payment, please click on the below to make your payment.</p>
                {state.paidType === 1 ? <button className="pay-button" onClick={() => onMakePayment()}><span>Pay Now</span></button> :
                    <button className="verify-button" onClick={() => onVerifyPayment()}><span>Verify my Payment</span></button>}
            </div>
            <p className="bottom-label">To close/open the plugin, for Macbook(Option +S), on Window is (Alt +S)</p>
        </div >
    )
};

export default PaymentPage;