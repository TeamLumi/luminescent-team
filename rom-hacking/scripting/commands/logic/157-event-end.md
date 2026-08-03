# (157) _EVENT_END

## Synonyms

- [_TALK_END](156-talk-end.md)

## Effect

Unlocks player input in the current script event.

## Syntax

```c
_EVENT_END()
```

## Example

```c
_EVENT_END()
_SE_PLAY('S_PINPON')
_END()
```

The above script will unlock player input and will then play the 'S_PINPON' sound effect. The player will be able to move while the sound effect is playing.