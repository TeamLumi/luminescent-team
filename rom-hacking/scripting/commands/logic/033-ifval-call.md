# (33) _IFVAL_CALL

## Synonyms

- _IFWK_CALL

## Effect

Compares two values using the given comparison operator. Calls a script if the comparison is true.

The position of the call is saved. Execution returns to this command once a _RET is executed.


## Syntax

```c
_IFVAL_CALL(val1, comparison, val2, label)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **val1** | The value to compare | Work, Float | Required |
| **comparison** | The comparison operator to use | String | Required |
| **val2** | The value to compare to | Work, Float | Required |
| **label** | The label to call | String | Required |

## Example

```c
_LDVAL(@LOCALWORK1, 4)
_IFVAL_CALL(@LOCALWORK1, 'EQ', 4, 'ev_dummy')
```

The above script will set @LOCALWORK1 to 4.

Then, the value of @LOCALWORK1 is compared to 4, and is determined to be "equal". Since that matches **comparison**, ev_dummy is called.
