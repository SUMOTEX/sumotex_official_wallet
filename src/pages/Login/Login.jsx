/*global chrome*/
import React, { useState } from 'react';
const CreateWallet = (props) => {
    const [state, setState] = useState({
        values: {
            public_key:""
        },
    })

    const submitForm = (event) => {
        event.preventDefault();
        chrome.runtime.sendMessage({ action: 'createWallet' }, function(response) {
            if (chrome.runtime.lastError) {
                // Handle error or no response scenario
                console.log("Error or no response:", chrome.runtime.lastError.message);
                return;
            }
            var obj = {};       
            var key = response['result']['result']['wallet_address'];  
            obj[key] += response['result']['result']['private_key']; 
 
            chrome.storage.local.set(obj);
            chrome.storage.local.set({"wallet_address":response['result']['result']['private_key']});
            changePage(0);
        });
    }
    const onChange = (field, fieldValue) => {
        setState(state => ({
            ...state,
            values: {
                ...state.values,
                [field]: fieldValue
            }
        }))
    }
    const changePage = (pageNumber) => {
        props.changeAuthPage(pageNumber);
    }
    return (
        <div>
            <div>
                <div >
                    <div className="login-image-style">
                        <img src={"https://imgur.com/VH6nMzb.png"} alt="logo" className="login-image-center" height="120" />
                    </div>
                    <div>
                        <p className="login-title">SUMOTEX WALLET</p>
                    </div>
                </div>
                <form onSubmit={submitForm}>
                    <p className="error-message">{state.errorMessage}</p>
                    <div id="login-divider">
                        <button type="submit" className="login-button" ><span>Create Wallet</span></button>
                    
                    </div>
                    <p className="error-message">{state.values.public_key}</p>
                </form>
                {/* <div className="login-bottom-label">
                    <p>Don't have an account? <a className="login-a-label" onClick={() => changePage(2)}>Sign up here</a></p>
                </div> */}
            </div>
        </div>
    )
};

export default CreateWallet;