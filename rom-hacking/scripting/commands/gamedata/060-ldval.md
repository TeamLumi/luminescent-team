# (60) _LDVAL

## Synonyms

- _LDWK
- _LDWKVAL

## Effect

Sets a work variable to a given value.

## Syntax

```c
_LDVAL(work, value)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **work** | The work to set | Work | Required |
| **value** | The value to set the work to | Work, Float | Required |

## Example

```c
_LDVAL(@LOCALWORK1, 3)
```

The above script will set the work variable @LOCALWORK1 to 3.
