import React, {Fragment} from 'react'
import Typography from '@mui/material/Typography'
import ServiceSelection from './ServiceSelection'

export default function ServicesInfo({control, title, organizations, isEditingMode}) {
  return (
    <Fragment>
      {!isEditingMode && <Typography variant="h6" gutterBottom>{title}</Typography>} 
      <ServiceSelection control={control} organizations={organizations} />
    </Fragment>
  )
}
