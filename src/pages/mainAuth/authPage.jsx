/*global chrome*/
import React, { useEffect, useState } from 'react';
import API from '../../services/API';
import Login from '../Login/Login';
import Register from '../Register/Register';
import VerifyPage from '../AuthVerify/Verify';
import PaymentPage from '../Payment/Payment';
import HomePage from '../Home/Home';
import SuccessRequestPage from '../successRequest/successRequestPage';
import ResetPasswordSecondPage from "../resetPassword/resetPasswordTwo";
import ResetPasswordPage from '../resetPassword/resetPassword';

const AuthPage = () => {
    const [state, setState] = useState(1)
    const [value, setValue] = useState("")
    useEffect(() => {
        //to prevent it from getting the paid token and change pages
        if (state === 1) {
            chrome.storage.local.get(["token"], function (items) {
                // NOTE: check syntax here, about accessing 'authToken'
                var authToken = items.token
                // if (authToken !== null || authToken !== undefined) {
                //     try {
                //         API.get('user/checkToken',
                //             {
                //                 "headers": {
                //                     token: authToken
                //                 }
                //             }
                //         ).then(response => {
                //             if (response.data.response_code === 1000) {
                //                 chrome.storage.local.get(["paid"], function (items) {
                //                     if (items.paid === 0) {
                //                         setState(4)
                //                     } else if (items.paid === 1) {
                //                         setState(0)
                //                     }
                //                 })
                //             } else if (response.data.response_code === 2000) {
                //                 setState(0)
                //             }
                //         })
                //     } catch (error) {
                //         //setState(state => ({ ...state, errorMessage: "Seems like your token have expired, please retry" }))
                //     }
                // }else{
                //     setState(0)
                // }
            });
        } 
    }, [state])
    const changeAuthPage = (page, values) => {
            setState(page)
            setValue(values)
       
    }
    return (
        <div>
            {state === 0 ? <HomePage changeAuthPage={changeAuthPage} /> :
                state === 1 ? <Login changeAuthPage={changeAuthPage} /> :
                    state === 2 ? <Register changeAuthPage={changeAuthPage} /> :
                        state === 3 && value !== undefined ? <VerifyPage data={value} changeAuthPage={changeAuthPage} /> :
                            state === 4 ? <PaymentPage changeAuthPage={changeAuthPage} /> : null}
        </div>
    )
};

export default AuthPage;