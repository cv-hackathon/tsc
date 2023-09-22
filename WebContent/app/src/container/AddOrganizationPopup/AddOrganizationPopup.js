import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useForm} from "react-hook-form";

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'

import FormInput from '../../component/FormInputs/FormInput'
import ServiceSelection from './ServiceSelection';

import doFetch from '../../utils/doFetch';

const buttonSx = {mt: 3, ml: 1}
const defaultInputs = {
  name: '',
  email: '',
  zoom: '',
  services: [],
}

const popupState = state => state.addOrganization


export default function AddOrganizationPopup() {
  const {isShow, onAdd} = useSelector(popupState)
  const dispatch = useDispatch()
  const {control, reset, handleSubmit} = useForm({
    defaultValues: defaultInputs,
  })

  const onSubmit = data => {
    dispatch({type: 'add_organization_hide'})
    doFetch('/organization/add', {method: 'POST', body: data})
      .then(() => doFetch('/organization'))
      .then(organizations => {
        dispatch({type: 'global_update_organization', organizations})
        onAdd && onAdd(organizations)
      })

    console.log(data)
    reset(defaultInputs)
  }

  return (
    <Dialog
      open={isShow}
      onClose={() => {}}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title" align="center">
        Add Organization
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormInput label="Organization name" control={control} name="name" required fullWidth variant="standard" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput label="Location" control={control} name="location" required fullWidth variant="standard" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput type="email" label="Email" control={control} name="email" required fullWidth variant="standard" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput type="phone" label="Phone" control={control} name="phone" required fullWidth variant="standard" />
          </Grid>
        </Grid>
        <ServiceSelection control={control} />
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: 800 }}>
          <Button onClick={() => {
            reset()
            dispatch({type: 'add_organization_hide'})
          }} sx={buttonSx}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)} sx={buttonSx}>Add</Button>
        </Box>  
      </DialogActions>
    </Dialog>
  )
}

