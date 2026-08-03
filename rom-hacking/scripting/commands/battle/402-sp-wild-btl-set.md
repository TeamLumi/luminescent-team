# (402) _SP_WILD_BTL_SET

## Effect

Initiates a wild battle with more arguments than [_WILD_BTL_SET](401-wild-btl-set.md).

## Syntax

```c
_SP_WILD_BTL_SET(monsno, level, isCantUseBall, formno, hiddenAbility)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **monsno** | The NatDex ID of the Pokémon to battle | Work, Number | Required |
| **level** | The level of the Pokémon | Work, Number | Required |
| **isCantUseBall** | If set to 1, you will be unable to throw a Poké Ball in this battle | Work, Number | Optional |
| **formno** | The form of the Pokémon | Work, Number | Optional |
| **hiddenAbility** | If set to 1, the Pokémon will have its Hidden Ability | Work, Number | Optional |

:::info
The combination of Giratina with Form 1 and isCantUseBall will force Giratina to appear in its Shadow Origin Forme.
:::

## Example

```c
_SP_WILD_BTL_SET(422, 20, 0, 1, 1)
```

The above script will start a wild battle with a catchable East Sea Shellos at level 20 with its Hidden Ability.