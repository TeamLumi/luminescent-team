# (1209) _ADD_POKEMON_UI

## Effect

Add a Pokémon to the party with the UI that gives the player options for various things to do with it.

## Syntax

```c
_ADD_POKEMON_UI(monsno, level, item, result, maxIVs)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **monsno** | The NatDex ID of the Pokémon | Work, Number | Required |
| **level** | The level of the Pokémon | Work, Number | Required |
| **item** | The item ID that the Pokémon will hold (0 = no item) | Work, Number | Required |
| **result** | The result is always set to 0 | Work | Required |
| **maxIVs** |The number of max IVs the Pokémon will be forced to have | Work, Number | Optional |

## Example

```c
_ADD_POKEMON_UI(328, 27, 92, @SCWK_ANSWER, 3)
```

The above script will give the player an Trapinch at level 27 holding a nugget and with at least three maxed IVs. It will pop up a UI with options to rename, look at the summary and choose where to send it.