# (309) _POKEMON_NAME

## Effect

Puts the Pokémon name in the [Buffer](../../introduction.md#text-output-buffer) at the given index.

## Syntax

```c
_POKEMON_NAME(index, pokemon)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **index** | The index of the buffer to write the value to | Float | Required |
| **pokemon** | The natdex number of the Pokémon | Work, Float | Required |

## Example

```c
ev_dummy:
_LDVAL(@SCWK_TEMP1, 1); Bulbasaur
_POKEMON_NAME(0, @SCWK_TEMP1)
_TALKMSG('dp_dummy_file%dummy_msg')
```

The above script will put the Pokémon name of Bulbasaur in buffer position 0 and then print out the message from `dp_dummy_file%dummy_msg`.
