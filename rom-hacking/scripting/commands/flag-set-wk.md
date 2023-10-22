# (50) _FLAG_SET_WK

## Effect

Sets the flag corresponding to the given value to true.

## Syntax

```c
_FLAG_SET_WK(flag)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **flag** | The work containing the flag to set or the direct flag number | Work, Float | Required |

## Example

```c
_LDVAL(@LOCALWORK1, 3)
_FLAG_SET_WK(@LOCALWORK1)
```

The above script will set the work variable @LOCALWORK1 to 3.

Then, the flag number contained in @LOCALWORK1 (in this case 3) is the flag that gets set to true. This corresponds to flag #FH_04.
