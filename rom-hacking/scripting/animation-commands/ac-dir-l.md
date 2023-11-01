# (776) _AC_DIR_L

## Effect

Turns the actor of the animation left over a given amount of frames.

If the second argument is provided, the actor will invert the turn.

Starts the stepping sound effect.

## Syntax

```c
_AC_DIR_L(frames, invert?)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **frames** | The amount of frames | Float | Required |
| **invert** | Whether to invert the turn | Any | Optional |

## Example

```c
anm_dummy:
_AC_DIR_L(8)
_ACMD_END()
```

The above script will turn the actor left over 8 frames.
