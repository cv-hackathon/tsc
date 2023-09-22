import React from 'react'
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';


function Indicators() {
  return (
    <Stack direction={'row'} spacing={2} position={'absolute'} sx={{top: '-20px', width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
      <Stack direction={'row'}>
        <HorizontalRuleIcon color='primary' fontSize='small' sx={{mr: 0.5}} />
        <Typography color='primary' fontSize={'small'}>Open</Typography>
      </Stack>
      <Stack direction={'row'}>
        <HorizontalRuleIcon color='warning' fontSize='small' sx={{mr: 0.5}} />
        <Typography color='orange' fontSize={'small'}>In Progress</Typography>
      </Stack>
      <Stack direction={'row'}>
        <HorizontalRuleIcon color='success' fontSize='small' sx={{mr: 0.5}} />
        <Typography color='green' fontSize={'small'}>Completed</Typography>
      </Stack>
    </Stack>
  )
}

export default Indicators