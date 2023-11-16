import React, { useState } from 'react';
import { Modal, Button, TextField, Typography, Grid, Box } from '@mui/material';
import {useColorMode} from '@docusaurus/theme-common';
import './style.css';

const SettingsModal = ({ colors, setColors, showModal, onHide }) => {
  const {colorMode, setColorMode} = useColorMode();
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
        <Box boxShadow={colorMode === 'dark' ? 0 : 4} p={2} bgcolor="background.main">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
            <Typography variant="h6" sx={{ width: '90%' }}>Edit Colors</Typography>
            <Button onClick={handleNoSaveClose} color='error' variant='contained'>X</Button>
          </div>
        </Box>
        <form>
          <Grid container spacing={3}>
            {colorKeys.map((colorKey) => (
              <Grid item xs={12} sm={4} key={colorKey}>
                <Typography variant="subtitle1" style={{ marginTop: '16px' }}>
                  {`${colorKey.toUpperCase()} Color`}
                </Typography>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    marginLeft: '8px',
                    backgroundColor: `rgba(${newColors[colorKey].r},${newColors[colorKey].g},${newColors[colorKey].b},${newColors[colorKey].a})`,
                    border: '1px solid #fff',
                  }}
                />
                {Object.keys(newColors[colorKey]).map((subKey) => (
                  <div key={subKey} style={{ marginTop: '8px' }}>
                    <TextField
                      label={subKey.toUpperCase()}
                      type="number"
                      variant="outlined"
                      size="small"
                      inputProps={{
                        min: subKey === 'a' ? '0' : '0',
                        max: subKey === 'a' ? '1' : '255',
                        step: subKey === 'a' ? '0.1' : '1',
                      }}
                      value={newColors[colorKey][subKey]}
                      onChange={(e) => handleChange(colorKey, subKey, e.target.value)}
                    />
                  </div>
                ))}
              </Grid>
            ))}
          </Grid>
        </form>
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
