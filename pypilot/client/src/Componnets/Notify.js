import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Notify({open,setOpen,severity,msg}) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
   
      <Snackbar anchorOrigin={{ vertical:'top',horizontal:"center" }} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
        
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {msg}
        </Alert>
      </Snackbar>

  );
}
