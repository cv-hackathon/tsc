import React, {useMemo} from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Stack } from '@mui/material'

import PageOuterFrame from '../../component/PageOuterFrame'
import BasicInfo from './Basic'
import ServicesTable from './ServicesTable'

const globalInfoState = state => state.globalInfo

function Details() {
  const { organizations } = useSelector(globalInfoState)

  const orgId = useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search)
    return Number(urlParams.get('org'))
  }, [])

  const orgInfo = useMemo(() => {
    return organizations.find(v => v.id === orgId)
  }, [orgId, organizations])
   

  return (
    <PageOuterFrame>
      {orgInfo &&
        <Stack direction="column" spacing={8}>
          <BasicInfo info={orgInfo} orgId={orgId} />
          <ServicesTable info={orgInfo} orgId={orgId} />
        </Stack>} 
    </PageOuterFrame>
  )
}

export default Details