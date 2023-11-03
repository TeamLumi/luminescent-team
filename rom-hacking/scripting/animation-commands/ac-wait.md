# (779) AC_WAIT

## Effect

Waits a given amount of time.

Sets animation clip to 0 (Idle).

## Syntax

```c
_AC_WAIT(time)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **time** | The amount of time to wait, in frames (1/30ths of a second) | Float | Required |

## Example

```c
anm_dummy:
_AC_DIR_U(8)
_AC_WAIT(8)
_AC_DIR_D(8)
_ACMD_END()
```

The above script will wait 8 frames between turning the actor up and down.
