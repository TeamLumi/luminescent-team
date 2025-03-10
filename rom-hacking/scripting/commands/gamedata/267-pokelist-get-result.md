# (267) _POKELIST_GET_RESULT

## Effect

Used in tandem with the [_POKELIST_SET_PROC](./264-pokelist-set-proc.md) command.

Returns the values of which tray the selected Pokémon is in and the position within that tray. For context, the internal code refers to the Box and Party as "Trays".

:::info
The selected Pokémon comes from the [_POKELIST_SET_PROC](./264-pokelist-set-proc.md) command.
:::

## Syntax

```c
_POKELIST_GET_RESULT(work1, work2)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **work1** | The position that the selected Pokémon is in the box. Returns -1 if no Pokémon is chosen. Returns 0 for the party | Work | Required |
| **work2** | The "Tray" (Box or Party) that the selected Pokémon is in | Work | Required |

## Example

```c
_POKELIST_SET_PROC(1)
_POKELIST_GET_RESULT(@LOCALWORK2, @LOCALWORK3)
_IFVAL_JUMP(@LOCALWORK2, 'EQ', -1, 'dummy_no_pokemon_selected')
```

The above script will open the PC UI window and highlight every Pokémon that isn't in your party.

If the player decides not to choose a Pokémon, the `@LOCALWORK2` will return -1 which will then redirect the player to the `dummy_no_pokemon_selected` script

:::info
A list of which Pokémon are highlighted for each index can be found [here](../../../dictionary/pokelist-set-proc.md).
:::
