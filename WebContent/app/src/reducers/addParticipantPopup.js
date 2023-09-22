import dayjs from 'dayjs'

const default_state = {
  isShow: false,
  onAdd: undefined,
  isEditingMode: false,
  info: {
    firstname: '',
    lastname: '',
    gender: 'female',
    birthday: dayjs(),
    email: '',
    phone: '',
    needs: '',
    navigatorId: '',
    services: [],
    tags: [],
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = default_state, action) => {
  switch (action.type) {
    case "add_participant_show": {
      return {
        ...state,
        isShow: true,
        onAdd: action.onAdd,
        isEditingMode: action.isEditingMode,
        info: action.info
      }
    }
    case "add_participant_hide": {
      return default_state
    }

    default: 
    return state
  }
}