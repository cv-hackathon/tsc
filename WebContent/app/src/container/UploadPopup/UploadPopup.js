import React, {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {useSelector, useDispatch} from 'react-redux'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box, Stack } from '@mui/system'

import doFetch from '../../utils/doFetch'

const popupState = state => state.upload
const defaultImportType = 'participant'

export default function UploadPopup() {
  const {isShow} = useSelector(popupState)
  const dispatch = useDispatch()
  const [myFile, setMyFile] = useState([])
  const [importType, setImportType] = useState(defaultImportType)

  const onDrop = useCallback(acceptedFiles => {
    setMyFile(acceptedFiles)
  }, [])

  const {getRootProps, getInputProps} = useDropzone({multiple: false, onDrop})

  const onImport = () => {
    const isOrg = importType === 'organization'
    const data = new FormData()
    data.append('file', myFile[0], myFile[0].path)
    
    
    const url = isOrg ? '/organization/import' : '/participant/import'
    // const xhr = new XMLHttpRequest()
    // xhr.withCredentials = true

    // xhr.addEventListener('readystatechange', function() {
    //   if (this.readyState === 4) {
    //     console.log(this)
    //   }
    // })

    // xhr.open('POST', '/organization/import')
    // xhr.setRequestHeader('Accept', 'application/json, text/plain, */*')
    // xhr.send(data)
    
    fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'cors',
      body: data,
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(({Result}) => {
      if (!Result) {
        return alert('import failed')
      }

      if (isOrg) {
        doFetch('/organization')
          .then(organizations => {
            dispatch({type: 'global_update_organization', organizations})
          })
      }
      
      dispatch({type: 'upload_hide'})
      setMyFile([])
      setImportType(defaultImportType)
    }).catch(e => {
      alert('import error')
    })

    // doFetch(url, {method: 'POST', headers: {'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryRB12vJ72eQdPvIWH'}, body: data}).then(() => {
    //   dispatch({type: 'upload_hide'})
    // }).catch(e => {
    //   alert('import fail')
    // })
  }

  return (
    <Dialog
      open={isShow}
      onClose={() => {}}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title" sx={{mb: 3}}>
        Import Case
      </DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <RadioGroup row aria-label="type" name="type" value={importType} onChange={e => setImportType(e.target.value)}>
            <FormControlLabel value="participant" control={<Radio color="primary" />} label="Participants" />
            <FormControlLabel value="organization" control={<Radio color="primary" />} label="Organizations" />
          </RadioGroup>
        </FormControl>
        <Stack {...getRootProps({className: 'dropzone'})} my="15px" width="500px" height="150px" justifyContent="center" alignItems="center" padding="20px" border="2px dashed #eee" borderRadius="2px" >
          <input {...getInputProps()} />
          <p>Drag 'n' drop file here, or click to select file</p>
        </Stack>
        {!!myFile.length && <Box>Import file: {myFile[0].path}</Box>}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => {
          dispatch({type: 'upload_hide'})
          setMyFile([])
        }}>Cancel</Button>
        <Button variant="contained" onClick={onImport}>Import</Button>
      </DialogActions>
    </Dialog>
    
  )
}
