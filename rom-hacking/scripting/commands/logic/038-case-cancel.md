# (38) _CASE_CANCEL

## Effect

Compares the values of @SCWK_REG0 and @EV_WIN_B_CANCEL. Jumps to a script if they are equal.

The position of a jump is not saved. Execution does not return to this command once a _RET is executed.

:::caution

Broken and always considers @SCWK_REG0 as greater and therefore does nothing.

:::

## Syntax

```c
_CASE_JUMP(val, label)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **label** | The label to jump to | String | Required |

## Example

```c
_LDVAL(@LOCALWORK1, 4)
_SWITCH(@LOCALWORK1)
_CASE_JUMP(1, 'ev_dummy_1')
_CASE_JUMP(2, 'ev_dummy_2')
_CASE_JUMP(3, 'ev_dummy_3')
_CASE_CANCEL('ev_dummy_cancel')
```

The above script will set the work variable @LOCALWORK1 to 4.

Then, a switch statement using @LOCALWORK1 is prepared.

First, the value of @LOCALWORK1 is compared to 1. Since they're not equal, execution continues.

The same happens for values 2 and 3.

Finally, _CASE_CANCEL executes and, due to a bug, does nothing.
