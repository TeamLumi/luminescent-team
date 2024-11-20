# (58) _ADD_WK

## Effect

Increments a work variable by a given value.

## Syntax

```c
_ADD_WK(work, value)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **work** | The work to increment | Work | Required |
| **value** | The value to add | Work, Float | Required |

## Example

```c
_LDVAL(@LOCALWORK1, 3)
_ADD_WK(@LOCALWORK1, 4)
```

The above script will set the work variable @LOCALWORK1 to 3.

Then, @LOCALWORK1's value is incremented by 4, making it 7.
