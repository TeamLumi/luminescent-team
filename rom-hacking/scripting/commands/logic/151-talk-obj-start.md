# (151) _TALK_OBJ_START

## Effect

Starts a talk object script event with the placedata that called the script containing this command and makes an interaction noise. Locking player input until [_TALK_OBJ_END](153-talk-obj-end.md) is called.

Field Entities (NPCs, Pokémon, Gimmick objects) will turn to face the player and the player will turn to face them.

## Syntax

```c
_TALK_OBJ_START()
```

## Example

```c
ev_dummy:
_TALK_OBJ_START()
```

The above script will make an interaction noise, lock player input and force them to face the placedata that called the script. If the placedata is an entity, they will turn to face the player too.