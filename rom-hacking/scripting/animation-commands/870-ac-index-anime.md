# (870) _AC_INDEX_ANIME

## Effect

Animates the entity based on the given animation. The list of animations can be found at the bottom of this page.

If the **time** argument is provided, the animation takes as long as specified.

## Syntax

```c
_AC_INDEX_ANIME(animation, time?)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **animation** | The animation to perform | Float | Required |
| **time** | The amount of time to animate, in seconds | Float | Optional |

## Example

```c
anm_dummy:
_AC_INDEX_ANIME(41)
_AC_INDEX_ANIME_WAIT()
_ACMD_END()
```

The above script will make the entity spin around in the air.

:::info
A list of animations can be found [here](../../dictionary/chibi-animations.md).
:::
