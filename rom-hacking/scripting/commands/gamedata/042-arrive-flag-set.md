# (42) _ARRIVE_FLAG_SET

## Effect

Sets the given system flag to true.

Also updates the player's badge count.

## Syntax

```c
_FLAG_SET(sysflag)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **sysflag** | The system flag to set | SysFlag | Required |

## Example

```c
_ARRIVE_FLAG_SET($SYS_FLAG_PAIR)
```

The above script will set the $SYS_FLAG_PAIR system flag.
