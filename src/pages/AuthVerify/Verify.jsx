/*global chrome*/
import React, { useEffect, useState } from 'react';
import API from '../../services/API';


const VerifyPage = (props) => {
    const [state, setState] = useState({
        code: "12",
        values: {
        },
        email: props.data.email,
        name:props.data.last_name
    })
    useEffect(() => {
        if (state.email !== undefined) {
            try {
                API.post('user/verifyAccountEmail',
                    {
                        email: state.email
                    }
                ).then(response => {
                    if (response.data.response_code === 1000) {
                        setState(state => ({ ...state, code: response.data.data.number }))
                    } else {
                        setState(state => ({ ...state, errorMessage: response.data.message }))
                    }
                })
            } catch (error) {
                setState(state => ({ ...state, errorMessage: "An error submitting data" }))
            }
        }
    }, [state.email])

    const submitVerifyForm = (event) => {
        event.preventDefault();
        if (state.values.userCode == state.code) {
            try {
                API.post('user/verifyAccount',
                    {
                        email: state.email
                    }
                ).then(response => {
                    if (response.data.response_code === 1000) {
                         props.changeAuthPage(1)
                        // //window.location.reload();
                    } else {
                        setState(state => ({ ...state, errorMessage: response.data.message }))
                    }
                })
            } catch (error) {
                setState(state => ({ ...state, errorMessage: "An error verifying, please try again" }))
            }
        } else {
            setState(state => ({ ...state, errorMessage: "Wrong verification code, please try again" }))
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
    const requestVerificationAgain = () => {
        try {
            API.post('user/forgotPasswordEmail',
                {
                    email: state.email
                }
            ).then(response => {
                if (response.data.response_code === 1000) {
                    setState(state => ({ ...state, code: response.data.data.number }))
                } else {
                    setState(state => ({ ...state, errorMessage: response.data.message }))
                }
            })
        } catch (error) {
            setState(state => ({ ...state, errorMessage: "An error submitting data" }))
        }
    }
    return (
        <div>
            {state.pageLoad ? null :
                <div>
                    <div >
                        <div className="login-image-style">
                            <img src={"https://imgur.com/OghXkTf.png"} alt="logo" className="login-image-center" height="80" />
                        </div>
                        <div>
                            <p className="login-title">METAGUARD</p>
                        </div>
                        <div>
                            <p className="login-welcome">Verify your account here!</p>
                        </div>
                    </div>
                    <form onSubmit={submitVerifyForm}>
                        <p>We have send you an email, if its not in your inbox, please check your junk/spam</p>
                        <div className="input-form">
                            <label className="input-label">Code</label>
                            <input className="input-box" type="number" value={state.values.userCode} onChange={(e) => onChange('userCode', e)} placeholder="Type the code that was send to you" />
                        </div>
                        <p className="error-message">{state.errorMessage}</p>
                        <div id="login-divider">
                            <button type="submit" className="login-button" ><span>Submit</span></button>
                        </div>
                        <div className="login-bottom-label">
                            <p>Didn't receives it? <a className="login-a-label" onClick={() => requestVerificationAgain()}>Request again here</a></p>
                        </div>
                    </form>

                </div>}
        </div>
    )
};

export default VerifyPage;