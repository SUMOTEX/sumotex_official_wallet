/*global chrome*/
import React, { useEffect, useState } from 'react';
import API from '../../services/API';

const ResetPasswordSecondPage = (props) => {
    const [state, setState] = useState({
        email: props.data.email,
        code: props.data.code,
        values: {
        },
    })

    const submitForm = (event) => {
        event.preventDefault();
        if (state.code == state.values.code) {
            if (state.values.password === state.values.confirmPassword) {
                try {
                    API.post('user/forgotPassword',
                        {
                            email: state.email,
                            password: state.values.password
                        }
                    ).then(response => {
                        if (response.data.response_code === 1000) {
                            // //window.location.reload();
                            props.changeAuthPage(1);
                        } else {
                            setState(state => ({ ...state, errorMessage: response.data.message }))
                        }
                    })
                } catch (error) {
                    setState(state => ({ ...state, errorMessage: "An error logging in, please try again." }))
                }
            } else {
                setState(state => ({ ...state, errorMessage: "Your password don't match, please try again." }))
            }

        } else {
            setState(state => ({ ...state, errorMessage: "Invalid Code, please try again" }))
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
                    <div className="login-image-style">
                        <img src={"https://imgur.com/OghXkTf.png"} alt="logo" className="login-image-center" height="80" />
                    </div>
                    <div>
                        <p className="login-title">METAGUARD</p>
                    </div>
                    <div>
                        <p className="login-welcome">Reset your password</p>
                    </div>
                </div>
                <form onSubmit={submitForm}>
                    <div className="input-form">
                        <label className="input-label">Code</label>
                        <input className="input-box" type="text" value={state.values.code} onChange={(e) => onChange('code', e)} placeholder="Code that was send in your email" />
                    </div>
                    <div className="input-form">
                        <label className="input-label">New Password</label>
                        <input className="input-box" type="text" value={state.values.password} onChange={(e) => onChange('password', e)} placeholder="Type your new password" />
                    </div>
                    <div className="input-form">
                        <label className="input-label">Confirm New Password</label>
                        <input className="input-box" type="text" value={state.values.confirmPassword} onChange={(e) => onChange('confirmPassword', e)} placeholder="Confirm Password" />
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

export default ResetPasswordSecondPage;