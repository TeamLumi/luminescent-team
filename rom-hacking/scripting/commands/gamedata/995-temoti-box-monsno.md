# (995) _TEMOTI_BOX_MONSNO

## Effect

Returns the Pokedex Number of the selected Pokémon.

Often used with the [_POKELIST_GET_RESULT](./267-pokelist-get-result.md) and [_POKELIST_SET_PROC](./264-pokelist-set-proc.md) commands.

## Syntax

```c
_TEMOTI_BOX_MONSNO(work1, work2, result)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **work1** | The position that the selected Pokémon is in the box. | Work, Int | Required |
| **work2** | The "Tray" (Box or Party) that the selected Pokémon is in | Work, Int | Required |
| **result** | The Pokedex Number of the selected Pokémon | Work | Required |

## Example

```c
_LDVAL(@LOCALWORK1, 1)
_LDVAL(@LOCALWORK2, 0)
_TEMOTI_BOX_MONSNO(@LOCALWORK1, @LOCALWORK2, @SCWK_ANSWER)
```

For example sake, imagine you have a party with a Bulbasaur in the lead, with Charmander and Squirtle in the 2nd and 3rd slot respectively.

This script loads `@LOCALWORK1` as 1, and `@LOCALWORK2` as 0 into memory. `_TEMOTI_BOX_MONSNO` will then check the first Pokémon in the party (0 is the party, everything above that is a box). If there's a Pokémon there, it will return the Pokedex Number in the `@SCWK_ANSWER` work.

In this example, it will return 1 for Bulbasaur. If we chose the second slot, it would return 4 for Charmander. And 7 if we chose Squirtle.

:::info
FOR LUMINESCENT PLATINUM ONLY:

If you are working with a Pokémon that has different forms like Rotom or Wormadam, you'll also want to use the [_TEMOTI_BOX_FORMNO](./1237-temoti-box-formno.md) command.
:::
