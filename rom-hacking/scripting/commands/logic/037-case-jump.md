# (37) _CASE_JUMP

## Effect

Compares the value of the work of the last prepared "switch" statement to the given value. Jumps to a script if they are equal.

The position of a jump is not saved. Execution does not return to this command once a _RET is executed.

## Syntax

```c
_CASE_JUMP(val, label)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **val** | The value to compare to | Work, Float | Required |
| **label** | The label to jump to | String | Required |

## Example

```c
_LDVAL(@LOCALWORK1, 2)
_SWITCH(@LOCALWORK1)
_CASE_JUMP(1, 'ev_dummy_1')
_CASE_JUMP(2, 'ev_dummy_2')
_CASE_JUMP(3, 'ev_dummy_3')
```

The above script will set the work variable @LOCALWORK1 to 2.

Then, a switch statement using @LOCALWORK1 is prepared.

First, the value of @LOCALWORK1 is compared to 1. Since they're not equal, execution continues.

Then, the value of @LOCALWORK1 is compared to 2. Since they're equal, ev_dummy_2 is jumped to.
