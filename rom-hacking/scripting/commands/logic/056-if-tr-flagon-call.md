# (56) _IF_TR_FLAGON_CALL

## Effect

Checks the trainer flag of the given trainer and calls a script if the trainer is defeated and not currently looking for a rematch due to the Vs. Seeker.

The position of a call is saved. Execution returns to this command once a _RET is executed.

:::caution

Unlike the jump version of this command, whether the trainer is looking for a rematch due to the Vs. Seeker or not matters.

:::

## Syntax

```c
_IF_TR_FLAGON_CALL(trainer, label)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **trainer** | The trainer id, or the name of the value in the TrainerID enum | Work, Float, String | Required |
| **label** | The label to call | String | Required |

## Example

```c
_LDVAL(@LOCALWORK1, 3)
_IF_TR_FLAGON_CALL(@LOCALWORK1, 'ev_dummy')
```

The above script will set the work variable @LOCALWORK1 to 3.

Then, the trainer id contained in @LOCALWORK1 (in this case 3) is the one that is checked. This corresponds to MINI_01 in the TrainerID enum.

The call to ev_dummy will only occur if MINI_01 has been defeated and is not looking for a rematch.
