import React from 'react';
import { useDispatch } from 'react-redux'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import FunctionCard from './FunctionCard'
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

const FCard = () => {
  return (
    <Stack direction="row" spacing={2} sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', padding: '0.5rem'}}>
      <DemoPaper square={false}>
        <Box>
          Export
        </Box>
      </DemoPaper>
    </Stack>
  )
}

export default function MainFunctionPage() {
  const dispatch = useDispatch()

  return (
    <Container sx={{ flexGrow: 1, width: '100%' }} >
      <Box sx={{ md: {width: '100%'} }}>
      <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Monospace' }}>
        Welcome xxx
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Monospace', marginBottom: '1rem' }} paragraph>
        Our pupose is to build coalitions to help our marginalized neighbors stabilize, achieve self-reliance and pursue their full potential!
      </Typography>
      </Box>
      
      <Grid container height="100%" spacing={3}>
        <Grid item xs="7">
          <Grid container height="100%" spacing={3}>
            <Grid item xs="12">
              <FunctionCard title="HOME" onClick={() => { }} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs="5">
          <Grid container>
            <Grid xs={6}>
              <FCard title="Export" onClick={() => { }} />
            </Grid>
            <Grid xs={6}>
              <FCard title="Import" onClick={() => { }} />
            </Grid>
            <Grid xs={6}>
              <FCard title="Add Participant" onClick={() => dispatch({ type: 'add_participant_show' })} />
            </Grid>
            <Grid xs={6}>
              <FCard title="Add Organization" onClick={() => dispatch({ type: 'add_organization_show' })} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
