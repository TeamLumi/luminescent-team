# (155) _EVENT_START

## Effect

Starts a script event. Locking player input until [_EVENT_END](157-event-end.md) is called.

## Syntax

```c
_EVENT_START()
```

## Example

```c
ev_dummy:
_EVENT_START()
```

The above script will lock player input.