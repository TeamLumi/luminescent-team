# (335) _TRAINER_BTL_SET

## Effect

Initiates a trainer battle.

## Syntax

```c
_TRAINER_BTL_SET(trainer1, trainer2?)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **trainer1** | The ID of the trainer to battle | Work, Float, String | Required |
| **trainer2** | The ID of the trainer to battle | Work, Float, String | Optional |

## Example

```c
ev_dummy:
_LDVAL(@SCWK_TEMP1, 780)
_TRAINER_BTL_SET(@SCWK_TEMP1)
```

The above script will battle the trainer stored in the work `@SCWK_TEMP1`. In this case 780.

