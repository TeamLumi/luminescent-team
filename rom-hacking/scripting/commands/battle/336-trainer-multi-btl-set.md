# (336) _TRAINER_MULTI_BTL_SET

## Effect

Initiates a trainer multi battle (player and npc versus 2 trainers).

## Syntax

```c
_TRAINER_MULTI_BTL_SET(trainer1, trainer2, trainer3)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **trainer1** | The ID of the trainer to partner up with | Work, Float | Required |
| **trainer2** | The ID of the trainer to battle against | Work, Float | Required |
| **trainer3** | The ID of the trainer to battle against | Work, Float | Required |

## Example

```c
ev_dummy:
_LDVAL(@SCWK_TEMP1, 667); Support
_LDVAL(@SCWK_TEMP2, 703); Grunt 1
_LDVAL(@SCWK_TEMP3, 704); Grunt 2
_TRAINER_MULTI_BTL_SET(@SCWK_TEMP1, @SCWK_TEMP2, @SCWK_TEMP3)
```

The above script will initiate a battle where the player fights together with the trainer of the work `@SCWK_TEMP1` against the trainers of the works `@SCWK_TEMP2` and `@SCWK_TEMP3`.

