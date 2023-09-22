const default_state = {
  isShow: false,
  severity: 'success',
  msg: '',
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = default_state, action) => {
  switch (action.type) {
    case "alert_show":    
     {
      return {
          ...state,
          isShow: true,
          ...action.props,
      }
    }
    case "alert_hide": {
      return default_state
    }

    default: 
    return state
  }
}
