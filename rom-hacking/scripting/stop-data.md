# StopData

:::info
This page is WIP and may not be complete in some parts.
:::

## Important Reminders
An important thing to note with the terminology used in BDSP is that the term "Work", is used interchangeably throughout the ROM, however it means different things depending on where you are.

- In Placedatas, the Work value refers to a flag (on/off value), this is prefixed in scripting by a # symbol, and there are 4000 of these in the basegame, with around 1800 of them being unused.
- In Stopdatas, Work refers to an actual Work value, which is a variable that holds numerical data.
- In Scripting, when we refer to a Work, we mean a Work value variable, which is prefixed in scripting with an @ symbol, there are around 440 of these in the basegame.
- Some Work values and flags are referenced by the game as system flags/system work values, these are referenced in scripting by an $ prefix and should not be tampered with unless you know what you're doing.

## What are Stopdatas?
Stopdatas in BDSP are your "trigger" events and require a Work variable to have a certain value in them in order to be triggered when the player steps on the specified tile. The player, if travelling fast enough with a variable framerate, **can skip past single width triggers**, hence why ILCA adds invisible walls (OGI 556) everywhere in the basegame.

Stopdatas will only trigger when your work value has the specified param inside.
For example, if you are using work value of 440 and a param of 1. If @440 does not equal to 1 in memory, the event will not trigger. In scripting you change what a work value holds by using `_LDVAL(@440, 1)`

In Vanilla BDSP not every zone has a stopdata available. This means you are restricted in which zones you can add trigger events. However, by ripping the masterdatas bundle to Unity using AssetRipper, we are able to add more to it (documentation surrounding this coming soon™).

```json
{
    "ID": "SCRID_POS_T01_STOP",
    "Position": {
        "x": 108.0,
        "y": 867.0
    },
    "HeightLayer": 1,
    "Size": {
        "x": 8.0,
        "y": 1.0
    },
    "ContactLabel": "pos_t01_stop",
    "Param": 1,
    "Work": 48
},
```

## Params
### ID:
The Unique ID of which the trigger can be referenced.

The ID should follow this naming scheme. It should also be capitalized.

```
POS_{zone_name}_{stopdata_name}
```

### Position:
The X/Y position of the initial tile. You'll want this to be in the top left or NorthWest most tile as the Size parameter adds tiles going East and South or right and down.

### HeightLayer:
The height position.

### Size:
The size of the trigger in X/Y directions. Increasing the size will add to the East and South for the x and y parameters.

### ContactLabel:
The script function name that is called upon entering the trigger zone.

### Param:
The value that must be in the specified work value in order for the event to trigger.

### Work:
The specified Work value.
