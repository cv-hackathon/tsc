import React from 'react'
import {useFieldArray} from "react-hook-form"
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';

import FormInput from '../../component/FormInputs/FormInput'
import FormSelect from '../../component/FormInputs/FormSelect'

const inputProps = {sx: {fontSize: '9px!important', height: '1.4375em!important'}}

const defaultRowInfo = {name: '', workerName: '', zoom: '', email: '', description: ''}
const cateOps = [{label: 'SPRINGBOARD PALLET VILLAGES', value: 'cabin'}, {label: 'ACCESS COORDINATED CARE', value: 'care'}, {label: 'EDUCATION & EMPLOYMENT', value: 'education'}]

export default function ServiceSelection({control}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "services"
  });
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button size="small" color="primary" onClick={() => append({...defaultRowInfo})}>Add New Service</Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection:'column', alignItems: 'center' }}>
        {
          fields.map((item, index) => {
            return (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: '10px' }}>
                <Grid key="ser" alignItems="center" container spacing={1}>
                  <Grid item xs={2}><FormInput label="Service" control={control} name={`services.${index}.name`} InputLabelProps={inputProps} inputProps={inputProps} required /></Grid>
                  <Grid item xs={2}><FormSelect label="Category" control={control} name={`services.${index}.category`} labelProps={inputProps} options={cateOps} width="80px" required /></Grid>
                  <Grid item xs={2}><FormInput label="Case worker" control={control} name={`services.${index}.workerName`} InputLabelProps={inputProps} inputProps={inputProps} required /></Grid>
                  <Grid item xs={2}><FormInput label="Zoom" control={control} name={`services.${index}.zoom`} InputLabelProps={inputProps} inputProps={inputProps} required /></Grid>
                  <Grid item xs={2}><FormInput label="Email" control={control} name={`services.${index}.email`} InputLabelProps={inputProps} inputProps={inputProps} required /></Grid>
                  <Grid item xs={2}><FormInput label="Description" control={control} name={`services.${index}.description`} InputLabelProps={inputProps} inputProps={inputProps} /></Grid>
                </Grid>
                <div><Button size="small" sx={{minWidth: '24px'}} color="primary" onClick={() => remove(index)}><CloseIcon /></Button></div>
              </Box>
            )
          })
        }
      </Box>
    </div>
  )
}
  