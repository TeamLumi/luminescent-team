# (774) _AC_DIR_R

## Effect

Turns the actor of the animation right over a given amount of frames.

If the second argument is provided, the actor will invert the turn.

Starts the stepping sound effect.

## Syntax

```c
_AC_DIR_R(frames, invert?)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **frames** | The amount of frames | Float | Required |
| **invert** | Whether to invert the turn | Any | Optional |

## Example

```c
anm_dummy:
_AC_DIR_R(8)
_ACMD_END()
```

The above script will turn the actor right over 8 frames.
