# Quick and Dirty Scripting Guide

## Introduction
This part of the guide will introduce you to Placedatas (known as Overworlds and Spawnables in NDS scripting), Stopdatas (known as triggers). We will also provide some contextual information to certain nomenclature that is used within BDSP as a base.

An important thing to note with the terminology used in BDSP is that the term "Work", is used interchangeably throughout the ROM, however it means different things depending on where you are.
- In Placedatas, the Work value refers to a flag (on/off value), this is prefixed in scripting by a # symbol, and there are 4000 of these in the basegame, with around 1800 of them being unused.
- In Stopdatas, Work refers to an actual Work value, which is a variable that holds numerical data.
- In Scripting, when we refer to a Work, we mean a Work value variable, which is prefixed in scripting with an @ symbol, there are around 440 of these in the basegame.
- Some Work values and flags are referenced by the game as system flags/system work values, these are referenced in scripting by an $ prefix and should not be tampered with unless you know what you're doing.

## What are Placedatas?
Placedatas are where you put any and all interactables that you want in your mod. Any NPC, field item, or television that does absolutely anything in BDSP is a placedata object.

Placedatas are very powerful in what they allow you to express, allowing you to very simply edit the position, the size, movement or model referenced.

Unlike in NDS scripting, external areas are condensed into areas. Ie. R201 and Jubilife are all a part of Placedata_A01. The zonemap will help you with location which zones are where in the files via Ctrl+F zoneID: "your zone ID".

When editing Placedatas, you may need to leave the area and come back to get the edited changes to occur, as the game likes to cache your immediate area.

Here is an example from Placedata_A01, which is a woman in T01, which is the starter town.
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

        },
```

Here is a brief rundown on what these properties do:
- ID: Must be unique and is how the placedata object is called/referenced in scripting, it is good practice to keep this capitalized.
- ZoneID: This is what determines which zone the placedata appears in, a list of zoneIDs will be made available at a later point.
- TrainerID: If you want your placedata object to be a "line of sight" trainer, you must provide it with a trainerID, which is a reference to which party you want it to have.
- ObjectGraphicIndex: This is what determines what your Placedata will look like, for example, 1 -> 121 would be your different NPCs, 501-505 would be your different hidden machine blockers, such as cut trees and strength boulders. To reference Pokemon you would use DexID/00/00, the zeroes referring to formID, gender, shiny status and so forth. Example: 1510000 would be Mew.
- ColorIndex: Unknown
- Position: The X/Y position that your object will be placed at in the zone that you determined.
- HeightLayer: The height position that your object will be placed at. This cannot be higher than ground level, but it can be lower, so if your object is not appearing/is underground, I suggest increasing this number.
- HeightIgnore: This will allow you to interact with the object irrelevant of the height difference, if set to 1. This is commonly used in-game when interacting with rock climb objects.
- Size: Determines the X/Y size of the object, 1 = 1 tile.
- Rotation: Determines which directional rotation your correct will stand at. 0-360.
- MoveLimit: Certain movecodes allow your object to "wander", this will restrict it to X/Y from the starting position.
- EventType: This usually determines if something is a trainer, must be 1 if so. Otherwise, leave it at 0.
- MoveCode: Determines how your object will stand/act. Up/down/left/right/moving/sitting down are all determined by this. 
- MoveParam0-2:  Certain movecodes require this, more research required, but when using TrainerIDs, you must have a movecode of 14-17 and a moveparam0 of how many tiles you want the trainer's line of sight to be.
- TalkLabel: **This is the function name that will be called when you interact with the object** and is how you get scripts called upon interaction.
- ContactLabel: Pretty sure this is stubbed. Never managed to get it working.
- Work: This is a flag and is what determines if the object is visible/invisible. With a flag of 4000 it will always be visible. For example, if your object has a Work of 2816 and that flag is "set" during a script, the next time you enter that area, the object will no longer be there.
- Dowsing: Accepts values of 0-2, 1-2 if the item is intended as a hidden item, it's what determines how far away your itemfinder will pick it up.
- LoadFirst: Gives a priority to the loading of objects that may exist on the same tile, or require priority loading.
- DoNotLoad: Stubbed?
- TalkToRange: Determines how far away you can be in order to interact with the object.
- TalkToSize: The same.
- TalkBit: Determines which direction you can talk to an object from, best practice is to leave this at 15.


## What are Stopdatas?
Stopdatas are your "trigger" events and require a Work variable to have a certain value in them in order to be triggered when the player steps on the specified tile. The player, if travelling fast enough with a variable framerate, **can skip past single width triggers**, hence why ILCA adds invisible walls (OGI 556) everywhere in the basegame.

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

ID: The ID of which the trigger can be referenced.
Position: The X/Y position of the initial tile
HeightLayer: The height position.
Size: The size of the trigger in X/Y directions.
ContactLabel: The script function name that is called upon entering the trigger zone.
Param: The value that must be in the specified work value in order for the event to trigger.
Work: The specified Work value.