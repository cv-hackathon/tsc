const default_state = {
  isShow: false,
  details: {},
  info: {},
}
  
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = default_state, action) => {
  switch (action.type) {
    case "service_details_show": {
      return {
        ...state,
        isShow: true,
        details: action.service,
        info: action.info,
      }
    }
    case "service_details_hide": {
      return default_state
    }
    case "service_details_update": {
      const details = {...state.details, [action.attribute]: action.value}
      return { ...state, details }
    }

    default: 
    return state
  }
}