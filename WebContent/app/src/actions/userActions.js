export const userLogin = (info, remember, dispatch) => {
    if (remember && window.localStorage) {
        const data = window.localStorage.getItem("umbrella") || {}
        window.localStorage.removeItem("umbrella")
        window.localStorage.setItem("umbrella", JSON.stringify({ userInfo: info }), 30000)
    }
    console.log({ ...info, remember })
    return  dispatch({
        type: "LOGIN",
        info
    })
}

export const userLogoff = (dispatch) => {
    if (window.localStorage) {
        window.localStorage.removeItem("umbrella");
    }
    return dispatch({
        type: 'LOGOFF'
    })
}
