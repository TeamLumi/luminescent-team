# (1001) _TEMOTI_BOX_POKEMON_NAME

## Effect

Puts the Pokémon species name in the [Buffer](../../introduction.md#text-output-buffer) at the given index. The buffer was filled by a Pokémon in the party or box.

Very similar in use as [_POKEMON_NAME](./309-pokemon-name.md). Often used with the [_POKELIST_GET_RESULT](./267-pokelist-get-result.md) and [_POKELIST_SET_PROC](./264-pokelist-set-proc.md) commands. 

## Syntax

```c
_TEMOTI_BOX_POKEMON_NAME(index, work1, work2)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **index** | The index of the buffer to write the value to | Work, Float | Required |
| **work1** | The position that the selected Pokémon is in the box. | Work, Int | Required |
| **work2** | The "Tray" (Box or Party) that the selected Pokémon is in | Work, Int | Required |

## Example

```c
_LDVAL(@LOCALWORK1, 1)
_LDVAL(@LOCALWORK2, 0)
_TEMOTI_BOX_POKEMON_NAME(0, @LOCALWORK1, @LOCALWORK2)
_TALKMSG('dp_dummy_file%dummy_msg')
```

For example sake, imagine you have a party with a Bulbasaur in the lead, with Charmander and Squirtle in the 2nd and 3rd slot respectively.

This script loads `@LOCALWORK1` as 1, and `@LOCALWORK2` as 0 into memory. `_TEMOTI_BOX_POKEMON_NAME` will then check the 1st Pokémon in the party (0 is the party, everything above that is a box). If there's a Pokémon there, it will return the Pokedex Number in the `@SCWK_ANSWER` work.

The above script will then put the Pokémon name of Pokémon in the 1st position in my box, which is Bulbasaur in this case, in buffer position 0 and then print out the message from `dp_dummy_file%dummy_msg`. This will also happen if we selected the 2nd position in the party for Charmander and Squirtle, if the 3rd position in party was chosen.
