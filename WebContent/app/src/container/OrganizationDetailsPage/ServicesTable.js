import React, { useEffect, useMemo, useState } from 'react'
import {useDispatch} from 'react-redux'

import { DataGrid } from '@mui/x-data-grid';
import { Link, Stack, Button, Typography } from '@mui/material';
import { useNavigate } from '../../utils/useNavigate'
import doFetch from '../../utils/doFetch';

const getColumns = (navigate, dispatch) => [
  {
    field: 'name',
    headerName: 'Service Name',
    flex: 1,
  },
  {
    field: 'workerName',
    headerName: 'Case Worker',
    flex: 1,
  },
  {
    field: 'participant',
    headerName: 'Participants',
    flex: 1,
    renderCell: (params) => (
      <Stack direction="column">{params.row.participants?.map(p => {
        return (
          <Link href="#" underline="hover" onClick={() => navigate(`participantdetails/?participant=${p.participantId}`)}>
          {`${p.lastname || ''} ${p.firstname || ''}`}
          </Link>
        )
       })}
      </Stack>
    )
  },
  {
    field: 'startTime',
    headerName: 'Start Time',
    flex: 1,
    renderCell: (params) => (
      <Stack direction="column">{params.row.participants?.map(p => {
        const target = p.services.find(s => s.serviceId === params.row.id)
        return <Typography>{ new Date(target.startTime).toDateString() }</Typography>
      })}
      </Stack>
    )
  },
  {
    field: 'endTime',
    headerName: 'End Time',
    flex: 1,
    renderCell: (params) => (
      <Stack direction="column">{params.row.participants?.map(p => {
        const target = p.services.find(s => s.serviceId === params.row.id)
        return <Typography>{ new Date(target.endTime).toDateString() }</Typography>
      })}
      </Stack>
    )
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
  },
  // {
  //   field: 'action',
  //   headerName: '',
  //   flex: 1,
  //   renderCell: params => {
  //     const zoomId = params.row.zoom
  //     return <Button variant="contained" size="small" color="primary" onClick={() => console.log(zoomId)}>Zoom</Button>
  //   }
  // },
];

export default function ServicesTable({info: {services}, orgId}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const columns = useMemo(() => getColumns(navigate, dispatch), [navigate, dispatch])
  const [data, setData] = useState(services)
  
  useEffect(() => {
    doFetch(`/participant/lists?orgId=${orgId}`).then(resp => {
      if (resp?.length > 0) {
        const data = services.map(s => ({
          ...s,
          participants: resp.filter(v => v.services.some(vs => vs.serviceId === s.id))
        }))
        setData(data)
      }
    })
  }, [orgId, services])

  return (
    <DataGrid
      hideFooterPagination
      hideFooter
      // checkboxSelection
      getRowId={row => row.id}
      rows={data}
      columns={columns}
    />
  )
}
