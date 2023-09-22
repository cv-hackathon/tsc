import React, {useState, useEffect, Fragment} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import dayjs from 'dayjs'
import {useForm} from "react-hook-form";

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box';

import StepperPanel from './StepperPanel'
import ParticipantBaseInfo from './ParticipantBaseInfo'
import ServicesInfo from './ServicesInfo'
import FinalStep from './FinalStep'
import ResultPanel from './ResultPanel'

import {dayFormat} from '../../utils/constants'
import doFetch from '../../utils/doFetch'

const steps = ['Participant Base Info', 'Plan Services']
const extra_steps = ['Participant Base Info', 'Plan Services', 'Addition Actions']

const buttonSx = {mt: 3, ml: 1}
// const defaultInputs = {
//   firstname: '',
//   lastname: '',
//   gender: 'female',
//   birthday: dayjs(),
//   email: '',
//   // registrationTime: dayjs(),
//   phone: '',
//   needs: '',
//   navigatorId: '',
//   services: [],
//   tags: [],
// }

const popupState = state => ({...state.addParticipant, ...state.globalInfo})

function getStepContent(step, control, title, navigators, organizations, getValues, isEditingMode) {
  switch (step) {
    case 0:
      return <ParticipantBaseInfo control={control} title={title} navigators={navigators} getValues={getValues} />;
    case 1:
      return <ServicesInfo control={control} title={title} organizations={organizations} isEditingMode={isEditingMode} />;
    case 2:
      return <FinalStep control={control} title={title} getValues={getValues} isEditingMode={isEditingMode} />;
    default:
      throw new Error('Unknown step');
  }
}

export default function AddParticipantPopup() {
  const {isShow, onAdd, isEditingMode, navigators, organizations, participantId, info, defaultActiveStep} = useSelector(popupState)
  const [activeStep, setActiveStep] = useState(defaultActiveStep || 0);
  const dispatch = useDispatch()
  const {control, reset, handleSubmit, getValues} = useForm({
    defaultValues: info
  });

  const stepsArr = isEditingMode ? extra_steps : steps

  useEffect(() => {
    reset(info)
  }, [info])

  useEffect(() => {
    setActiveStep(defaultActiveStep || 0)
  }, [defaultActiveStep])

  const onSubmit = data => {
    const {services, ...rest} = data
    let needs = typeof data.needs === 'string' ? data.needs.split(',') : data.needs

    if (needs.includes('Other goals')) {
      needs = [...needs, data.otherGoal].filter(n => n !== 'Other goals')
    }


    const parsedData = {
      ...rest,
      tags: typeof data.tags === 'string' ? data.tags : data.tags.join(','),
      birthday: typeof data.birthday === 'string' ? data.birthday : data.birthday.format(dayFormat),
      needs: needs.join(','),
    }

    const deletedServiceIds = info.services.reduce((acc, cur) => {
      if (!services.find(s => s.serviceId === cur.serviceId)) {
        acc.push(cur.serviceId)
      }

      return acc
    }, [])

    doFetch('/participant/add', { method: 'POST', body: parsedData }).then(participantId => {
      const deletePromise = doFetch('/participant/delServices', {method: 'POST', body: deletedServiceIds})
      const updatePromise = doFetch('/participant/addServices', {method: 'POST', body: services.map(s => ({
          orgServiceId: s.orgServiceId,
          participantId,
          navigatorId: parsedData.navigatorId,
          serviceId: s.serviceId,
          status: 'Open',
        }))
      })
      
      Promise.all([deletePromise, updatePromise]).then(resp => {
        if (resp) {
          onAdd && onAdd({ ...parsedData, participantId })
          window.reloadParticipantInfo && window.reloadParticipantInfo(participantId)
        } 
       })

      console.log(parsedData)
    })
    
    dispatch({type: 'add_participant_hide'})
    setActiveStep(0)
    reset(info)
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const isLastStep = activeStep === stepsArr.length - 1

  const getFooterButtons = () => {
    return <Button variant="contained" onClick={handleSubmit(onSubmit)} sx={buttonSx}>Apply</Button>
  }

  const getTitle = () => {
    if (defaultActiveStep === 1) {
      return 'Book Service'
    } else if (defaultActiveStep === 2) {
      return 'Edit Participant'
    }

    return 'Add Participant'
  }

  return isShow && (
    <Dialog
      open={isShow}
      onClose={() => {}}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title" align="center">
        {getTitle()}
      </DialogTitle>
      <DialogContent>
        {!isEditingMode && <StepperPanel activeStep={activeStep} steps={stepsArr} />} 
        {getStepContent(activeStep, control, stepsArr[activeStep], navigators, organizations, getValues, isEditingMode)}
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: 800 }}>
          <Button onClick={() => {
              reset()
              dispatch({type: 'add_participant_hide'})
          }} sx={buttonSx}>Cancel</Button>
          {
            isEditingMode ? getFooterButtons() : (
              <Fragment>
                {activeStep !== 0 && <Button onClick={handleBack} sx={buttonSx}>Back</Button>}
                {!isLastStep && <Button variant="contained" onClick={handleNext} sx={buttonSx}>Next</Button>}
                {isLastStep && <Button variant="contained" onClick={handleSubmit(onSubmit)} sx={buttonSx}>Add</Button>}
              </Fragment>
            )
          }
        </Box>
      </DialogActions>
    </Dialog>
  )
}
