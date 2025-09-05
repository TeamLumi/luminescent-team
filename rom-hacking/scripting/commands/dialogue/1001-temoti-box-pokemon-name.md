# (1001) _TEMOTI_BOX_POKEMON_NAME

## Effect

Puts the Pokémon species name in the [Buffer](../../introduction.md#text-output-tag) at the given index. The tag was filled by a Pokémon in the party or box.

Very similar in use as [_POKEMON_NAME](./309-pokemon-name.md). Often used with the [_POKELIST_GET_RESULT](../gamedata/267-pokelist-get-result.md) and [_POKELIST_SET_PROC](../gamedata/264-pokelist-set-proc.md) commands. 

## Syntax

```c
_TEMOTI_BOX_POKEMON_NAME(tag_index, index, tray_index)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **tag_index** | The index of the tag to write the value to | Work, Float | Required |
| **index** | The position that the selected Pokémon is in the box. | Work, Int | Required |
| **tray_index** | The tray that the selected Pokémon is in (party is -1) | Work, Int | Required |

## Example

```c
_LDVAL(@LOCALWORK1, 0)
_LDVAL(@LOCALWORK2, -1)
_TEMOTI_BOX_POKEMON_NAME(0, @LOCALWORK1, @LOCALWORK2)
_TALKMSG('dp_dummy_file%dummy_msg')
```

For example sake, imagine you have a party with a Bulbasaur in the lead, with Charmander and Squirtle in the 2nd and 3rd slot respectively.

This script loads `@LOCALWORK1` as 0, and `@LOCALWORK2` as -1 into memory. `_TEMOTI_BOX_POKEMON_NAME` will then check the 1st Pokémon (0-indexed values) in the party (-1 is the party, everything above that is a box).

The above script will then put the Pokémon name of Pokémon in the 1st position in my box, which is Bulbasaur in this case, in tag position 0 and then print out the message from `dp_dummy_file%dummy_msg`. This will also happen if we selected the 2nd position in the party for Charmander and Squirtle, if the 3rd position in party was chosen.
