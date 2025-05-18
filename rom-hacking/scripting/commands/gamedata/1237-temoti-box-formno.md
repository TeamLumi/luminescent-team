# (1237) _TEMOTI_BOX_FORMNO

:::warning
FOR LUMINESCENT PLATINUM (2.1F) AND ABOVE ONLY

DOES NOT WORK IN VANILLA BDSP
:::

## Effect

Returns the Form Number (formNo) of the selected Pokémon.

Often used with the [_POKELIST_GET_RESULT](./267-pokelist-get-result.md) and [_POKELIST_SET_PROC](./264-pokelist-set-proc.md) commands.

## Syntax

```c
_TEMOTI_BOX_FORMNO(index, tray_index, result)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **index** | The position that the selected Pokémon is in the box. | Work, Int | Required |
| **tray_index** | The box that the selected Pokémon is in (party is -1) | Work, Int | Required |
| **result** | The formNo of the selected Pokémon | Work | Required |

## Example

```c
_LDVAL(@LOCALWORK1, 1)
_LDVAL(@LOCALWORK2, -1)
_TEMOTI_BOX_FORMNO(@LOCALWORK1, @LOCALWORK2, @SCWK_ANSWER)
```

For example sake, imagine you have a party with a Bulbasaur in the lead, with Unown R Form, Rotom, and Fan Rotom in the 2nd, 3rd, and 4th slots respectively.

This script loads `@LOCALWORK1` as 1, and `@LOCALWORK2` as -1 into memory. `_TEMOTI_BOX_FORMNO` will then check the first Pokémon in the party (-1 is the party, everything above that is a box). If there's a Pokémon there, it will return the formNo in the `@SCWK_ANSWER` work.

In this example, `@SCWK_ANSWER` will be 0 for Bulbasaur. If we chose the second slot, `@SCWK_ANSWER` will be 17 for Unown R Form. If we chose Rotom, then `@SCWK_ANSWER` will be 0, since that's the base form Rotom. If we chose Fan Rotom, `@SCWK_ANSWER` will be 4
