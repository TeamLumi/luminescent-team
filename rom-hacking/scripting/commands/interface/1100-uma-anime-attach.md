# (1100) _UMA_ANIME_ATTACH

## Effect

Attaches a given entity to index 0, 1 or 2, for use with [_UMA_ANIME_PLAY](1099-uma-anime-play.md).

:::caution
You must always attach entities to all three indices, whether you plan to play animations on three entities or not.

_RELEASE_UMA_ANIME will crash if fewer than three UMA entities are attached.
:::

## Syntax

```c
_UMA_ANIME_ATTACH(index, entity)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **index** | The UMA index that you assigning an entity to | Number, Work | Required |
| **entity** | The entity id | String, Number, Work | Required |

## Example

```c
_LOAD_UMA_ANIME()
_LOAD_UMA_ANIME_WAIT()
_UMA_ANIME_ATTACH(0, 'DUMMY_UXIE')
_UMA_ANIME_ATTACH(1, 'DUMMY_MESPIRIT')
_UMA_ANIME_ATTACH(2, 'DUMMY_AZELF')
_UMA_ANIME_PLAY(0, 'chapter111-01_cut06a_pm0480_00_00_yuxie')
_UMA_ANIME_PLAY(1, 'chapter111-01_cut06a_pm0481_00_00_emrit')
_UMA_ANIME_PLAY(2, 'chapter111-01_cut06a_pm0482_00_00_agnome')
_UMA_PLAY_WAIT(0, 'DUMMY_UXIE')
_UMA_PLAY_WAIT(1, 'DUMMY_MESPIRIT')
_UMA_PLAY_WAIT(2, 'DUMMY_AZELF')
```

The above script loads the `field/animeobj/chapter111` assetbundle and will wait for it to be loaded. Then it will attach the three **U**xie, **M**espirit and **A**zelf PlaceData to UMA index 0, 1 and 2 respectively. It then calls Animation Clips from the assetbundle for each of them and will play it until they finish.