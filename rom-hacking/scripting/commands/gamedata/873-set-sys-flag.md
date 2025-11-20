# (873) _SET_SYS_FLAG

## Synonyms

- _ARRIVE_FLAG_SET

## Effect

Sets the given system flag to true.

A list of all system flags can be found [here](../../../dictionary/system-flags.md).

## Syntax

```c
_SET_SYS_FLAG(flag)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **flag** | The system flag to set | System Flag | Required |

## Example

```c
_SET_SYS_FLAG($FLAG_STOP_EYE_ENCOUNT)
```

The above script will set the $FLAG_STOP_EYE_ENCOUNT system flag.
