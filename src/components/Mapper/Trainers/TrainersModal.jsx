import React, { useRef, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material"

import { TrainerDropdown, Trainers } from "./Trainers";

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
      maxWidth="1100px"
    >
      <DialogTitle>
        Trainer: {selectedTrainer?.team_name}
      </DialogTitle>
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
