# (777) _ACMD_END

## Effect

Ends the current animation.

Resets _moveOffset to (0, 0, 0).

Sets animation clip to 0 (Idle).

Stops the stepping sound effect.

## Syntax

```c
_ACMD_END()
```

## Example

```c
anm_dummy:
_AC_DIR_D(8)
_ACMD_END()
```

The above script will end the animation after facing the entity down.
