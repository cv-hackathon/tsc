import React from 'react'
import { useDispatch } from 'react-redux'

import { styled, Button, Typography, Stack, TextField, Chip, Grid } from '@mui/material';

const colors = {primary: '#F0F7FF', warning: '#FFF9EB', success: '#E9FBF0', error: '#FFF0F1', default: '#303740'}
const StyledChip = styled(Chip)(({ theme, color }) => ({
  '&.MuiChip-root': {
    background: colors[color],
  },
  'span': {
    fontWeight: 'bold',
  }
}));

function BasicInfo({ participantId, info }) {
  const dispatch = useDispatch()

  return (
    <Stack sx={{ minWidth: 275 }} spacing={2}>
      <Stack direction="row" justifyContent={'space-between'} alignItems={'center'} sx={{display: 'flex', position: 'relative', top: '-50px'} }>
        <Stack direction={"row"} alignItems={'center'} sx={{display: 'flex'}} spacing={2}>
          <Typography variant="h4" component="div">
            {info.lastname} {info.firstname}
          </Typography>
          <Stack direction={'row'} spacing={1}>
            {info.tags.split(',').map((tag, idx) =>
              <StyledChip key={idx} label={tag.trim()} size="small" color={['primary', 'warning', 'success'][idx % 3]} sx={{ fontWeight: 'bold' }} variant="outlined" />)}
          </Stack>
        </Stack>
        <Button variant="contained" size="small" color="primary" sx={{ height: '30px' }} onClick={() => {
          dispatch({ type: 'add_participant_show', isEditingMode: true, info })
        }}>Book Service</Button>
      </Stack>

      <Grid container spacing={4} sx={{padding: '0 !important'}}>
        <Grid item xs={6} sm={2} sx={{paddingLeft: '0 !important'}}>
          <TextField label="Navigator" variant="outlined" value={info.navigatorName} InputProps={{ readOnly: true }} required color={'primary'} focused />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField label="Birthday" variant="outlined" value={info.birthday}InputProps={{ readOnly: true }} />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField label="Phone" variant="outlined" value={info.phone} InputProps={{ readOnly: true }} />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField label="Bank Account" variant="outlined" value={info.backCardOpen || 'N'} InputProps={{readOnly: true}}  />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField label="Email" variant="outlined" value={info.email} InputProps={{readOnly: true}}  />
        </Grid>
        <Grid item xs={6} sm={2} sx={{ paddingLeft: '0 !important' }}>
          <TextField label="Status" variant="outlined" value={info.exit === 'Y' ? 'Fail' : info.status} InputProps={{ readOnly: true }} required />
        </Grid>
        {info.exit === 'Y' && (
          <Grid item xs={6} sm={4}>
            <TextField label="Fail Reason" fullWidth variant="outlined" value={info.exitReason} InputProps={{readOnly: true}}  />
          </Grid>
        )}
        <Grid item xs={6} sm={4}>
          <TextField label="Needs / Goal" fullWidth variant="outlined" value={info.needs} InputProps={{readOnly: true}}  />
        </Grid>
      </Grid> 
    </Stack>
  )
}

export default BasicInfo