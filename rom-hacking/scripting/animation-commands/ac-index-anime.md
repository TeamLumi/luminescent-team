# (870) _AC_INDEX_ANIME

## Effect

Animates the actor based on the given animation.

If the second argument is provided, the animation takes two seconds.

## Syntax

```c
_AC_INDEX_ANIME(animation, two_seconds?)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **animation** | The animation to perform | Float | Required |
| **two_seconds** | Whether the animation should take 2 seconds | Any | Optional |

## Example

```c
anm_dummy:
_AC_INDEX_ANIME(41)
_AC_INDEX_ANIME_WAIT()
_ACMD_END()
```

The above script will make the actor spin around in the air.

## List of animations

| ID | Animation | Preview |
| :-: | - | :-: |
| 1 | Walking animation | ![Animation 1](../../../static/img/ac-index-anime-animations/1.gif) |
| 2 | Running animation | ![Animation 2](../../../static/img/ac-index-anime-animations/2.gif) |
| 3 | Look around - left, right, left | ![Animation 3](../../../static/img/ac-index-anime-animations/3.gif) |
| 4 | Idle animation | ![Animation 4](../../../static/img/ac-index-anime-animations/4.gif) |
| 5 | Pull out fishing rod | ![Animation 5](../../../static/img/ac-index-anime-animations/5.gif) |
| 6 | Hold fishing rod | ![Animation 6](../../../static/img/ac-index-anime-animations/6.gif) |
| 7 | Release fishing rod | ![Animation 7](../../../static/img/ac-index-anime-animations/7.gif) |
| 8 | Pull in fishing rod | ![Animation 8](../../../static/img/ac-index-anime-animations/8.gif) |
| 9 | Open hands | ![Animation 9](../../../static/img/ac-index-anime-animations/9.gif) |
| 10 | Sitting down | ![Animation 10](../../../static/img/ac-index-anime-animations/10.gif) |
| 11 | Stretch out hand | ![Animation 11](../../../static/img/ac-index-anime-animations/11.gif) |
| 12 | Kneel down | ![Animation 12](../../../static/img/ac-index-anime-animations/12.gif) |
| 13 | Raise arm | ![Animation 13](../../../static/img/ac-index-anime-animations/13.gif) |
| 14 | Raise and lower arm | ![Animation 14](../../../static/img/ac-index-anime-animations/14.gif) |
| 15 | Spin around in the air | ![Animation 15](../../../static/img/ac-index-anime-animations/15.gif) |
| 16 | T pose long | ![Animation 16](../../../static/img/ac-index-anime-animations/16.gif) |
| 17 | T pose medium | ![Animation 17](../../../static/img/ac-index-anime-animations/17.gif) |
| 18 | T pose short | ![Animation 18](../../../static/img/ac-index-anime-animations/18.gif) |
| 20 | Bump | ![Animation 20](../../../static/img/ac-index-anime-animations/20.gif) |
| 21 | Float | ![Animation 21](../../../static/img/ac-index-anime-animations/21.gif) |
| 22 | Stumble | ![Animation 22](../../../static/img/ac-index-anime-animations/22.gif) |
| 23 | Stretch | ![Animation 23](../../../static/img/ac-index-anime-animations/23.gif) |
| 24 | Slow walk | ![Animation 24](../../../static/img/ac-index-anime-animations/24.gif) |
| 25 | Pull in fishing rod | ![Animation 25](../../../static/img/ac-index-anime-animations/25.gif) |
| 26 | Shock fade in | ![Animation 26](../../../static/img/ac-index-anime-animations/26.gif) |
| 27 | Shock fade out | ![Animation 27](../../../static/img/ac-index-anime-animations/27.gif) |
| 28 | Swirl Spoon? | ![Animation 28](../../../static/img/ac-index-anime-animations/28.gif) |
| 29 | Hold fishing rod above head | ![Animation 29](../../../static/img/ac-index-anime-animations/29.gif) |
| 30 | Weird run | ![Animation 30](../../../static/img/ac-index-anime-animations/30.gif) |
| 31 | Weird run | ![Animation 31](../../../static/img/ac-index-anime-animations/31.gif) |
| 32 | Watering can start? | ![Animation 32](../../../static/img/ac-index-anime-animations/32.gif) |
| 33 | Watering can end? | ![Animation 33](../../../static/img/ac-index-anime-animations/33.gif) |
| 36 | Pok&eacute;tch start | ![Animation 36](../../../static/img/ac-index-anime-animations/36.gif) |
| 37 | Pok&eacute;tch end | ![Animation 37](../../../static/img/ac-index-anime-animations/37.gif) |
| 38 | Fall in ground | ![Animation 38](../../../static/img/ac-index-anime-animations/38.gif) |
| 39 | Float out of ground | ![Animation 39](../../../static/img/ac-index-anime-animations/39.gif) |
| 40 | Jump out of ground | ![Animation 40](../../../static/img/ac-index-anime-animations/40.gif) |
| 41 | Spin around in the air | ![Animation 41](../../../static/img/ac-index-anime-animations/41.gif) |
| 42 | Lie on the ground | ![Animation 42](../../../static/img/ac-index-anime-animations/42.gif) |
| 43 | Spin 180° and plop to ground | ![Animation 43](../../../static/img/ac-index-anime-animations/43.gif) |
| 44 | Stand up | ![Animation 44](../../../static/img/ac-index-anime-animations/44.gif) |
| 45 | Look up | ![Animation 45](../../../static/img/ac-index-anime-animations/45.gif) |
| 65 | Slow jump | ![Animation 65](../../../static/img/ac-index-anime-animations/65.gif) |
| 66 | Slow jump | ![Animation 66](../../../static/img/ac-index-anime-animations/66.gif) |
| 67 | Pull out fishing rod kneeling | ![Animation 67](../../../static/img/ac-index-anime-animations/67.gif) |
| 68 | Hold fishing rod kneeling | ![Animation 68](../../../static/img/ac-index-anime-animations/68.gif) |
| 69 | Release fishing rod kneeling | ![Animation 69](../../../static/img/ac-index-anime-animations/69.gif) |
| 70 | Swirling spoon kneeling? | ![Animation 70](../../../static/img/ac-index-anime-animations/70.gif) |
| 71 | Put away fishing rod kneeling | ![Animation 71](../../../static/img/ac-index-anime-animations/71.gif) |
| 72 | Pull in fishing rod kneeling | ![Animation 72](../../../static/img/ac-index-anime-animations/72.gif) |
| 73 | Hold fishing rod above head kneeling | ![Animation 73](../../../static/img/ac-index-anime-animations/73.gif) |
| 76 | Flying animation leave | ![Animation 76](../../../static/img/ac-index-anime-animations/76.gif) |
| 77 | Flying animation arrive | ![Animation 77](../../../static/img/ac-index-anime-animations/77.gif) |
| 78 | Pok&eacute;tch kneeling | ![Animation 78](../../../static/img/ac-index-anime-animations/78.gif) |
| 79 | Pok&eacute;tch kneeling | ![Animation 79](../../../static/img/ac-index-anime-animations/79.gif) |
| 80 | Pok&eacute;tch kneeling | ![Animation 80](../../../static/img/ac-index-anime-animations/80.gif) |

There might be more. These were all I could find.

If you'd like to contribute any you found, feel free to contact us on Discord!