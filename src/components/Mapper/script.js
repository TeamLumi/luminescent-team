const canvas = document.getElementById('myCanvas');
const displaySelectedLocation = document.getElementById('selectedLocation');
const displayCurrentCoords = document.getElementById('currentCords');
const displayLastClickedCoords = document.getElementById('lastClickedCoords');
const displaySelectedEncounterTable = document.getElementById('selectedEncounters');

const ctx = canvas.getContext('2d');
let lastLocation = undefined;

canvas.addEventListener('click', canvasClickHandler);
canvas.addEventListener('mousemove', canvasMoveHandler);


function canvasMoveHandler(event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    displayCurrentCoords.innerText = `X: ${x}, Y: ${y}`;
    const selectedLocation = getSelectedLocation(x, y);

    const updateHighlightedBoundary =
        (selectedLocation === null  && lastLocation !== undefined) ||
        (selectedLocation === null) ||
        (selectedLocation.name !== lastLocation);
        
    if(updateHighlightedBoundary) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        coordinates.map(drawCollisionBoxes)
        lastLocation = undefined;
    }

    if(selectedLocation !== null && selectedLocation.name !== lastLocation) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(225,225,0,0.75)'
        ctx.fillRect(selectedLocation.x, selectedLocation.y, selectedLocation.w, selectedLocation.h);
        lastLocation = selectedLocation.name;
    }
}

function canvasClickHandler(event) {
    getCursorPosition(canvas, event);
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    
    const selectedLocation = getSelectedLocation(x, y);
    if(selectedLocation !== null) {
        displayLastClickedCoords.innerText = `X: ${x}, Y: ${y}`;
        displaySelectedLocation.innerText = selectedLocation.name;
        getSelectedEncounterTable(selectedLocation.name);
    }
}

function getSelectedLocation(x, y) {
    const location = coordinates.filter(coords => {
        return (coords.x <= x && x <= (coords.x + coords.w)) &&
         (coords.y <= y && y <= (coords.y + coords.h))
    })
    if(location.length === 0) return null;
    return location[0];
}

function createDisplayElement(data) {
    if(!Array.isArray(data)) return {type: 'text', data};
    if(data.length === 0) return {type: 'text', data: 'None'};
    if(!Object.keys(data[0]).includes('monsNo')) return {type: 'text', data: JSON.stringify(data)};

    const filteredDataArray = data.filter(e => e['monsNo'] !== 0);
    if(filteredDataArray.length === 0) return {type: 'text', data: 'None'};
    const ul = document.createElement('ul');
    for(let dataObject of filteredDataArray) {
        console.log('test:', dataObject);
        const li = document.createElement('li');
        li.textContent = `Lvl - ${dataObject['maxlv']} ${
            getPokemonName(dataObject['monsNo'])
        }`;
        ul.appendChild(li);
    }
    return {type: 'html', data: ul};
}

function getPokemonName(monsno) {
    console.log('HMM:', monsno);
    if(monsno > 65000) {
        form_no = Math.floor(monsno/(2**16));
        lumi_formula_mon = monsno - (form_no * (2**16));
        return POKEMON_NAMES['labelDataArray'][lumi_formula_mon]['wordDataArray'][0]['str'];
    }
    return POKEMON_NAMES['labelDataArray'][monsno]['wordDataArray'][0]['str'];
}

function createPokemonTable(data) {
    const table = document.createElement('table');
    table.id = 'encounterTable';

    const headerRow = table.insertRow(0);
    
    for (let key of Object.keys(data)) {
      let headerCell = document.createElement('th');
      headerCell.textContent = key;
      headerRow.appendChild(headerCell);
    }
    
    let valueRow = table.insertRow(1);

    for (let key in data) {
      let valueCell = document.createElement('td');
      const cellDisplayContent = createDisplayElement(data[key]);
      if(cellDisplayContent.type === 'text') {
        valueCell.textContent = cellDisplayContent.data;
      } else {
        valueCell.appendChild(cellDisplayContent.data);
      }

      valueRow.appendChild(valueCell);
    }
    
    return table;
}

function getSelectedEncounterTable(locationName) {
    const label = ZONE_NAMES.labelDataArray.find(e => e.wordDataArray[0].str === locationName).labelName;
    const zoneId = MAP_INFO.find(m => m.PokePlaceName === label).ZoneID;
    const encounters = ENCOUNTER_TABLE["table"].find(e => e.zoneID === zoneId);
    console.log(locationName, label, zoneId, encounters);
    const encounterTable = document.getElementById('encounterTable');
    if(encounterTable !== null) {
        displaySelectedEncounterTable.removeChild(encounterTable);
    }
    
    displaySelectedEncounterTable.appendChild(createPokemonTable(encounters));//JSON.stringify(encounters) || "No encounters in this zone.";
}

function drawCollisionBoxes(coord) {
    ctx.beginPath();
    ctx.lineWidth = "4";
    ctx.strokeStyle = "black";
    ctx.rect(coord.x, coord.y, coord.w, coord.h);
    ctx.stroke();
}

coordinates.map(drawCollisionBoxes)