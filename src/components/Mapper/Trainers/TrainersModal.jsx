import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

import { Trainers } from "./Trainers";

const TrainersModal = ({
  showModal,
  onHide,
  pokemonList,
  selectedTrainer,
}) => {
  const handleClose = () => {
    onHide();
  };
  return (
    <Dialog
      open={showModal}
      onClose={handleClose}
      maxWidth="1108px"
    >
      <DialogTitle>
        Trainer: {selectedTrainer?.team_name}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 12,
          top: 12,
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers sx={{maxWidth: "1108px"}}>
        <Trainers
          pokemonList={pokemonList}
          selectedTrainer={selectedTrainer}
        />
      </DialogContent>
    </Dialog>
  )
};

export default TrainersModal;
