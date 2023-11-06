# (779) AC_WAIT

## Effect

Waits a given amount of time.

Sets animation clip to 0 (Idle).

## Syntax

```c
_AC_WAIT(frames)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **frames** | The amount of frames to wait | Float | Required |

## Example

```c
anm_dummy:
_AC_DIR_U(8)
_AC_WAIT(8)
_AC_DIR_D(8)
_ACMD_END()
```

The above script will wait 8 frames between turning the entity up and down.
