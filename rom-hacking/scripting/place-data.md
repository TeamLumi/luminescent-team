# PlaceDatas

## Important Reminders
An important thing to note with the terminology used in BDSP is that the term "Work", is used interchangeably throughout the ROM, however it means different things depending on where you are.

- In Placedatas, the Work value refers to a flag (on/off value), this is prefixed in scripting by a # symbol, and there are 4000 of these in the basegame, with around 1800 of them being unused.
- In Stopdatas, Work refers to an actual Work value, which is a variable that holds numerical data.
- In Scripting, when we refer to a Work, we mean a Work value variable, which is prefixed in scripting with an @ symbol, there are around 440 of these in the basegame.
- Some Work values and flags are referenced by the game as system flags/system work values, these are referenced in scripting by an $ prefix and should not be tampered with unless you know what you're doing.

## What are Placedatas?

Placedatas are where you put any and all interactables that you want in your mod. Any NPC, field item, television, or legendary encounter that does absolutely anything in BDSP is a placedata object.

Placedatas are very powerful in what they allow you to express, allowing you to very simply edit the position, the size, movement or model referenced.

Unlike in NDS scripting, external areas are condensed into areas. Ie. R201 and Jubilife are all a part of Placedata_A01. The [zonemap](/rom-hacking/dictionary/zones) will help you with location which zones are where in the files via Ctrl+F zoneID: "your zone ID".

When editing Placedatas, you may need to leave the area and come back to get the edited changes to occur, as the game likes to cache your immediate area.

## JSON Structure

Here is an example from `Placedata_A01`, which is a woman in T01 - Twinleaf Town, the starter town.

```json
{
    "ID": "T01_WOMAN1",
    "zoneID": 422,
    "TrainerID": 0,
    "ObjectGraphicIndex": 135,
    "ColorIndex": 0,
    "Position": {
        "x": 119.0,
        "y": 877.0
    },
    "HeightLayer": 1,
    "HeightIgnore": 0,
    "Size": {
        "x": 0.0,
        "y": 0.0
    },
    "Rotation": 90,
    "MoveLimit": {
        "x": 1.0,
        "y": 0.0
    },
    "EventType": 0,
    "MoveCode": 3,
    "MoveParam0": 0,
    "MoveParam1": 0,
    "MoveParam2": 0,
    "TalkLabel": "ev_t01_woman1",
    "ContactLabel": "",
    "Work": 4000,
    "Dowsing": 0,
    "LoadFirst": 0,
    "DoNotLoad": 4000,
    "TalkToRange": 1.25,
    "TalkToSize": {
        "x": 0.0,
        "y": 0.0
    },
    "TalkBit": 15
}
```

## Params
### ID

The unique identifier of the PlaceData. This can be referenced in Scripting for animation commands.

The ID should follow this naming scheme. It should also be capitalized.

```
{zone_name}_{placedata_name}
```

### zoneID

The ID of the [Zone](../dictionary/zones.md) the PlaceData should be spawned in. This is an number.

### TrainerID

If you want your PlaceData object to be a "line of sight" trainer, you must provide it with a Trainer ID, which is a reference to which party you want it to have.

### ObjectGraphicIndex

This is what determines what your Placedata will look like.

| Index | Description |
| - | - |
| 1-121 | NPCs |
| 501-505 | Hidden machine blockers |
| Assetbundle Number* | Pokémon |

\* This is typically just DexID/00/00, the zeroes referring to formID, gender, shiny status and so forth. Example: 1510000 would be Mew. The actual value references the numbers in the name of the assetBundle for the field model found in `romfs\Data\StreamingAssets\AssetAssistant\Pokemon Database\pokemons\field`.

### ColorIndex

The color variation that is used by the placedata. -1 matches the player's (used for mom).

### Position

The X/Y position that your object will be placed at in the zone that you determined.

:::info
For overworld maps, 0,0 is in the top left (North West) corner of the map.
:::

### HeightLayer

The height position that your object will be placed at.

This can be lower than ground level, so if your object is not appearing/is underground, I suggest increasing this number.

:::info
Setting this number higher than ground level this should always set the object on the ground.

Might not work with some interactions.
:::

### HeightIgnore

This will allow you to interact with the object irrelevant of the height difference, if set to 1.

This is commonly used in-game when interacting with rock climb objects.

### Size

Determines the X/Y size of the object, 1 = 1 tile.

### Rotation

Determines which directional rotation your correct will stand at. 0 degrees is pointing down, 90 degrees is pointing left. See the below image for reference:

