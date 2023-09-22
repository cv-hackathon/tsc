import React, {Fragment, useMemo, useRef, useState} from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import FormInput from '../../component/FormInputs/FormInput'
import FormDatePicker from '../../component/FormInputs/FormDatePicker'
import FormRadioGroup from '../../component/FormInputs/FormRadioGroup'
import FormMultipleSelect from '../../component/FormInputs/FormMultipleSelect'
import FormSelect from '../../component/FormInputs/FormSelect'

const genderOpts = [{ label: 'Female', value: 'Female' }, { label: 'Male', value: 'Male' }]
const bankOpts = [{label: 'Yes', value: 'Y'}, {label: 'No', value: 'N'}]
const tagsOpts = [{ label: 'MHD', value: 'MHD' }, { label: 'SUD', value: 'SUD' }]
const exitOpts = [{ label: 'Yes', value: 'Y' }, { label: 'No', value: 'N' }]
const exitReasonOpt = [
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
    label: 'Rule Violations'
  }
]


export default function ParticipantBaseInfo({ control, title, navigators, getValues }) {
  const [showExitReason, updateExitReasonShow] = useState(getValues('exit'))

  const navigatorOpts = useMemo(() => {
    return Object.values(navigators).map(({navigatorId, name}) => ({label: name, value: navigatorId}))
  }, [navigators])

  const onExitChanged = value => {
    updateExitReasonShow(value === 'Y')
  }

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormInput label="First name" control={control} name="firstname" required fullWidth variant="standard" autoComplete="given-name" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput label="Last name" control={control} name="lastname" required fullWidth variant="standard" autoComplete="given-name" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput type="phone" label="Phone" control={control} name="phone" fullWidth variant="standard" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput type="email" label="Email" control={control} name="email" fullWidth variant="standard" />
        </Grid>
        <Grid item xs={12} sm={4} textAlign="left" mt={2}>
          <FormSelect label="Navigator" fullWidth control={control} name="navigatorId" width={150} required options={navigatorOpts} />
        </Grid>
        <Grid item xs={12} sm={4} textAlign="left" mt={2}>
          <FormMultipleSelect label="Tags" fullWidth control={control} name="tags" options={tagsOpts} />
        </Grid>
        <Grid item xs={12} sm={4} mt={2}>
          <FormDatePicker label="Birthday" fullWidth control={control} name="birthday" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormRadioGroup label="If Open Back Account"control={control} name="backCardOpen" options={bankOpts} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormRadioGroup label="Gender" control={control} name="gender" options={genderOpts} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormRadioGroup label="Exit" control={control} name="exit" options={exitOpts} onExitChanged={ onExitChanged } />
        </Grid>
        {showExitReason && <Grid item xs={12} sm={8} textAlign="left" display={'flex'} alignItems={'flex-end'}>
          <FormSelect label="Exit Reason" control={control} name="exitReason" width={'100%'} options={exitReasonOpt} />
        </Grid>}
        <Grid item xs={12}>
          <FormInput label="Needs / Goal" control={control} name="needs" required fullWidth variant="standard" />
        </Grid>
      </Grid>
    </Fragment>
  )
}
