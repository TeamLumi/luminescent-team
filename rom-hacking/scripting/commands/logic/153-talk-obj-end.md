# (153) _TALK_OBJ_END

## Effect

Unlocks player input in the current script event.

The player and the placedata that called the script (if one is present) will stop being forced to face each other.

## Syntax

```c
_TALK_OBJ_END()
```

## Example

```c
_TALK_OBJ_END()
_SE_PLAY('S_PINPON')
_END()
```

The above script will unlock the player and placedata and will then play the 'S_PINPON' sound effect. The player will be able to move while the sound effect is playing.