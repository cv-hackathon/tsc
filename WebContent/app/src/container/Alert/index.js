import React, {forwardRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const popupState = state => state.alert

const Alert = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function CustomizedSnackbars() {
  const dispatch = useDispatch()
  const {isShow, severity, msg} = useSelector(popupState)

  const handleClose = () => {
    dispatch({type: 'alert_hide'});
  };

  return (
    <Snackbar open={isShow} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {msg}
      </Alert>
    </Snackbar>
  );
}
