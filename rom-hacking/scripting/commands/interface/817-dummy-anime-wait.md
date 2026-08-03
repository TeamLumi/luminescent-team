# (817) _DUMMY_ANIME_WAIT

## Effect

Waits for an animation called by [_DUMMY_ANIME](816-dummy-anime.md) to finish. Script execution is paused until then.

If this command is not used, the script will continue to run while the animation is ongoing.

## Syntax

```c
_DUMMY_ANIME_WAIT()
```

## Example

```c
ev_dummy:
_DUMMY_ANIME('anm_dummy')
_DUMMY_ANIME_WAIT()
anm_dummy:
_ACMD_END()
```

The above script will call an animation function and wait for the animation function to finish before executing the rest of the script.