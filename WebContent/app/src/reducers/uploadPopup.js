const default_state = {
  isShow: false,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = default_state, action) => {
  switch (action.type) {
    case "upload_show": {
      return {
          ...state,
          isShow: true,
      }
    }
    case "upload_hide": {
      return default_state
    }

    default: 
    return state
  }
}
