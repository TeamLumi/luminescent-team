# PlaceData

PlaceData in BDSP are object in the game that are placed down throughout the world. This can be anything from NPCs to hidden items to static legendary encounters and more.

## JSON Structure

Here is an example from `Placedata_A01`, which is a woman in T01 - Twinleaf Town, which is the starter town.

```c
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

## Attributes

### ID

The unique identifier of the PlaceData. This can be referenced in Scripting for animation commands.

The ID should follow this naming scheme.

```
{AREA_NAME}_{PLACEDATA_NAME}
```

### zoneID

The ID of the [Area](../dictionary/areas.md) the PlaceData should be spawned in. This is an number.

### TrainerID

If you want your PlaceData object to be a "line of sight" trainer, you must provide it with a Trainer ID, which is a reference to which party you want it to have.

### ObjectGraphicIndex

This is what determines what your Placedata will look like.

| Index | Description |
| - | - |
| 1-121 | NPCs |
| 501-505 | Hidden machine blockers |
| Assetbundle Number* | Pokémon |

\* This might just be DexID/00/00, the zeroes referring to formID, gender, shiny status and so forth. Example: 1510000 would be Mew.

### ColorIndex

Unknown

### Position

The X/Y position that your object will be placed at in the zone that you determined.

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

Determines which directional rotation your correct will stand at. 0-360.

### MoveLimit

Certain [MoveCodes](#movecode) allow your object to "wander", this will restrict it to X/Y from the starting position.

### EventType

This usually determines if something is a trainer, must be 1 if so. Otherwise, leave it at 0.

### MoveCode

Determines how your object will stand/act. Up/down/left/right/moving/sitting down are all determined by this.

| Code | Description | MoveParam0 | MoveParam1 | MoveParam2 |
| - | - | - | - | - |
| 0 | | | | |
| 1 | Static | | | |
| 2 | Look around | | | |
| 3 | Move around | | | |
| 4 | | | | |
| 5 | | | | |
| 7 | | | | |
| 8 | | | | |
| 9 | | | | |
| 10 | | | | |
| 12 | | | | |
| 13 | | | | |
| 14 | | | | |
| 15 | | | | |
| 16 | | | | |
| 17 | | | | |
| 20 | | | | |
| 36 | | | | |
| 40 | | | | |
| 42 | | | | |
| 45 | | | | |
| 53 | | | | |
| 54 | | | | |

### MoveParam0 MoveParam1 MoveParam2

Certain [MoveCodes](#movecode) require this, more research required, but when using TrainerIDs, you must have a [MoveCode](#movecode) of 14-17 and a MoveParam0 of how many tiles you want the trainer's line of sight to be.

### TalkLabel

This is the function name that will be called when you interact with the object and is how you get scripts called upon interaction.

### ContactLabel

Pretty sure this is stubbed. Never managed to get it working.

### Work

This is a flag and is what determines if the object is visible/invisible.

With a flag of 4000 it will always be visible.

For example, if your object has a Work of 2816 and that flag is "set" during a script with [_FLAG_SET](commands/flag-set.md), the next time you enter that area, the object will no longer be there.

### Dowsing

Accepts values of 0-2, 1-2 if the item is intended as a hidden item, it's what determines how far away your itemfinder will pick it up.

### LoadFirst

Gives a priority to the loading of objects that may exist on the same tile, or require priority loading.

### DoNotLoad

Stubbed?

### TalkToRange

Determines how far away you can be in order to interact with the object.

### TalkToSize

Determines how far away you can be in order to interact with the object.

### Talkbit

Determines which direction you can talk to an object from, best practice is to leave this at 15.
