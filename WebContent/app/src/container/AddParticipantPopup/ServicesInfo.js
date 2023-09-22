import React, {Fragment} from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import ServiceSelection from './ServiceSelection'

export default function ServicesInfo({control, title, organizations}) {
  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>{title}</Typography>
        <ServiceSelection control={control} organizations={organizations} />
    </Fragment>
  )
}
