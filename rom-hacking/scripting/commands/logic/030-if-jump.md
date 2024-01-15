# (30) _IF_JUMP

## Effect

Checks the result of the previous comparison command, then jumps to a script if the result matches the given comparison operator.

The position of the jump is not saved. Execution does not return to this command once a _RET is executed.

## Syntax

```c
_IF_JUMP(comparison, label)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **comparison** | The comparison operator to use | String | Required |
| **label** | The label to jump to | String | Required |

## Example

```c
_LDVAL(@LOCALWORK4, 9)
_LDVAL(@LOCALWORK8, 13)
_LDVAL(@LOCALWORK1, 4)
_CMPWK(@LOCALWORK1, 8)
_IF_JUMP('GT', 'ev_dummy')
```

The above script will set:
- Work variable @LOCALWORK4 to 9;
- Work variable @LOCALWORK8 to 13;
- Work variable @LOCALWORK1 to 4.

Then, the values of work 4 (@LOCALWORK4) and work 8 (@LOCALWORK8) are compared. Due to a bug, no matter their values, @LOCALWORK4 is determined to be greater.

Next, the result of the comparison is checked. Since the result is "greater", ev_dummy is jumped to.
