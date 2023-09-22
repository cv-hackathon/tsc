import React, { useRef, useEffect, useState } from 'react'

import { Divider, Stack, Typography } from '@mui/material';
import Contacts from './Contacts';
import CommentsComponent from '../../libs/Comments/'
import doFetch from '../../utils/doFetch'

function Comments({ participantId, info, userInfo }) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = () => {
    doFetch(`/participant/listComments?participantId=${participantId}`).then(resp => {
      const data = resp[0] ? JSON.parse(resp[0]?.comment) : []
      setComments(formatData(data, userInfo));
    })
  };

  const formatData = (data, userInfo) => {
    const test = data.map(it => {
      if (it.replies?.length > 0) {
        it.replies = formatData(it.replies, userInfo)
      }

      return {
        ...it,
        currentUser: it.username === userInfo.name
      }
    })

    return test
  }
  
  const updateData= comments => {
    doFetch(
      `/participant/updateComments`,
      { method: 'POST', body: {participantId, comment: JSON.stringify(comments)} }
    ).then(resp => {
      console.log('...', resp)
    })
  }

  return (
    <Stack direction={"column"} spacing={6}>
      <Divider component="div" role="presentation" textAlign='left'>
        <Typography variant="h5" color='text.secondary'>COMMENTS</Typography>
      </Divider>
      <Stack direction="row" sx={{ display: 'flex' }} spacing={4}>
        <Contacts participantId={participantId} info={info} />
        <Divider orientation="vertical" variant="middle" flexItem component="div" />    
        <CommentsComponent data={comments} userInfo={userInfo} updateData={updateData} />
      </Stack>
    </Stack>
    
  );

}

export default Comments