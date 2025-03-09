# StopData

:::info
This page is WIP and may not be complete in some parts.
:::

Stopdatas in BDSP are your "trigger" events and require a Work variable to have a certain value in them in order to be triggered when the player steps on the specified tile. The player, if travelling fast enough with a variable framerate, **can skip past single width triggers**, hence why ILCA adds invisible walls (OGI 556) everywhere in the basegame.

Stopdatas will only trigger when your work value has the specified param inside.
For example, if you are using work value of 440 and a param of 1. If @440 does not equal to 1 in memory, the event will not trigger. In scripting you change what a work value holds by using `_LDVAL(@440, 1)`

Not every zone has a stopdata available, which is problematic until we get monoscript insertion working. This means you are restricted in which zones you can add trigger events.

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
The ID of which the trigger can be referenced.

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
