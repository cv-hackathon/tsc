import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Box, Dialog, DialogTitle, DialogActions, DialogContent, TextField, Grid, Typography, Select, FormControl, InputLabel, MenuItem } from '@mui/material'

import doFetch from '../utils/doFetch'

const buttonSx = {mt: 3, ml: 1}
const popupState = state => state.serviceDetails

const STATUS = ['Open', 'In Progress', 'Completed']

export default function ServiceDetailsPopup() {
  const { isShow, details, info } = useSelector(popupState)
  const dispatch = useDispatch()

  const onSave = () => {
    doFetch('/participant/addServices', {
      method: 'POST', body: [{
        serviceId: details.serviceId,
        participantId: info.participantId,
        navigatorId: info.navigatorId,
        orgServiceId: details.orgServiceId,
        description: details.description,
        status: details.serviceStatus,
      }]
    }).then(() => {
      window.reloadParticipantInfo && window.reloadParticipantInfo(info.participantId)
    })
    dispatch({type: 'service_details_hide'})
  }


  return (
    <Dialog
      open={isShow}
      onClose={() => dispatch({type: 'service_details_hide'})}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle align="left" sx={{mb: 3}} >
        {details.serviceName}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8} sx={{mt: 1}}>
            <TextField label="Organization" fullWidth variant="outlined" value={details.organizationName} InputProps={{readOnly: true}} />
          </Grid>
          <Grid item xs={12} sm={4} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={details.serviceStatus}
                label="Status"
                onChange={event => { 
                  dispatch({type: 'service_details_update', attribute: 'serviceStatus', value: event.target.value})
                }}
              >
                {STATUS.map(op => <MenuItem key={op} value={op}>{ op }</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Start Time" fullWidth variant="outlined" value={new Date(details.startTime).toDateString()} InputProps={{readOnly: true}} />
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField label="End Time" fullWidth variant="outlined" value={new Date(details.endTime).toDateString()} InputProps={{readOnly: true}} />
          </Grid>
          <Grid item xs={12} sm={12} />
          <Grid item xs={12} sm={6}>
            <TextField label="Participant Name" fullWidth variant="outlined" value={`${info.firstname || ''} ${info.lastname || ''}`} InputProps={{readOnly: true}} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Case Worker" fullWidth variant="outlined" value={details.caseWorker} InputProps={{readOnly: true}} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField label="Feedback" fullWidth variant="outlined" defaultValue={details.description} multiline rows={3} onBlur={event => dispatch({type: 'service_details_update', attribute: 'description', value: event.target.value})} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: 800 }}>
          <Button onClick={onSave} sx={buttonSx} color='secondary' >Save</Button>
          <Button onClick={() => dispatch({type: 'service_details_hide'})} sx={buttonSx}>Close</Button>
        </Box>  
      </DialogActions>
    </Dialog>
  )
}

