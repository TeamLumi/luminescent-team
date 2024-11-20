# (53) _TRAINER_FLAG_CHECK

## Effect

Checks the trainer flag of the given trainer.

The comparison is "equal" if the trainer is defeated and they are not currently looking for a rematch due to the Vs. Seeker. Otherwise, the comparison is "less".

## Syntax

```c
_TRAINER_FLAG_CHECK(trainer)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **trainer** | The trainer id, or the name of the value in the TrainerID enum | Work, Float, String | Required |

## Example

```c
_LDVAL(@LOCALWORK1, 3)
_TRAINER_FLAG_CHECK(@LOCALWORK1)
_IF_JUMP('FLGON', 'ev_dummy')
```

The above script will set the work variable @LOCALWORK1 to 3.

Then, the trainer id contained in @LOCALWORK1 (in this case 3) is the one that is checked. This corresponds to MINI_01 in the TrainerID enum.

Next, the result of the comparison is checked. Since the condition is "FLGON" which corresponds to "equal", the jump will only occur if MINI_01 has been defeated and they are not looking for a rematch.
