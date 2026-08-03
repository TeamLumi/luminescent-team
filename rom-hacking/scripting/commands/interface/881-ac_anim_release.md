# (881) _AC_ANIM_RELEASE

## Effect

Unlocks the designated entity's animation state if it was locked previously with [_AC_ANIM_LOCK](880-ac_anim_lock.md).

The entity will return to its wait animation.

## Syntax

```c
_AC_ANIM_RELEASE(id)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **id** | The ID of the PlaceData | String, Number, Work | Required |


## Example

```c
ev_dummy:
_AC_ANIM_LOCK('HERO')
_OBJ_ANIME('HERO', 'anm_dummy')
_TIME_WAIT(200, @SCWK_ANSWER)
_AC_ANIM_RELEASE('HERO')
anm_dummy:
_AC_INDEX_ANIME(26)
_AC_INDEX_ANIME_WAIT()
_AC_INDEX_ANIME(27)
_AC_INDEX_ANIME_WAIT()
_ACMD_END()
```

The above script will lock the animation state of the player, call an animation function and change them to use animation 26 (surprise start), then followed by animation 27 (surprise loop), locking them to loop animation 27, as it was the last one called.

Then it waits 200 frames and unlocks them, letting them go back to their normal wait animation.