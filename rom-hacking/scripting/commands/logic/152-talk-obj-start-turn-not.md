# (152) _TALK_OBJ_START_TURN_NOT

## Effect

Starts a talk object script event with the placedata that called the script containing this command and makes an interaction noise. Locking player input until [_TALK_OBJ_END](153-talk-obj-end.md) is called.

Field Character Entities (NPCs) will turn their neck in the direction of the player but not their body. The player will turn their whole body to face them.

## Syntax

```c
_TALK_OBJ_START_TURN_NOT()
```

## Example

```c
ev_dummy:
_TALK_OBJ_START_TURN_NOT()
```

The above script will make an interaction noise, lock player input and force them to face the placedata that called the script. If the placedata is an Field Character Entity, they will turn their neck in the direction of the player.