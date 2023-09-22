import React from 'react';
import {useDispatch} from 'react-redux'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import FunctionCard from './FunctionCard'

export default function MainFunctionPage() {
  const dispatch = useDispatch()

  return (
    <Container sx={{flexGrow: 1, width: '100%'}} >
      <Grid container>
        <Grid xs={2} display="flex" alignItems="center" justifyContent="center">
          <FunctionCard title="Export" onClick={() => {}} />
        </Grid>
        <Grid xs={2} display="flex" alignItems="center" justifyContent="center">
          <FunctionCard title="Import" onClick={() => {}} />
        </Grid>
        <Grid xs={2} display="flex" alignItems="center" justifyContent="center">
          <FunctionCard title="Add Participant" onClick={() => dispatch({type: 'add_participant_show'})} />
        </Grid>
        <Grid xs={2} display="flex" alignItems="center" justifyContent="center">
          <FunctionCard title="Add Organization" onClick={() => dispatch({type: 'add_organization_show'})} />
        </Grid>
      </Grid>
    </Container>
  )
}
