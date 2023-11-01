# (778) _AC_DIR_VAL

## Effect

Turns the actor of the animation to a degree angle over a given amount of frames.

- 0°, 360°, -360° = down
- 90°, -270° = left
- 180°, -180° = up
- 270°, -90° = right

Anything in between is also a valid value.

Values greater than 360 are modulo'ed down `actual_angle = angle % 360`.

The turn direction is the shortest distance to the angle. If the distance is 180° clockwise turns are done.

If a third argument is provided, the turn directon of the actor is inverted. Essentially making the longer turn to get to the new angle.

If the new angle equals the old angle and the direction is inverted the actor does a 360° turn.

## Syntax

```c
_AC_DIR_VAL(frames, angle, invert?)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **frames** | The amount of frames | Float | Required |
| **angle** | The new angle | Float | Required |
| **invert** | Whether to invert the turn | Any | Optional |

## Example

```c
anm_dummy:
_AC_DIR_VAL(8, 45)
_ACMD_END()
```

The above script will turn the actor to look down right at a 45° angle from the bottom.