![rotation_image](/img/scripting-tutorials/PlaceData_Rotation.png)

### MoveLimit

Certain [MoveCodes](#movecode) allow your object to "wander", this will restrict it to X/Y from the starting position.

### EventType

This usually determines if something is a trainer, must be 1 if so. Otherwise, leave it at 0.

### MoveCode

Determines how your object will stand/act. Up/down/left/right/moving/sitting down are all determined by this.

| Code | Enum Name | Description | MoveParam0 | MoveParam1 | MoveParam2 |
| - | - | - | - | - | - |
| 0 | MV_DMY | | | | |
| 1 | MV_PLAYER | Static | | | |
| 2 | MV_DIR_RND | Look around | | | |
| 3 | MV_RND | Move around | | | |
| 4 | MV_RND_V | | | | |
| 5 | MV_RND_H | | | | |
| 6 | MV_RND_UL | | | | |
| 7 | MV_RND_UR | | | | |
| 8 | MV_RND_DL | | | | |
| 9 | MV_RND_DR | | | | |
| 10 | MV_RND_UDL | | | | |
| 11 | MV_RND_UDR | | | | |
| 12 | MV_RND_ULR | | | | |
| 13 | MV_RND_DLR | | | | |
| 14 | MV_UP | | | | |
| 15 | MV_DOWN | | | | |
| 16 | MV_LEFT | | | | |
| 17 | MV_RIGHT | | | | |
| 18 | MV_SPIN_L | | | | |
| 19 | MV_SPIN_R | | | | |
| 20 | MV_RT2 | | | | |
| 21 | MV_RTURLD | | | | |
| 22 | MV_RTRLDU | | | | |
| 23 | MV_RTDURL | | | | |
| 24 | MV_RTLDUR | | | | |
| 25 | MV_RTULRD | | | | |
| 26 | MV_RTLRDU | | | | |
| 27 | MV_RTDULR | | | | |
| 28 | MV_RTRDUL | | | | |
| 29 | MV_RTLUDR | | | | |
| 30 | MV_RTUDRL | | | | |
| 31 | MV_RTRLUD | | | | |
| 32 | MV_RTDRLU | | | | |
| 33 | MV_RTRUDL | | | | |
| 34 | MV_RTUDLR | | | | |
| 35 | MV_RTLRUD | | | | |
| 36 | MV_RTDLRU | | | | |
| 37 | MV_RTUL | | | | |
| 38 | MV_RTDR | | | | |
| 39 | MV_RTLD | | | | |
| 40 | MV_RTRU | | | | |
| 41 | MV_RTUR | | | | |
| 42 | MV_RTDL | | | | |
| 43 | MV_RTLU | | | | |
| 44 | MV_RTRD | | | | |
| 45 | MV_RND_UD | | | | |
| 46 | MV_RND_LR | | | | |
| 47 | MV_SEED | | | | |
| 48 | MV_PAIR | | | | |
| 49 | MV_REWAR | | | | |
| 50 | MV_TR_PAIR | | | | |
| 51 | MV_HIDE_SNOW | | | | |
| 52 | MV_HIDE_SAND | | | | |
| 53 | MV_HIDE_GRND | | | | |
| 54 | MV_HIDE_KUSA | | | | |
| 55 | MV_CODE_MAX | | | | |

### MoveParam0 MoveParam1 MoveParam2

Certain [MoveCodes](#movecode) require this, more research required, but when using TrainerIDs, you must have a [MoveCode](#movecode) of 14-17 and a MoveParam0 of how many tiles you want the trainer's line of sight to be.

### TalkLabel

This is the function name that will be called when you interact with the object and is how you get scripts called upon interaction with an NPC.

### ContactLabel

This is the function name that will be called when you walk into range of the object's TalkToRange.

### Work

This is a flag and is what determines if the object is visible/invisible.

With a flag of 4000 it will always be visible.

For example, if your object has a Work of 2816 and that flag is "set" during a script with [_FLAG_SET](commands/gamedata/041-flag-set.md), the next time you enter that zone, the object will no longer be there.

### Dowsing

Accepts values of 0-2, 1-2 if the item is intended as a hidden item, it's what determines how far away your itemfinder will pick it up.

### LoadFirst

Gives a priority to the loading of objects that may exist on the same tile, or require priority loading.

### DoNotLoad

Stubbed?

### TalkToRange

Determines how far away you can be in order to interact with the object. 99% of the time, just leave this at 1.25

### TalkToSize

Determines how far away you can be in order to interact with the object.

### Talkbit

Determines which direction you can talk to an object from, best practice is to leave this at 15.
