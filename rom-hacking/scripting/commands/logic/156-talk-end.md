# (156) _TALK_END

## Synonyms

- [_EVENT_END](157-event-end.md)

## Effect

Unlocks player input in the current script event.

## Syntax

```c
_TALK_END()
```

## Example

```c
_TALK_END()
_SE_PLAY('S_PINPON')
_END()
```

The above script will unlock player input and will then play the 'S_PINPON' sound effect. The player will be able to move while the sound effect is playing.