# (154) _TALK_START

## Synonyms

- _TALK_OBJ_START_LOOK_NONE

## Effect

Starts a talk script event with an interaction noise. Locking player input until [_TALK_END](156-talk-end.md) is called.

## Syntax

```c
_TALK_START()
```

## Example

```c
ev_dummy:
_TALK_START()
```

The above script will make an interaction noise and lock player input.