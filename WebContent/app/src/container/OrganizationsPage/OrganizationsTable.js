import React, { useMemo } from 'react'
import {useDispatch} from 'react-redux'

import { DataGrid } from '@mui/x-data-grid';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button'
import {useNavigate} from '../../utils/useNavigate'

const getColumns = (navigate, dispatch) => [
  {
    field: 'serviceName',
    headerName: 'Services',
    flex: 1,
  },
  {
    field: 'organizationName',
    headerName: 'Organization Name',
    flex: 1,
    renderCell: (params) => {
      return (
        <Link href="#" underline="hover" onClick={() => navigate(`organizationdetails/?org=${params.row.organizationId}`)}>
          {params.row.organizationName}
        </Link>
      )
    },
  },
  {
    field: 'caseWorkerEmail',
    headerName: 'Case Worker Email',
    flex: 1,
  },
  {
    field: 'caseWorkerZoom',
    headerName: 'Case Worker Zoom',
    flex: 1,
  },
  {
    field: 'location',
    headerName: 'Location',
    flex: 1,
  },
];

export default function OrganizationsTable({data}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const columns = useMemo(() => getColumns(navigate, dispatch), [navigate, dispatch])

  const parsedData = useMemo(() => {
    return data.reduce((acc, row) => {
      row.services.forEach(s => {
        acc.push({...s, serviceId: s.id, serviceName: s.name, caseWorkerEmail: s.email, caseWorkerZoom: s.zoom, organizationName: row.name, organizationEmail: row.email, organizationId: row.id, location: row.location})
      })

      return acc
    }, [])
  }, [data])

  return (
    <DataGrid
      hideFooterPagination
      hideFooter
      // checkboxSelection
      getRowId={row => row.serviceId}
      rows={parsedData}
      columns={columns}
    />
  )
}
