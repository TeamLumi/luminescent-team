# Scripting introduction

Scripting in BDSP allows you to influence different parts of the game.

Be it showing dialogues, moving NPCs and the player around and setting various flags to make the game work.

## Functions

Functions are written in `.ev` files. These can be edited by unpacking the file `romfs/Data/StreamingAssets/AssetAssistant/Dpr/ev_script` using [Aldo's BDSP Repacker](https://github.com/Ai0796/BDSP-Repacker).

Each zone has it's own script file. The name is the [Zone](../dictionary/zones.md) name. For example `c01.ev` for Jubilife City.

These script files contain two different types of function that serve different purposes.

- Script functions
- Animation functions

### Naming schemes

Function naming should follow this scheme: `{type}_{zone_name}_{function_name}`.

This is not strictly necessary, but strongly recommended to keep things organized.

#### Type

| Type | Description |
| - | - |
| ev | Script functions called by [PlaceData](place-data.md) |
| pos | Script functions called by [StopData](stop-data.md) |
| anm | Animation functions |

#### Zone name

The zone name in lowercase letters. `c01` for Jubilife City or `r201` for Route 201.

See [Zones](../dictionary/zones.md) for a list of zones.

#### Function name

The actual name your function should have. Try to keep this as descriptive as possible, to make reading the code easier.

Something like `cynthia_give_egg` or even just `rival` if this is the rival talking function of the zone.

#### Example function names

Here are some example function names:

```c
ev_c01_rival
anm_c01_rival
pos_r207_galactic_blocker
```

### Comments

To make a comment, simply add a semicolon `;` and type your comment.

```c
ev_c01_greet_player:; This function makes the professor greet the player
```

### How to make the game run your functions

There are four main ways to make the game run your custom functions.

1. Calling your function from a map script (usually defined in the `sp_{zone_code}.ev` file)
2. Referencing your function name in the `TalkLabel` of a [PlaceData](place-data.md)
3. Referencing your function name in the `ContactLabel` of a [StopData](stop-data.md)
4. Calling your function from another function that's already in the script using a [_JUMP](commands/logic/024-jump.md) or a [_CALL](commands/logic/028-call.md) function

## Flags

Flags are a way to store various data about your game state. Flags can either be set (1) using [_FLAG_SET](commands/gamedata/041-flag-set.md) or reset (0) using [_FLAG_RESET](commands/gamedata/043-flag-reset.md).

### Example

Here is an example of a legendary being fought, despawned and then made sure it is not encounterable again.

Part of the [PlaceData](place-data.md) of the legendary:
```c
{
    "ID": "C01_DARKRAI",
    "zoneID": 0,
    [...],
    "TalkLabel": "ev_c01_darkrai",
    "ContactLabel": "",
    "Work": 3000,
    [...]
}
```

The function that handles the Darkrai event:

```c
ev_c01_darkrai:
_SP_WILD_BTL_SET(491, 80); Fight Darkrai
_OBJ_DEL('C01_DARKRAI'); Hide Darkrai - this also sets the flag 3000 for us
_END()
```

## PlaceData quirks

The `Work` value of a [PlaceData](place-data.md) is only checked when entering the [Zone](../dictionary/zones.md).

This means if you change the Flag state of a [PlaceData](place-data.md) in the [Zone](../dictionary/zones.md) you are currently in, this will not be effective until you exit and re-enter that [Zone](../dictionary/zones.md).

For example to make an object disappear in the future, starting the moment you are in the [Zone](../dictionary/zones.md), you need to both set the Flag using [_FLAG_SET](commands/gamedata/041-flag-set.md) and [_OBJ_DEL](commands/interface/147-obj-del.md).

The same goes for [_FLAG_RESET](commands/gamedata/043-flag-reset.md) and [_OBJ_ADD](commands/interface/146-obj-add.md) if you want to make a [PlaceData](place-data.md) appear and make it stay even when the [Zone](../dictionary/zones.md) is reloaded.

## Text output buffer

There are different functions for displaying textboxes.

Textboxes get their content from JSON-Files. This is done in Scripting.

These JSON-Files house all the text used in the game and can be referenced whenever to get the text to display it in a textbox.

Some texts have placeholder values. These can be replaced with any text from the buffer.

The easiest way is to use `_MACRO_*` commands. If you use these, ev-as converts these into text for you. Depending on which Tags you use, you may need to manually edit the Tag list in the JSON-File.
