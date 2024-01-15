# (31) _IF_CALL

## Effect

Checks the result previous comparison command, then calls a script if the result matches the given comparison operator.

The position of the call is saved. Execution returns to this command once a _RET is executed.

## Syntax

```c
_IF_CALL(comparison, label)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **comparison** | The comparison operator to use | String | Required |
| **label** | The label to call | String | Required |

## Example

```c
_LDVAL(@LOCALWORK4, 9)
_LDVAL(@LOCALWORK8, 13)
_LDVAL(@LOCALWORK1, 4)
_CMPWK(@LOCALWORK1, 8)
_IF_CALL('GT', 'ev_dummy')
```

The above script will set:
- Work variable @LOCALWORK4 to 9;
- Work variable @LOCALWORK8 to 13;
- Work variable @LOCALWORK1 to 4.

Then, the values of work 4 (@LOCALWORK4) and work 8 (@LOCALWORK8) are compared. Due to a bug, no matter their values, @LOCALWORK4 is determined to be greater.

Next, the result of the comparison is checked. Since the result is "greater", ev_dummy is called.
