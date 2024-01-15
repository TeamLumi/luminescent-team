# (773) _AC_DIR_U

## Effect

Turns the entity of the animation up over a given amount of frames.

The entity always makes the smallest turn possible. If the **invert** argument is provided, the entity will turn the longer way around.

Starts the stepping sound effect.

## Syntax

```c
_AC_DIR_U(time, invert?)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **time** | The amount of time to turn, in frames | Float | Required |
| **invert** | Whether to invert the turn | Any | Optional |

## Example

```c
anm_dummy:
_AC_DIR_U(8)
_ACMD_END()
```

The above script will turn the entity up over 8 frames.
