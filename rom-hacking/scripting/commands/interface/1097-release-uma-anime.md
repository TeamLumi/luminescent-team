# (1087) _RELEASE_UMA_ANIME

## Effect

Unloads the `field/camera/chapter110` assetbundle loaded by [_LOAD_UMA_ANIME](1096-load-uma-anime.md).

:::caution
_RELEASE_UMA_ANIME will crash if fewer than three UMA entities are attached.
:::

## Syntax

```c
_RELEASE_UMA_ANIME()
```

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
_RELEASE_UMA_ANIME()
```

The above script loads the `field/animeobj/chapter111` assetbundle and will wait for it to be loaded. Then it will attach the three **U**xie, **M**espirit and **A**zelf PlaceData to UMA index 0, 1 and 2 respectively. It then calls Animation Clips from the assetbundle for each of them and will play it until they finish. The attached entities remain where they are as the `field/animeobj/chapter111` assetbundle is unloaded.