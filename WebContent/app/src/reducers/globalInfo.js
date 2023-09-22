const default_state = {
  navigators: {},
  organizations: [],
  notification: {},
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = default_state, action) => {
  switch (action.type) {
    case "update_global_info": {
      return {
          ...state,
          navigators: action.navigators.reduce((acc, nav) => {
            acc[nav.navigatorId] = nav

            return acc
          }, {}),
          organizations: action.organizations,
      }
    }
    case "global_update_organization": {
      return {
        ...state,
        organizations: action.organizations
      }
    }

    case "global_update_notification": {
      return {
        ...state,
        notification: action.notification
      }
    }

    default: 
    return state
  }
}