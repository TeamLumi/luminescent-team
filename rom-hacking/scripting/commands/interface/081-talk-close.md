# (81) _TALK_CLOSE

## Effect

Closes all currently open textboxes.

Also sets `SCWK_WIN_OPEN_FLAG` to 0.

## Synonyms

- _TALK_CLOSE_NO_CLEAR

## Syntax

```c
_TALK_CLOSE()
```

## Example

```c
ev_dummy:
_TALKMSG('dp_dummy_file%dummy_msg')
_TALK_CLOSE()
```

The above script will display a textbox and then close it afterwards.
