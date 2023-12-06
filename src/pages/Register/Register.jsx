/*global chrome*/
import React, { useEffect, useState } from 'react';
import API from '../../services/API';
import HomePage from '../Home/Home';

const RegisterPage = (props) => {
    const [state, setState] = useState({
        pageLoad: true,
        values: {
        },
    })

    const submitRegisterForm = (event) => {
        event.preventDefault();
        console.log(state.values)
        if (state.values.password === state.values.confirmPassword && state.values.password !== "") {
            if (state.values.email !== "") {
                if (state.values.first_name !== "" && state.values.last_name !== "") {
                    try {
                        API.post('user/register',
                            {
                                email: state.values.email,
                                password: state.values.password,
                                first_name: state.values.first_name,
                                last_name: state.values.last_name
                            }
                        ).then(response => {
                            if (response.data.response_code === 1000) {
                                props.changeAuthPage(3, { "email": state.values.email });
                                //window.location.reload();
                            } else {
                                setState(state => ({ ...state, errorMessage: response.data.message }))

                            }
                        })
                    } catch (error) {
                        setState(state => ({ ...state, errorMessage: "An error registering in, please try again" }))
                    }
                } else {
                    setState(state => ({ ...state, errorMessage: "You can't leave your name blank" }))
                }

            } else {
                setState(state => ({ ...state, errorMessage: "You must insert a valid email" }))
            }

        } else {
            setState(state => ({ ...state, errorMessage: "Your password does not match" }))
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
    const changeRegisterPage = () => {
        props.changeAuthPage(1);
    }
    return (
        <div>
            <div>
                <div >
                    <div className="register-image-style">
                        <img src={"https://imgur.com/OghXkTf.png"} alt="logo" className="register-image-center" height="80" />
                    </div>
                    <div>
                        <p className="register-title">METAGUARD</p>
                    </div>
                    <div>
                        <p className="register-welcome">Register here today!</p>
                    </div>
                </div>
                <form onSubmit={submitRegisterForm}>
                    <div className="form-name">
                        <div className="input-form">
                            <label className="input-label">First Name</label>
                            <input className="input-box" type="text" value={state.values.first_name} onChange={(e) => onChange('first_name', e)} placeholder="John" />
                        </div>
                        <div className="input-form">
                            <label className="input-label">Last Name</label>
                            <input className="input-box" type="text" value={state.values.last_name} onChange={(e) => onChange('last_name', e)} placeholder="Smith" />
                        </div>
                    </div>
                    <div className="input-form">
                        <label className="input-label">Email</label>
                        <input className="input-box" type="text" value={state.values.email} onChange={(e) => onChange('email', e)} placeholder="Type your email" />
                    </div>
                    <div className="input-form">
                        <label className="input-label">Password</label>
                        <input className="input-box" type="password" value={state.values.password} onChange={(e) => onChange('password', e)} placeholder="Type your password" />
                    </div>
                    <div className="input-form">
                        <label className="input-label">Confirm Password</label>
                        <input className="input-box" type="password" value={state.values.confirmPassword} onChange={(e) => onChange('confirmPassword', e)} placeholder="Retype your password" />
                    </div>
                    <div className="input-form">
                        <label className="container">
                            <label className="tnc-box">By registering, you agree to the <a onClick={()=>window.open("https://terms-and-conditions.metaguard.app")}><u>terms and conditions</u></a> and <a onClick={()=>window.open("https://privacy-policy.metaguard.app")}><u>privacy agreement</u></a> of Metaguard.</label>
                        </label>
                    </div>

                    <p className="register-error-message">{state.errorMessage}</p>
                    <div id="register-divider">
                        <button type="submit" className="register-button" ><span>Register</span></button>
                    </div>
                </form>
                <div className="register-bottom-label">
                    <p>Already have an account? <a className="register-a-label" onClick={() => changeRegisterPage()}>Login here</a></p>
                </div>
            </div>
        </div>
    )
};

export default RegisterPage;