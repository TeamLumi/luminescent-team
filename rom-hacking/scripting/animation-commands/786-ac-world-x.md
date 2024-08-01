# (786) _AC_WORLD_X

## Effect

Moves the entity of the animation to a tile on the x-axis of the current map over a given amount of frames per tile.

Starts the stepping sound effect.

:::info

This command only moves the entity. It does not turn the entity in the moving direction.

The x-axis is horizontal and the z-axis is vertical. Coordinate (0, 0) is top left.

:::

## Syntax

```c
_AC_WORLD_X(x, time)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **tiles** | The new x-position | Float | Required |
| **time** | The amount of time to move per tile, in frames | Float | Required |

## Example

```c
anm_dummy:
_AC_WORLD_X(45, 8)
_ACMD_END()
```

The above script will move the entity to tile 45 on the x-axis of the current map.
