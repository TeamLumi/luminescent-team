# (136) _OBJ_ANIME

## Effect

Calls an animation function for the given entity.

The entity name is taken from the field `ID` from a PlaceData file. For the player it is `HERO`.

## Syntax

```c
_OBJ_ANIME(entity, function, animation_clip)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **entity** | The entity id | Work, Float, String | Required |
| **function** | The animation function | String | Required |
| **animation_clip** | First frame of the next animation clip to be played | Float | Optional |

## Example

```c
ev_dummy:
_OBJ_ANIME('HERO', 'anm_dummy')
anm_dummy:
_ACMD_END()
```

The above script will call the animation function `anm_dummy` with the player as the entity.
