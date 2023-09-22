import React from 'react'
import {Controller} from "react-hook-form";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

export default function FormDatePicker({label, control, name}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker onChange={date => {
            onChange(date)
          }} value={dayjs(value)} label={label} slotProps={{textField: { size: 'small' }}} />
        </LocalizationProvider>
      )}
    />
  )
}
