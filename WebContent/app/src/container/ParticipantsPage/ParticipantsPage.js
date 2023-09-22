import React, {useState, useEffect, useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useDebounce} from 'use-debounce'

import OutlinedInput from '@mui/material/OutlinedInput'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import PageOuterFrame from '../../component/PageOuterFrame'
import ParticipantsTable from './ParticipantsTable'
import SerCategoryQuickFilter from './SerCategoryQuickFilter'

import doFetch from '../../utils/doFetch'

const orgState = state => state.loginReducer

export default function ParticipantsPage({}) {
  const dispatch = useDispatch()
  const {id, type} = useSelector(orgState)
  const [rawData, setRawData] = useState([])
  const [name, setFilterName] = useState('')
  const [quickFilter, setQuickFilter] = useState(null)
  const [filterName] = useDebounce(name, 300);
  
  useEffect(() => {
    doFetch('/participant/lists').then(data => setRawData(data))
  }, [])

  const data = useMemo(() => {
    const lowerName  = filterName.toLowerCase()

    return rawData.filter((d) => {
      return `${d.firstname} ${d.lastname}`.toLowerCase().includes(lowerName) && matchQuichFilter(quickFilter, d)
    })
  }, [filterName, quickFilter, rawData])

  const onAddPart = () => {
    doFetch('/participant/lists').then(data => setRawData(data))
  }

  const updateQuickFilter = newFilter => {
    setFilterName('')
    setQuickFilter(newFilter)
  }
  const onInputChange = e => {
    setQuickFilter(null)
    setFilterName(e.target.value)
  }

  return (
    <PageOuterFrame title="Participants" toolButton={<Button variant="contained" size="small" color="primary" onClick={() => dispatch({type: 'add_participant_show', onAdd: onAddPart})}>Add Participant</Button>}>
      <Stack direction="row" justifyContent="space-between">
        <Stack width="30%">
          <OutlinedInput
            size='small'
            id="search-participant"
            placeholder='Search Participant...'
            value={name}
            onChange={onInputChange}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </Stack>
        <SerCategoryQuickFilter active={quickFilter} userType={type} id={id} onChange={val => updateQuickFilter(val)} />
      </Stack>
      <Stack flexGrow="1"><ParticipantsTable data={data} /></Stack>
    </PageOuterFrame>
  )
}

function matchQuichFilter(filter, d) {
  if (!filter) {
    return true
  }

  const {field, value} = filter
  
  if (field === 'serviceCategory') {
    return d.services.some(s => s.serviceCategory === value)
  }

  if (field === 'organization') {
    return d.services.some(s => s.organizationId  === value)
  }

  return d[field] === value
}
