import React, {useState, useEffect, useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useDebounce} from 'use-debounce'

import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


import PageOuterFrame from '../../component/PageOuterFrame'
import OrganizationsTable from './OrganizationsTable'
import AddOrganizationPopup from '../AddOrganizationPopup'

import doFetch from '../../utils/doFetch'

const orgState = state => state.globalInfo

export default function OrganizationsPage({}) {
  const dispatch = useDispatch()
  const {organizations: rawData} = useSelector(orgState)
  const [name, setFilterName] = useState('')
  const [filterName] = useDebounce(name, 300);

  const data = useMemo(() => {
    const lowerName  = filterName.toLowerCase()

    return rawData.filter(({name}) => {
      return name.toLowerCase().includes(lowerName)
    })
  }, [filterName, rawData])

  return (
    <PageOuterFrame title="Organizations" toolButton={<Button variant="contained" size="small" color="primary" onClick={() => dispatch({type: 'add_organization_show'})}>Add Organization</Button>}>
      <Stack width="30%">
        <OutlinedInput size='small'
          id="search-organizations"
          placeholder='Search Organizations...'
          onChange={e => setFilterName(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Stack>
      <Stack flexGrow="1"><OrganizationsTable data={data} /></Stack>
      <AddOrganizationPopup />
    </PageOuterFrame>
  )
}
