import React from 'react'
import {Controller} from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FormSelect({label, control, name, options, width, onChange: onChangeProp, labelProps}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <SingleSelect options={options} onChange={e => {
          onChange(e)
          onChangeProp && onChangeProp(e.target.value)
        }} value={value} label={label} width={width} labelProps={labelProps} />
      )}
    />
  )
}

function SingleSelect({options, onChange, value, label, width, labelProps}) {
  return (
    <FormControl sx={{width}} size="small">
      <InputLabel id="demo-select-small-label" {...labelProps}>{label}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        inputProps={labelProps}
        id="demo-select-small"
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map(({label, value}) => {
          return <MenuItem key={value} value={value}>{label}</MenuItem>
        })}
      </Select>
    </FormControl>
  )
}
