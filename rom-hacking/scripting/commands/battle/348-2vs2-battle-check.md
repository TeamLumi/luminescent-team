# (348) _2VS2_BATTLE_CHECK

## Effect

Returns if the player can participate in 2VS2 battles (player versus 2 trainers).

The player needs at least 2 Pokémon in their party that can fight.

## Return Values

| Value | Meaning |
| - | - |
| 0 | Can't participate |
| 1 | Can participate |

## Syntax

```c
_2VS2_BATTLE_CHECK(result)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **result** | The work to put the result into | Work | Required |

## Example

```c
ev_dummy:
_2VS2_BATTLE_CHECK(@SCWK_ANSWER)
```

The above script will check if the player can participate a 2VS2 battle and store it in the work `@SCWK_ANSWER`.
