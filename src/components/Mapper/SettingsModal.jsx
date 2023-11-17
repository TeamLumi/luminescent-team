import React, { useState } from 'react';
import { Modal, Button, Typography, Box } from '@mui/material';
import './style.css';
import { ChangeHighlightColors } from './HighlightColors';

const SettingsModal = ({ colors, setColors, showModal, onHide }) => {
  const [newColors, setNewColors] = useState(colors);

  const handleChange = (colorKey, subKey, value) => {
    setNewColors({
      ...newColors,
      [colorKey]: {
        ...newColors[colorKey],
        [subKey]: value,
      },
    });
  };

  const handleClose = () => {
    setColors(newColors);
    onHide();
  };

  const handleNoSaveClose = () => {
    setColors(colors);
    onHide();
  };

  const colorKeys = Object.keys(newColors);

  return (
    <Modal open={showModal} onClose={handleNoSaveClose}>
      <Box className='modalBox' sx={{ padding: '16px' }}>
        <Box boxShadow={4} p={2} bgcolor="background.main">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
            <Typography variant="h6" sx={{ width: '90%' }}>Settings</Typography>
            <Button onClick={handleNoSaveClose} color='error' variant='contained'>X</Button>
          </div>
        </Box>
        <ChangeHighlightColors
          colorKeys={colorKeys}
          newColors={newColors}
          handleChange={handleChange}
        />
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'start' }}>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Save Changes
          </Button>
          <Button variant="outlined" color="error" onClick={handleNoSaveClose} style={{ marginLeft: '8px' }}>
            Exit Without Saving Changes
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default SettingsModal;
