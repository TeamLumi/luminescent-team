# (871) _AC_INDEX_ANIME_WAIT

## Effect

Waits for an animation from the command `_AC_INDEX_ANIME` to finish.

Sets _moveEndTime to 999.

## Syntax

```c
_AC_INDEX_ANIME_WAIT()
```

## Example

```c
anm_dummy:
_AC_INDEX_ANIME(41)
_AC_INDEX_ANIME_WAIT()
_ACMD_END()
```

The above script will wait until the animation is finished before continuing.
