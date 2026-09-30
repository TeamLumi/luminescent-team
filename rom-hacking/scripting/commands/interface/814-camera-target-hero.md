# (814) _CAMERA_TARGET_HERO

## Effect

Attaches the Field Camera to the player.

## Syntax

```c
_CAMERA_TARGET_HERO()
```

## Example

```c
ev_dummy:
_DUMMY_SET_POS_HERO()
_CAMERA_TARGET_DUMMY()
_DUMMY_ANIME('anm_dummy')
_DUMMY_ANIME_WAIT()
_BLACK_OUT()
_FADE_WAIT()
_DUMMY_SET_POS_HERO()
_CAMERA_TARGET_HERO()
_BLACK_IN()
_FADE_WAIT()
anm_dummy:
_AC_UP(5, 8)
_ACMD_END()
```

The above script will move the Dummy Field Object to the position of the player. It will then attach the Field Camera to it and move forward by 5 tiles. It then blacks out the screen, moves the Dummy Field Object back to the player and re-attaches the Field Camera to the player before fading the screen back in.