import React, {useMemo, useCallback} from 'react'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import getServiceCategoryIcon from './getServiceCategoryIcon'

const icons = getServiceCategoryIcon({sx: {height: 25, width: 25}})
const opts = [
  {label: icons.cabin, value: {field: 'serviceCategory', value: 'cabin'}, key: 'cabin', title: 'Living in Village'},
  {label: icons.care, value: {field: 'serviceCategory', value: 'care'}, key: 'care', title: 'In Coordinated Care'},
  {label: icons.education, value: {field: 'serviceCategory', value: 'education'}, key: 'education', title: 'In Vocational Training'}
]

const activeColor = '#1565c0'
const color = '#9fa8da'

export default function SerCategoryQuickFilter({onChange, active, userType, id}) {
  const myOpt = useMemo(() => ({field: userType === 'Navigator' ? 'navigatorId' : 'organization', value: id}), [id, userType])
  const onFilterChange = val => {
    if (val === active) {
      return onChange(null)
    }

    onChange(val)
  }

  return (
    <Stack direction="row">
      <Button sx={{ml: '10px', color: active === myOpt ? activeColor : color}} onClick={() => onFilterChange(myOpt)}>My Participant</Button>
      {
        opts.map(({label, value, key, title}) => {
          return (
            <Button variant="contained" key={key} sx={{backgroundColor: value === active ? activeColor : color, ml: '15px', borderRadius: '50%', height: '50px', width: '50px', p: 0, minWidth: 0}} title={title} onClick={() => onFilterChange(value)}>{label}</Button>
          )
        })
      }
    </Stack>
  )
}
