import React, {useState} from 'react'
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

import exportFile from '../../utils/exportFile'

const popupState = state => state.export
const defaultImportType = 'participant'

export default function ExportPopup() {
  const {isShow} = useSelector(popupState)
  const dispatch = useDispatch()
  const [exportType, setExportType] = useState(defaultImportType)

  return (
    <Dialog
      open={isShow}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title" sx={{mb: 3}}>
        Export Case
      </DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <RadioGroup row aria-label="type" name="type" value={exportType} onChange={e => setExportType(e.target.value)}>
            <FormControlLabel value="participant" control={<Radio color="primary" />} label="Participants" />
            <FormControlLabel value="organization" control={<Radio color="primary" />} label="Organizations" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => {
          dispatch({type: 'export_hide'})
          setExportType(defaultImportType)
        }}>Cancel</Button>
        <Button variant="contained" onClick={() => {
          exportFile(exportType)
          dispatch({type: 'export_hide'})
        }}>Export</Button>
      </DialogActions>
    </Dialog>
    
  )
}
