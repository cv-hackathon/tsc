import React from 'react'
import {Controller} from "react-hook-form";
import TextField from '@mui/material/TextField';

export default function FormInput({control, name, ...inputProps}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField onChange={onChange} value={value} size="small" {...inputProps} />
      )}
    />
  )
}
