import React from 'react';
import { TextField, Typography, Grid, Button } from '@mui/material';
import '../style.css';
import { NumberField } from '@base-ui-components/react';

const INPUT_MIN = 0;
const TRANSPARENCY_MAX = 1;
const TRANSPARENCY_STEP = 0.1;
const COLOR_MAX = 255;
const COLOR_STEP = 1;

export const ChangeHighlightColors = ({
  colorKeys,
  newColors,
  handleChange,
  handleSubmit,
  handleNoSaveClose
}) => {
  return (
    <form onSubmit={handleSubmit} noValidate>
      <Typography variant='h6' style={{ marginTop: '16px' }}>Change Highlight Colors</Typography>
      <Grid container spacing={3} sx={{marginTop: "0px"}}>
        {colorKeys.map((colorKey) => (
          colorKey !== "default" && (
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
                }}
              />
              {Object.keys(newColors[colorKey]).map((subKey) => {
                const id = React.useId();
                return (
                  <div key={subKey} style={{ marginTop: '8px' }}>
                    <NumberField.Root
                      step={subKey === 'a' ? TRANSPARENCY_STEP : COLOR_STEP}
                      min={INPUT_MIN}
                      max={subKey === 'a' ? TRANSPARENCY_MAX : COLOR_MAX}
                      id={id}
                      value={newColors[colorKey][subKey]}
                      defaultValue={100}
                      onValueChange={(value, e) => handleChange(colorKey, subKey, value)}
                    >
                      <NumberField.ScrubArea>
                        <NumberField.ScrubAreaCursor>
                          <CursorGrowIcon />
                        </NumberField.ScrubAreaCursor>
                        <label htmlFor={id} className='ScrubLabel'>
                          {`${subKey.toUpperCase()} Value`}
                        </label>
                      </NumberField.ScrubArea>
                      <NumberField.Group>
                        <NumberField.Decrement>
                          <MinusIcon />
                        </NumberField.Decrement>
                        <NumberField.Input />
                        <NumberField.Increment>
                          <PlusIcon />
                        </NumberField.Increment>
                      </NumberField.Group>
                    </NumberField.Root>
                    {/* <TextField
                      label={subKey === 'a' ? `${subKey.toUpperCase()} (Coming Soon)` : subKey.toUpperCase()}
                      name={`${colorKey}-${subKey}`}
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
                    /> */}
                  </div>
                );
              })}
            </Grid>
          )
        ))}
      </Grid>
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="secondary" type="submit">
            Save Changes
          </Button>
          <Button variant="outlined" color="error" onClick={handleNoSaveClose} style={{ marginLeft: '8px' }}>
            Exit Without Saving Changes
          </Button>
        </div>
    </form>
  );
}

function CursorGrowIcon(props) {
  return (
    <svg
      width="26"
      height="14"
      viewBox="0 0 24 14"
      fill="black"
      stroke="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
    </svg>
  );
}

function MinusIcon(props) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H10" />
    </svg>
  );
}
