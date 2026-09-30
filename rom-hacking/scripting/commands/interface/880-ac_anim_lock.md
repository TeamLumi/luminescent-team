# (880) _AC_ANIM_LOCK

## Effect

Locks the designated entity to loop the currently playing animation after it has finished playing, rather than going back to its wait animation.

The entity will return to its wait animation when the script ends or when [_AC_ANIM_RELEASE](881-ac_anim_release.md) is called on them.

## Syntax

```c
_AC_ANIM_LOCK(id)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **id** | The ID of the PlaceData | String, Number, Work | Required |


## Example

```c
ev_dummy:
_AC_ANIM_LOCK('HERO')
_OBJ_ANIME('HERO', 'anm_dummy')
anm_dummy:
_AC_INDEX_ANIME(26)
_AC_INDEX_ANIME_WAIT()
_AC_INDEX_ANIME(27)
_AC_INDEX_ANIME_WAIT()
_ACMD_END()
```

The above script will lock the animation state of the player, call an animation function and change them to use animation 26 (surprise start), then followed by animation 27 (surprise loop), locking them to loop animation 27, as it was the last one called.