import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {

  const handleClose = () => {
    props.onAlertOpen();
  };

  return (
    <Dialog
    open={props.isAlertOpen}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">{props.alertContent}</DialogTitle>
    {/* <DialogContent>
        <DialogContentText id="alert-dialog-description">

        </DialogContentText>
    </DialogContent> */}
    <DialogActions>
        <Button onClick={handleClose} color="primary">
        Close
        </Button>
    </DialogActions>
    </Dialog>
  );
}
