import React from 'react'
import {useDispatch} from 'react-redux'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function TopToolBar({enableImport = true, enableExport = true, enableZoom = true, toolButton}) {
  const dispatch = useDispatch()

  if (!enableImport && !enableExport && !enableZoom) {
    return null;
  }

  return (
    <Stack spacing={2} direction="row">
      {toolButton}
      {enableExport && <Button variant="contained" size="small" color="secondary" onClick={() => dispatch({type: 'export_show'})}>Export</Button>}
      {/* {enableImport && <Button variant="contained" size="small" color="secondary">Import</Button>} */}
      {/* {enableZoom && <Button variant="contained" size="small" color="primary">Zoom</Button>} */}
    </Stack>
  );
}
