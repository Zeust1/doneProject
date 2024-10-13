import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { forwardRef, useImperativeHandle } from 'react';
import loading from '../../../public/loading.svg'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: 'none',
  outline: 'none'
};

const Onloading = (props, ref) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setTimeout(setOpen(true), 3000);
  const handleClose = () => setTimeout(setOpen(false), 3000);

  useImperativeHandle(ref ,() => ({onOpen:handleOpen,onClose:handleClose}))


  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>
            <img src={loading} alt="loading..."/>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}


export default forwardRef(Onloading)