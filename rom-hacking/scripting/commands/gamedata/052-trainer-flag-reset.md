# (52) _TRAINER_FLAG_RESET

## Effect

Resets the trainer flag of the given trainer to false.

## Syntax

```c
_TRAINER_FLAG_RESET(trainer)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **trainer** | The trainer id, or the name of the value in the TrainerID enum | Work, Float, String | Required |

## Example

```c
_LDVAL(@LOCALWORK1, 3)
_TRAINER_FLAG_RESET(@LOCALWORK1)
```

The above script will set the work variable @LOCALWORK1 to 3.

Then, the trainer id contained in @LOCALWORK1 (in this case 3) is the one to reset to false. This corresponds to MINI_01 in the TrainerID enum.
