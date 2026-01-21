import React from 'react';
import Typography from '@mui/material/Typography';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

/**
 * InfoDialog component to display information dialog.
 */
const InfoDialog = ({
  dialogOpened,
  setDialogOpened,
  dialogTitle,
  dialogContent,
}) => {
  return (
    <>
      <IconButton onClick={() => setDialogOpened(true)}>
        <HelpOutlineIcon color="secondary" />
      </IconButton>
      <Dialog
        onClose={() => setDialogOpened(false)}
        open={dialogOpened}
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>{dialogTitle}</DialogTitle>
        <DialogContent dividers>{dialogContent}</DialogContent>
      </Dialog>
    </>
  );
};

export default InfoDialog;
