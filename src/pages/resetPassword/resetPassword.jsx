/*global chrome*/
import React, { useEffect, useState } from 'react';
import API from '../../services/API';


const ResetPasswordPage = (props) => {
    const [state, setState] = useState({
        values: {
        },
    })

    const submitForm = (event) => {
        event.preventDefault();
        try {
            API.post('user/forgotPasswordEmail',
                {
                    email: state.values.email
                }
            ).then(response => {
                if (response.data.response_code === 1000) {
                    // //window.location.reload();
                    props.changeAuthPage(6, { "code": response.data.data.number });
                } else {
                    setState(state => ({ ...state, errorMessage: response.data.message }))
                }
            })
        } catch (error) {
            setState(state => ({ ...state, errorMessage: "An error logging in, please try again" }))
        }
    }
    const onChange = (field, event) => {
        let fieldValue = event.target.value
        setState(state => ({
            ...state,
            values: {
                ...state.values,
                [field]: fieldValue
            }
        }))
    }
    const changePage = () => {
        props.changeAuthPage(1);
    }

    return (
        <div>
            <div>
                <div >
                    <div className="image-style">
                        <img src={"https://imgur.com/OghXkTf.png"} alt="logo" className="login-image-center" height="80" />
                    </div>
                    <div>
                        <p className="login-title">SUMOTEX WALLET</p>
                    </div>
                    <div>
                        <p className="login-welcome">Reset your password</p>
                    </div>
                </div>
                <form onSubmit={submitForm}>
                    <div className="input-form">
                        <label className="input-label">Email</label>
                        <input className="input-box" type="text" value={state.values.email} onChange={(e) => onChange('email', e)} placeholder="Type your email" />
                    </div>
                    <p className="error-message">{state.errorMessage}</p>
                    <div id="login-divider">
                        <button type="submit" className="login-button" ><span>Submit</span></button>
                    </div>
                </form>
                <div className="login-bottom-label">
                    <p>Go back? <a className="login-a-label" onClick={() => changePage()}>Login here</a></p>
                </div>
            </div>
        </div>
    )
};

export default ResetPasswordPage;