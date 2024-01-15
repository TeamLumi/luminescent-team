# (55) _IF_TR_FLAGOFF_JUMP

## Effect

Checks the trainer flag of the given trainer and jumps to a script if the trainer is not defeated.

The position of the jump is not saved. Execution does not return to this command once a _RET is executed.

:::info

The VS. Seeker does not affect this result.

:::

## Syntax

```c
_IF_TR_FLAGOFF_JUMP(trainer, label)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **trainer** | The trainer id, or the name of the value in the TrainerID enum | Work, Float, String | Required |
| **label** | The label to jump to | String | Required |

## Example

```c
_LDVAL(@LOCALWORK1, 3)
_IF_TR_FLAGOFF_JUMP(@LOCALWORK1, 'ev_dummy')
```

The above script will set the work variable @LOCALWORK1 to 3.

Then, the trainer id contained in @LOCALWORK1 (in this case 3) is the one that is checked. This corresponds to MINI_01 in the TrainerID enum.

The jump to ev_dummy will only occur if MINI_01 has not been defeated.
