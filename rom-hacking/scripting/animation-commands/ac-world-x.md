# (786) _AC_WORLD_X

## Effect

Moves the actor of the animation to a tile on the x-axis of the current map over a given amount of frames per tile.

Starts the stepping sound effect.

:::info

This command only moves the actor. It does not turn the actor in the moving direction.

:::

## Syntax

```c
_AC_WORLD_X(x, frames)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **tiles** | The new x-position | Float | Required |
| **frames** | The amount of frames per tile | Float | Required |

## Example

```c
anm_dummy:
_AC_WORLD_X(45, 8)
_ACMD_END()
```

The above script will move the actor to tile 45 on the x-axis of the current map.
