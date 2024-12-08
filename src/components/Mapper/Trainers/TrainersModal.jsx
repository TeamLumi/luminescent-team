import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, Snackbar } from "@mui/material"
import Button from '@mui/material/Button';  
import CloseIcon from '@mui/icons-material/Close';
import { getMoveProperties, getPokemonName } from '../../../utils/dex';
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
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const handleExport = () => {
    const showdownMon = selectedTrainer.team.map(pokemon => transformToText(pokemon));
    const exportText = showdownMon.join("\n\n");
    navigator.clipboard.writeText(exportText).then(() => {
      setShowSnackbar(true);
    });

  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  function transformToText(pokemon) {
    const genderSymbol = pokemon.gender === "FEMALE" ? "(F)" : "(M)";
    const moves = pokemon.moves.map(id => "- " + getMoveProperties(id).name).join("\n");
    
    return `${getPokemonName(pokemon.id)} ${genderSymbol} @ ${pokemon.item}
Level: ${pokemon.level}
${pokemon.nature} Nature
Ability: ${pokemon.ability}
EVs: ${pokemon.evhp} HP / ${pokemon.evatk} Atk / ${pokemon.evdef} Def / ${pokemon.evspatk} SpA / ${pokemon.evspeed} Spe
IVs: ${pokemon.ivhp} HP / ${pokemon.ivatk} Atk / ${pokemon.ivdef} Def / ${pokemon.ivspatk} SpA / ${pokemon.ivspdef} SpD / ${pokemon.ivspeed} Spe
${moves}`;
  }

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
      <Button
              variant="outlined"
              sx={{ margin: "0.5rem 1rem" }}
              onClick={handleExport}
            >
              Export to Showdown
      </Button>
      <DialogContent dividers sx={{maxWidth: "1108px"}}>
        <Trainers
          pokemonList={pokemonList}
          selectedTrainer={selectedTrainer}
        />
      </DialogContent>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Copied to clipboard successfully!"
      />
    </Dialog>
  )
};

export default TrainersModal;
