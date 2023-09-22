import React from 'react'
import { Typography, Stack, TextField} from '@mui/material';

function BasicInfo({info}) {
  return (
    <Stack sx={{ minWidth: 275 }} spacing={2}>
      <Stack direction="row" sx={{display: 'flex', alignItems: 'center', position: 'relative', top: '-50px'} }>
        <Typography variant="h4" component="div">
          {info.name}
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ display: 'flex' }} spacing={6} color="text.secondary" >
        <TextField label="Location" variant="outlined" value={info.location} InputProps={{ readOnly: true }} />
        <TextField label="Email" variant="outlined" value={info.email} InputProps={{ readOnly: true }}/>
        <TextField label="Phone" variant="outlined" value={info.phone} InputProps={{ readOnly: true }}/>
      </Stack>
    </Stack>
  )
}

export default BasicInfo