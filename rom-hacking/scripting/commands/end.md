# (3) _END

## Synonyms

- _NOP

## Effect

Ends the script.

## Syntax

```c
_END()
```

## Example

```c
_LDVAL(@LOCALWORK1, 1)
_END()
_SE_PLAY('S_PINPON')
```

The above script will set the work variable @LOCALWORK1 to 1, then end script execution. The command on line 3 will not be executed.
