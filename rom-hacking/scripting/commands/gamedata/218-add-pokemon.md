# (218) _ADD_POKEMON

## Effect

Add a Pokémon to the party silently.

## Syntax

```c
_ADD_POKEMON(monsno, level, item, result, maxIVs)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **monsno** | The NatDex ID of the Pokémon | Work, Number | Required |
| **level** | The level of the Pokémon | Work, Number | Required |
| **item** | The item ID that the Pokémon will hold (0 = no item) | Work, Number | Required |
| **result** | The result of if there was room in the party | Work | Required |
| **maxIVs** |The number of max IVs the Pokémon will be forced to have | Work, Number | Optional |

:::info
The Pokémon will be registered in the Pokédex regardless of the `result`.
:::

## Example

```c
_ADD_POKEMON(133, 34, 0, @SCWK_ANSWER, 5)
```

The above script will give the player an Eevee at level 34 holding no item and with at least five maxed IVs, if there is room in the party.