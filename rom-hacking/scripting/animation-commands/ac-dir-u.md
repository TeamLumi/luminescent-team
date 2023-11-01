# (773) _AC_DIR_U

## Effect

Turns the actor of the animation up over a given amount of frames.

If the second argument is provided, the actor will invert the turn.

Starts the stepping sound effect.

## Syntax

```c
_AC_DIR_U(frames, invert?)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **frames** | The amount of frames | Float | Required |
| **invert** | Whether to invert the turn | Any | Optional |

## Example

```c
anm_dummy:
_AC_DIR_U(8)
_ACMD_END()
```

The above script will turn the actor up over 8 frames.
