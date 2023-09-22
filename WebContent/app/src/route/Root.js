import React, { useRef } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../container/LoginPage";
import HomePage from "../container/HomePage";
import { useDispatch, useSelector } from "react-redux"
import { userLogin } from "../actions/userActions";

const Root = () => {
    const { isValidated } = useSelector(state => state.loginReducer)
    const dispatch = useDispatch();
    const validateUser = () => {
        if(isValidated) {
            console.log("store");
            return true;
        }
        if(window.localStorage && window.localStorage.getItem("umbrella")) {
            const info = window.localStorage.getItem("umbrella");
            try {
                const parsedInfo = JSON.parse(info);
                const userInfo = parsedInfo.userInfo || {}
                console.log("cache");
                userLogin(userInfo, false, dispatch);
                return true;
            } catch(err) {
                console.error(err);
            }
        }
        return false;
    }
    return (
        <Switch>
            <Route path="/home" render={() => !validateUser() ? <Redirect to="/:login"></Redirect> : <HomePage />} />
            <Route exact path="/:login" component={Login} />
            <Route exact path="/" render={() => validateUser() ? <Redirect to="/home"></Redirect> : <Redirect to="/:login"></Redirect>} />
        </Switch>
    )
}

export default Root;