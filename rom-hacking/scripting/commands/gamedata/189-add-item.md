# (189) _ADD_ITEM

## Effect

Add an [Item](../../../dictionary/items.md) to the player's bag.

## Syntax

```c
_ADD_ITEM(item, amount, result)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **item** | The ID of the item to give | Work, Float | Required |
| **amount** | the amount | Work, Float | Required |
| **result** | The work to put the result into | Work | Required |

:::info
The `result` parameter is always 1 no matter what.
:::

## Example

```c
ev_dummy:
_LDVAL(@SCWK_TEMP0, 7); Dive Ball
_LDVAL(@SCWK_TEMP1, 1); Amount
_ADD_ITEM(@SCWK_TEMP0, @SCWK_TEMP1, @SCWK_ANSWER)
```

The above script will give the player 1 Dive Ball.
