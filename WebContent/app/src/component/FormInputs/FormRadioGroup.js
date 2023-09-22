import React from 'react'
import {Controller} from "react-hook-form";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export default function FormRadioGroup({label, control, name, options, row = true, onValueChanged}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        if (label === 'Exit' && onValueChanged) {
          onValueChanged(value)
        }

        return (
          <RadioButtonsGroup onChange={onChange} value={value} label={label} size="small" options={options} row={row} />
        )
      }}
    />
  )
}

function RadioButtonsGroup({label, options, value, onChange, row}) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label" sx={{fontSize: '12px !important'}}>{label}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={value}
        row={row}
        name="radio-buttons-group"
        onChange={onChange}
      >
        {options.map(({label, value}) => <FormControlLabel key={value} value={value} control={<Radio size="small" />} label={label} />)}
      </RadioGroup>
    </FormControl>
  );
}
