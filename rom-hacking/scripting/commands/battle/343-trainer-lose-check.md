# (343) _TRAINER_LOSE_CHECK

## Effect

Returns the result of the last battle.

## Return Values

| Value | Meaning |
| - | - |
| 0 | Lost |
| 1 | Won |

## Syntax

```c
_TRAINER_LOSE_CHECK(result)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **result** | The work to put the result into | Work | Required |

## Example

```c
ev_dummy:
_LDVAL(@SCWK_TEMP3, 780)
_TRAINER_BTL_SET(@SCWK_TEMP3, 0)
_TRAINER_LOSE_CHECK(@SCWK_ANSWER)
```

The above script will battle the trainer stored in the work `@SCWK_TEMP3`. In this case 780.

Afterwards it stores the battle result in the work `@SCWK_ANSWER`.

