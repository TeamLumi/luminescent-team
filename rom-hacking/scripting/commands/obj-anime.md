# (136) _OBJ_ANIME

## Effect

Calls an animation function for the given actor.

The actor name is taken from the field `ID` from a PlaceData file. For the player it is `HERO`.

## Syntax

```c
_OBJ_ANIME(actor, function, unknown?)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **actor** | The actor id | Work, Float, String | Required |
| **function** | The animation function | String | Required |
| **unknown** | Unknown use | Float | Optional |

## Example

```c
ev_dummy:
_OBJ_ANIME('HERO', 'anm_dummy')
anm_dummy:
_ACMD_END()
```

The above script will call the animation function `anm_dummy` with the player as the actor.
