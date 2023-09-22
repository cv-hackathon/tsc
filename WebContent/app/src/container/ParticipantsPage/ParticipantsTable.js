import React, { useMemo } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { DataGrid } from '@mui/x-data-grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'

import getServiceCategoryIcon from './getServiceCategoryIcon'
import {useNavigate} from '../../utils/useNavigate'

const categrayIcons = getServiceCategoryIcon({sx: {height: 15, width: 15, marginRight: '0.5rem'}})

const partiStatus = {
  'In Progress': <Typography component="div" sx={{color: 'warning.main'}} fontSize={'small'}>In Progress</Typography>,
  'Completed': <Typography component="div" sx={{color: 'success.main'}} fontSize={'small'}>Completed</Typography>,
  'Exited': <Typography component="div" sx={{color: 'error.main'}} fontSize={'small'}>Exited</Typography>,
  Open: <Typography component="div" sx={{color: 'primary.main'}} fontSize={'small'}>Open</Typography>,
}

function getStatus(rowData) {
  const {status} = rowData

  return partiStatus[status] || status
}

const getColumns = (navigate, dispatch, navigators) => [
  {
    field: 'fullName',
    headerName: 'Participant Name',
    width: 150,
    renderCell: (params) => {
      return (
        <Link href="#" underline="hover"  onClick={() => navigate(`participantdetails/?participant=${params.id}`)}>
          {`${params.row.firstname || ''} ${params.row.lastname || ''}`}
        </Link>
      )
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    renderCell: (params) => {
      return getStatus(params.row)
    },
  },
  {
    field: 'exitReason',
    headerName: 'Reason',
    flexGrow: 1,
  },
  {
    field: 'navigator',
    headerName: 'Navigator',
    width: 150,
    valueGetter: (params) => {
      return (navigators[params.row.navigatorId] || {}).name
    },
  },
  {
    field: 'bankCardOpen',
    headerName: 'Bank Account',
    width: 150,
  },
  {
    field: 'services',
    headerName: 'Services',
    flex: 1,
    width: 230,
    renderCell: (params) => {
      const { services, ...restInfo } = params.row
      
      return <Stack direction="column" width="100%" overflow="hidden">{services.map((s, idx) => {
        return (
          <Stack key={idx} title={s.serviceName || ''} direction="row" alignItems="center">
            {categrayIcons[s.serviceCategory]}
            <Link key="link" href="#" overflow="hidden" textOverflow="ellipsis" onClick={() => dispatch({ type: 'service_details_show', service: s, info: restInfo })}>
              <span>{s.serviceName || ''}</span>
            </Link>
          </Stack>
        )
      })}</Stack>
    },
  },
  {
    field: 'serviceStatus',
    headerName: 'Service Status',
    width: 110,
    renderCell: (params) => {
      return <Stack direction="column">{params.row.services.map((s, idx) => {
        return (
          <div key={idx}>{partiStatus[s.serviceStatus] || s.serviceStatus}</div>
        )
      })}</Stack>
    },
  },
  {
    field: 'caseWorker',
    headerName: 'Case Worker',
    width: 150,
    renderCell: (params) => {
      return <Stack direction="column">{params.row.services.map((s, idx) => {
        return (
          <div key={idx}>{s.caseWorker}</div>
        )
      })}</Stack>
    },
  },
  // {
  //   field: 'caseWorkerZoom',
  //   headerName: 'Case Worker Zoom',
  //   width: 200,
  //   renderCell: (params) => {
  //     return <Stack direction="column" width="100%" overflow="hidden">{params.row.services.map(s => {
  //       return (
  //         <Typography component="div" title={s.caseWorkerZoom} overflow="hidden" textOverflow="ellipsis">{s.caseWorkerZoom}</Typography>
  //       )
  //     })}</Stack>
  //   },
  // },
  {
    field: 'organizationName',
    headerName: 'Organization',
    flex: 1,
    renderCell: (params) => {
      return <Stack direction="column" width="100%" overflow="hidden">{params.row.services.map((s, idx) => {
        return (
          <Link key={idx} title={s.organizationName} overflow="hidden" textOverflow="ellipsis" href="#" underline="hover" onClick={() => navigate(`organizationdetails/?org=${s.organizationId}`)}>
            {s.organizationName}
          </Link>
        )
      })}</Stack>
    },
  },
];

export default function ParticipantsTable({data}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {navigators} = useSelector(state => state.globalInfo)
  const columns = useMemo(() => getColumns(navigate, dispatch, navigators), [navigate, dispatch, navigators])

  return (
    <DataGrid
      hideFooterPagination
      hideFooter
      getRowId={row => {
        return row.participantId
      }}
      getRowHeight={
        row => {
          const seriesLen = row.model.services.length

          return Math.max(seriesLen * 21 + 4, 52)
        }
      }
      rows={data}
      columns={columns}
    />
  )
}
