const default_state = {
  isShow: false,
  onAdd: undefined,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = default_state, action) => {
  switch (action.type) {
    case "add_organization_show": {
      return {
          ...state,
          isShow: true,
          onAdd: action.onAdd,
      }
    }
    case "add_organization_hide": {
      return default_state
    }

    default: 
    return state
  }
}