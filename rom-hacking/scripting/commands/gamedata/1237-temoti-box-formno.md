# (1237) _TEMOTI_BOX_FORMNO

:::caution

Only usable in Luminescent Platinum (2.1F) and above

Does NOT work in Vanilla BDSP

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
| **tray_index** | The tray that the selected Pokémon is in (party is -1) | Work, Int | Required |
| **result** | The formNo of the selected Pokémon | Work | Required |

## Example

```c
; Example 1
_LDVAL(@LOCALWORK1, 0)
_LDVAL(@LOCALWORK2, -1)
_TEMOTI_BOX_FORMNO(@LOCALWORK1, @LOCALWORK2, @SCWK_ANSWER)

; Example 2
_LDVAL(@LOCALWORK1, 1)
_LDVAL(@LOCALWORK2, -1)
_TEMOTI_BOX_FORMNO(@LOCALWORK1, @LOCALWORK2, @SCWK_ANSWER)
```

For example sake, imagine you have a party with a Bulbasaur in the lead, with Unown R Form, Rotom, and Fan Rotom in the 2nd, 3rd, and 4th slots respectively.

The first example script loads `@LOCALWORK1` as 0, and `@LOCALWORK2` as -1 into memory. `_TEMOTI_BOX_FORMNO` will now check the first Pokémon (0-indexed values) in the party (-1 is the party, everything above that is a box) and load the formNo of that pokemon into `@SCWK_ANSWER`. In this first example, because the pokemon in the first position is Bulbasaur, `@SCWK_ANSWER` will be loaded as 0.

The second example script loads `@LOCALWORK1` as 1, and `@LOCALWORK2` as -1 into memory. `_TEMOTI_BOX_FORMNO` will now check the second Pokémon in the party and load the formNo of that pokemon into `@SCWK_ANSWER`. In the second example, because the second pokemon is Unown R Form, `@SCWK_ANSWER` will be 17.