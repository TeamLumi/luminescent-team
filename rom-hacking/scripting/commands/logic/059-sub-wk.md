# (59) _SUB_WK

## Effect

Decrements a work by a given value.

## Syntax

```c
_SUB_WK(work, value)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **work** | The work that gets decremented | Work | Required |
| **value** | The value to subtract | Work, Float | Required |

## Example

```c
_LDVAL(@LOCALWORK1, 3)
_SUB_WK(@LOCALWORK1, 2)
```

The above script will set the work variable @LOCALWORK1 to 3.

Then, @LOCALWORK1's value is decremented by 2, making it 1.
