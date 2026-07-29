import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, Link, Snackbar } from "@mui/material"
import { ContentPasteGo } from "@mui/icons-material";
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import { getMoveProperties, getPokemonName } from '../../../utils/dex';
import { Trainers } from "./Trainers";
import { GAMEDATA3 } from "../../../../__gamedata";

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

  const handleOpenShowdown = () => {
    if (!selectedTrainer?.trainerId) return;

    const url = `https://calc.relumishowdown.dpdns.org/?mode=ingame&setSource=ingame&trainerId=${selectedTrainer.trainerId}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  function transformToText(pokemon) {
    var genderSymbol = "";
    
    switch (pokemon.gender) {
      case "FEMALE":
        genderSymbol = "(F)";
        break;
      case "MALE":
        genderSymbol = "(M)";
        break;
      default:
        break;
    }

    const moves = pokemon.moves.map(id => "- " + getMoveProperties(id).name).join("\n");

    return `${getPokemonName(pokemon.id)} ${genderSymbol} @ ${pokemon.item}
Level: ${pokemon.level}
${pokemon.nature} Nature
Ability: ${pokemon.ability}
EVs: ${pokemon.evhp} HP / ${pokemon.evatk} Atk / ${pokemon.evdef} Def / ${pokemon.evspatk} SpA / ${pokemon.evspdef} SpD / ${pokemon.evspeed} Spe
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
      <Tooltip title="Export to Showdown">
        <IconButton
          aria-label="Export to Showdown"
          onClick={handleExport}
          sx={{
            position: 'absolute',
            right: 60,
            top: 12,
          }}>
          <ContentPasteGo />
        </IconButton>
      </Tooltip>
      <Tooltip title="Open In Showdown">
        {/* <IconButton
          aria-label="Open In Showdown"
          onClick={handleOpenShowdown}
          to={`https://calc.relumishowdown.dpdns.org/?mode=ingame&setSource=ingame&trainerId=` + selectedTrainer?.trainerId}
          sx={{
            position: 'absolute',
            right: 108,
            top: 12,
          }}>
          <CatchingPokemonIcon />
        </IconButton> */}
      </Tooltip>
      <DialogContent dividers sx={{ maxWidth: "1108px" }}>
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
