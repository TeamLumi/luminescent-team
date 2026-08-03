# (819) _DUMMY_SET_POS_HERO

## Effect

Moves the invisible Dummy Field Object to the position of the player.

The Field Camera can be attached to this Dummy object for simple camera moves.

## Syntax

```c
_DUMMY_SET_POS_HERO()
```

## Example

```c
ev_dummy:
_DUMMY_SET_POS_HERO()
_CAMERA_TARGET_DUMMY()
_DUMMY_ANIME('anm_dummy')
_DUMMY_ANIME_WAIT()
anm_dummy:
_AC_UP(5, 8)
_ACMD_END()
```

The above script will move the Dummy Field Object to the position of the player. It will then attach the Field Camera to it and move forward by 5 tiles.