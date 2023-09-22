import React, {Fragment, useMemo, useRef, useState} from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import FormInput from '../../component/FormInputs/FormInput'
import FormDatePicker from '../../component/FormInputs/FormDatePicker'
import FormRadioGroup from '../../component/FormInputs/FormRadioGroup'
import FormMultipleSelect from '../../component/FormInputs/FormMultipleSelect'
import FormSelect from '../../component/FormInputs/FormSelect'
import {needsOpts} from '../../utils/constants'

const genderOpts = [{ label: 'Female', value: 'Female' }, { label: 'Male', value: 'Male' }]
const tagsOpts = [{ label: 'MHD', value: 'MHD' }, { label: 'SUD', value: 'SUD' }]


export default function ParticipantBaseInfo({ control, title, navigators, getValues }) {
  const [showOtherGoal, setShowOtherGoal] = useState(getValues('needs').includes('Other goals'))

  const navigatorOpts = useMemo(() => {
    return Object.values(navigators).map(({navigatorId, name}) => ({label: name, value: navigatorId}))
  }, [navigators])

  const onNeedsChange = value => {
    setShowOtherGoal(value.includes('Other goals'))
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
          <FormMultipleSelect label="Tags" width="100%" control={control} name="tags" options={tagsOpts} />
        </Grid>
        <Grid item xs={12} sm={4} mt={2}>
          <FormDatePicker label="Birthday" fullWidth control={control} name="birthday" />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormRadioGroup label="Gender" control={control} name="gender" options={genderOpts} />
        </Grid>
        <Grid item xs={6} sm={5}>
          <FormMultipleSelect label="Needs / Goal" width="100%" control={control} name="needs" options={needsOpts} onChange={onNeedsChange} />
          {/* <FormInput label="Needs / Goal" control={control} name="needs" required fullWidth variant="standard" /> */}
        </Grid>
        {showOtherGoal && <Grid item xs={6} sm={7} textAlign="left" display={'flex'} alignItems={'flex-end'}>
          <FormInput control={control} name="otherGoal" fullWidth />
        </Grid>}
      </Grid>
    </Fragment>
  )
}
