# (818) _DUMMY_SET_POS

## Effect

Moves the invisible Dummy Field Object to the specified X and Z coordinates.

The Field Camera can be attached to this Dummy object for simple camera moves.

## Syntax

```c
_DUMMY_SET_POS(X, Z)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **X** | The X coordinate | Number, Work | Required |
| **Z** | The Z coordinate | Number, Work | Required |


## Example

```c
ev_dummy:
_DUMMY_SET_POS(67, 69)
_CAMERA_TARGET_DUMMY()
_DUMMY_ANIME('anm_dummy')
_DUMMY_ANIME_WAIT()
anm_dummy:
_AC_UP(2, 8)
_AC_RIGHT(2, 8)
_ACMD_END()
```

The above script will move the Dummy Field Object to 67 X, 69 Z. It will then attach the Field Camera to it and move to 69 X, 67 Z.