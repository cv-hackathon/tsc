import React from 'react'
import { useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { styled, alpha } from '@mui/material/styles';

const StyledTimelineContent = styled(TimelineContent)(({ theme }) => ({
  '&:hover': {
    color: theme.palette.text.secondary,
    cursor: 'pointer'
  },
}));

const StyledTimelineItem = styled(TimelineItem)(({ theme }) => ({
  '&:before': {
    padding: 0,
    flex: 0
  },
}));

const getList = (item, dispatch) => {
  const { status, services, info } = item

  return (
    <Timeline position="right">
      {services.map((service, idx) => {
        const color = service.serviceStatus === 'Open' ? 'primary' : service.serviceStatus === 'In Progress' ? 'warning' : 'success'
        return (
          <StyledTimelineItem key={idx}>
            <TimelineSeparator>
              <TimelineDot color={color} />
              <TimelineConnector sx={{bgcolor: `${color}.main`}} />
            </TimelineSeparator>
            <StyledTimelineContent fontSize={'small'} onClick={() => dispatch({ type: 'service_details_show', service, info})}>{service.serviceName}</StyledTimelineContent>
          </StyledTimelineItem>
        )
      })}
    </Timeline>
  );
} 

function ServiceSection({categories}) {
  const dispatch = useDispatch()

  if (!categories) {
    return null
  }

  return (
    <Grid container spacing={2} alignItems={'flex-end'}>
      <Grid item xs={12} sm={1} sx={{ padding: '0 !important'}} />
      {categories.map((it, idx) => (
        <Grid key={idx} item xs={12} sm={2} sx={{ padding: '0 !important', position: 'relative', left: '-30px'}}>{getList(it, dispatch)}</Grid>
      ))}
  </Grid>
  )
}

export default ServiceSection