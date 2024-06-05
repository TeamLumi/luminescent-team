# (51) _TRAINER_FLAG_SET

## Effect

Sets the trainer flag of the given trainer to true.

## Syntax

```c
_TRAINER_FLAG_SET(trainer)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **trainer** | The trainer id, or the name of the value in the TrainerID enum | Work, Float, String | Required |

## Example

```c
_LDVAL(@LOCALWORK1, 3)
_TRAINER_FLAG_SET(@LOCALWORK1)
```

The above script will set the work variable @LOCALWORK1 to 3.

Then, the trainer id contained in @LOCALWORK1 (in this case 3) is the one to set to true. This corresponds to MINI_01 in the TrainerID enum.
