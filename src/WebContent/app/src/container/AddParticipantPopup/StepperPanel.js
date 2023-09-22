import React from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export default function StepperPanel({activeStep, steps}) {
  return (
    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}
