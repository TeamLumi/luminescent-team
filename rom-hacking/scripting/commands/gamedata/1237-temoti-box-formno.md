# (1237) _TEMOTI_BOX_FORMNO

:::warning
FOR LUMINESCENT PLATINUM AND ABOVE ONLY

DOES NOT WORK IN VANILLA BDSP
:::

## Effect

Returns the Form Number (formNo) of the selected pokemon.

Often used with the [_POKELIST_GET_RESULT](./267-pokelist-get-result.md) and [_POKELIST_SET_PROC](./264-pokelist-set-proc.md) commands.

## Syntax

```c
_TEMOTI_BOX_FORMNO(work1, work2, result)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **work1** | The position that the selected pokemon is in the box. | Work, Int | Required |
| **work2** | The "Tray" (Box or Party) that the selected pokemon is in | Work, Int | Required |
| **result** | The formNo of the selected pokemon | Work | Required |

## Example

```c
_LDVAL(@LOCALWORK1, 1)
_LDVAL(@LOCALWORK2, 0)
_TEMOTI_BOX_FORMNO(@LOCALWORK1, @LOCALWORK2, @SCWK_ANSWER)
```

For example sake, imagine you have a party with a Bulbasaur in the lead, with Unown R Form, Rotom, and Heat Rotom in the 2nd, 3rd, and 4th slots respectively.

This script loads `@LOCALWORK1` as 1, and `@LOCALWORK2` as 0 into memory. `_TEMOTI_BOX_FORMNO` will then check the first pokemon in the party (0 is the party, everything above that is a box). If there's a pokemon there, it will return the formNo in the `@SCWK_ANSWER` work.

In this example, `@SCWK_ANSWER` will be 0 for Bulbasaur. If we chose the second slot, `@SCWK_ANSWER` will be 17 for Unown R Form. If we chose Rotom, then `@SCWK_ANSWER` will be 0, since that's the base form Rotom. If we chose Fan Rotom, `@SCWK_ANSWER` will be 4
