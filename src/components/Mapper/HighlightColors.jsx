import React from 'react';
import { TextField, Typography, Grid } from '@mui/material';
import './style.css';

const INPUT_MIN = "0";
const TRANSPARENCY_MAX = "1";
const TRANSPARENCY_STEP = ".1";
const COLOR_MAX = "255";
const COLOR_STEP = "1";

export const ChangeHighlightColors = ({ colorKeys, newColors, handleChange }) => {
  return (
    <form>
      <Typography variant='h6' style={{ marginTop: '16px' }}>Change Highlight Colors</Typography>
      <Grid container spacing={3} sx={{marginTop: "0px"}}>
        {colorKeys.map((colorKey) => (
          <Grid item xs={12} sm={4} key={colorKey} sx={{paddingTop: "8px !important"}}>
            <Typography variant="subtitle1">
              {`${colorKey.toUpperCase()} Color`}
            </Typography>
            <div
              style={{
                width: '20px',
                height: '20px',
                marginLeft: '8px',
                backgroundColor: `rgba(${newColors[colorKey].r},${newColors[colorKey].g},${newColors[colorKey].b},${newColors[colorKey].a})`,
                border: '1px solid #fff',
              }} />
            {Object.keys(newColors[colorKey]).map((subKey) => (
              <div key={subKey} style={{ marginTop: '8px' }}>
                <TextField
                  label={subKey === 'a' ? `${subKey.toUpperCase()} (Coming Soon)` : subKey.toUpperCase()}
                  type="number"
                  variant="outlined"
                  size="small"
                  inputProps={{
                    min: INPUT_MIN,
                    max: subKey === 'a' ? TRANSPARENCY_MAX : COLOR_MAX,
                    step: subKey === 'a' ? TRANSPARENCY_STEP : COLOR_STEP,
                  }}
                  value={newColors[colorKey][subKey]}
                  onChange={(e) => handleChange(colorKey, subKey, e.target.value)}
                  disabled={subKey === 'a'}
                />
              </div>
            ))}
          </Grid>
        ))}
      </Grid>
    </form>
  );
}

