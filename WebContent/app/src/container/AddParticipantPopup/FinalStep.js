import React, {Fragment, useState} from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import FormRadioGroup from '../../component/FormInputs/FormRadioGroup'
import FormSelect from '../../component/FormInputs/FormSelect'
import FormMultipleSelect from '../../component/FormInputs/FormMultipleSelect'

import { dayFormat } from '../../utils/constants'

const bankOpts = [{label: 'Yes', value: 'Y'}, {label: 'No', value: 'N'}]
const exitOpts = [{ label: 'Yes', value: 'Y' }, { label: 'No', value: 'N' }]
const completeOpts = [{label: 'Yes', value: 'Y'}, {label: 'No', value: 'N'}]

const exitReasonOpts = [
  {
    label: 'Incarcerated',
    value: 'Incarcerated',
  }, {
    label: 'Move to Assertive Community Treatment Teams',
    value: 'Move to Assertive Community Treatment Teams',
  }, {
    label: 'Passed away',
    value: 'Passed away',
  }, {
    label: 'Not return',
    value: 'Not return'
  }, {
    label: 'Move to different arrangements',
    value: 'Move to different arrangements',
  }, {
    label: 'Rule Violations',
    value: 'Rule Violations'
  }
]

const achieveReasonOpts = [
  {
    label: 'Permanent housing',
    value: 'Permanent housing',
  }, {
    label: 'Newly employed',
    value: 'Newly employed',
  }, {
    label: 'GED attained',
    value: 'GED attained',
  }, {
    label: 'Training Programs',
    value: 'Training Programs'
  }, {
    label: 'Bank accounts opened',
    value: 'Bank accounts opened',
  }
]

export default function FinalStep({ title, control, getValues, isEditingMode }) {
  const [showExitReason, updateExitReasonShow] = useState(getValues('exit'))
  const [showAchieveReason, updateAchieveReasonShow] = useState(getValues('achievement'))

    const onExitChanged = value => {
      updateExitReasonShow(value === 'Y')
    }
  
    const onAchieveChanged = value => {
      updateAchieveReasonShow(value === 'Y')
    }
    
  return (
    <Fragment>
      {!isEditingMode && <Typography variant="h6" gutterBottom>{title}</Typography>}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <FormRadioGroup label="If Has Bank Account"control={control} name="bankCardOpen" options={bankOpts} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormRadioGroup label="Completed" control={control} name="achievement" options={completeOpts} onValueChanged={ onAchieveChanged } />
        </Grid>
        <Grid item xs={12} sm={8} textAlign="left" display={'flex'} alignItems={'flex-end'}>
          {showAchieveReason && (
            <FormSelect label="Achievements" control={control} name="achieveReason" width={'100%'} options={achieveReasonOpts} />
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormRadioGroup label="Exit" control={control} name="exit" options={exitOpts} onValueChanged={ onExitChanged } />
        </Grid>
        <Grid item xs={12} sm={8} textAlign="left" display={'flex'} alignItems={'flex-end'}>
          {showExitReason && ( 
            <FormSelect label="Exit Reason" control={control} name="exitReason" width={'100%'} options={exitReasonOpts} />
          )}
        </Grid>
      </Grid>
    </Fragment>
  )
}
