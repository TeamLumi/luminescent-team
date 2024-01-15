# (873) _SET_SYS_FLAG

## Effect

Add an [Item](../../../dictionary/items.md) to the player's bag.

A list of all System Flags can be found [here](../../../dictionary/system-flags.md).

:::info
System Flags are remembered when closing the game.
:::

## Syntax

```c
_SET_SYS_FLAG(flag)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **flag** | The System flag to set | SysFlag | Required |

## Example

```c
ev_dummy:
_SET_SYS_FLAG($SYS_FLAG_AUTOSAVE_STOP)
; my code
_RESET_SYS_FLAG($SYS_FLAG_AUTOSAVE_STOP)
```

The above script will disable then enable the auto save feature.

