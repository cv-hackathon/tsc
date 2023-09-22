import React from 'react'
import {Controller} from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const emptyArr = []
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function FormMultipleSelect({control, name, ...inputProps}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <MultipleSelect onChange={onChange} value={value} {...inputProps} />
      )}
    />
  )
}

function MultipleSelect({options, onChange, value = emptyArr, label, ...rest}) {
  return (
    <FormControl sx={{minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label-1" {...rest}>{label}</InputLabel>
      <Select
        labelId="demo-select-small-label-1"
        multiple
        value={typeof value === 'string' ? value.split(',') : value}
        label={label}
        renderValue={(selected) => {
          return typeof selected === 'string' ? selected : selected?.join(', ') 
        }}
        MenuProps={MenuProps}
        onChange={e => {
          const val = e.target.value
          onChange(typeof val === 'string' ? val.split(',') : val)
        }}
      >
        {options.map(({label, value: val}) => {
          return (
            <MenuItem key={val} value={val}>
              <Checkbox checked={value.includes(val)} />
              <ListItemText primary={label} />
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
