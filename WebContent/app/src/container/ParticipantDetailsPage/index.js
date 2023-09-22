import React, { useMemo, useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Stack } from '@mui/material'

import PageOuterFrame from '../../component/PageOuterFrame'
import Comments from './Comments'
import Journey from './Journey'
import BasicInfo from './Basic'
import doFetch from '../../utils/doFetch'

const globalInfoState = state => state.globalInfo
const loginState = state => state.loginReducer

function Details() {
  const { navigators } = useSelector(globalInfoState)
  const userInfo = useSelector(loginState)
  const [info, setInfo] = useState()

  const participantId = useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('participant')
  }, [])

  useEffect(() => {
    window.reloadParticipantInfo = (id) => {
      refreshInfo(id)
    }

    return () => {
      window.reloadParticipantInfo = () => {}
    }
  }, [])

  const refreshInfo = (id) => {
    doFetch(`/participant/lists?participantId=${id}`).then(info => {
      if (info?.length > 0) {
        const participantInfo = info[0]
        const { name } = navigators[participantInfo.navigatorId]
      
        setInfo({ ...participantInfo, navigatorName: name })
      }
    })
  }

  useEffect(() => {
    refreshInfo(participantId)
  }, [participantId])

  return (
    <PageOuterFrame enableExport={false} enableZoom={false} enableImport={false}>
      {info &&
        <Stack direction="column" spacing={12}>
          <BasicInfo info={info} participantId={participantId} />
          <Journey info={info} participantId={participantId} />
          <Comments info={info} userInfo={userInfo} participantId={participantId} />
        </Stack>} 
    </PageOuterFrame>
  )
}

export default React.memo(Details) 