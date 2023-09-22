import dayjs from 'dayjs'

import {needsOpts} from '../utils/constants'

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
    needs: [],
    navigatorId: '',
    services: [],
    tags: [],
    otherGoal: '',
  },
  defaultActiveStep: 0
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = default_state, action) => {
  switch (action.type) {
    case "add_participant_show": {
      if (action?.info?.needs) {
        const needs = (typeof action?.info?.needs === 'string' ? action?.info?.needs.split(',') : action?.info?.needs)
        const otherNeeds = needs.filter(n => needsOpts.every(no => no.value !== n)) || []

        return {
          ...state,
          isShow: true,
          onAdd: action.onAdd,
          isEditingMode: action.isEditingMode,
          defaultActiveStep: action.defaultActiveStep,
          info: {
            ...action.info,
            needs: otherNeeds ? [...needs, 'Other goals'] : needs,
            otherGoal: otherNeeds.join('')
          },
        }
      }

      return {
        ...state,
        isShow: true,
        onAdd: action.onAdd,
        isEditingMode: action.isEditingMode,
        info: action.info ? action.info : state.info,
        defaultActiveStep: action.defaultActiveStep
      }
    }
    case "add_participant_hide": {
      return default_state
    }

    default: 
    return state
  }
}
