const default_state = {}

export default (state = default_state, action) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                ...state,
                ...action.info,
                isValidated: true
            }
        }
        case "LOGOFF": {
            return default_state
        }
        default: 
        return state
    }
}