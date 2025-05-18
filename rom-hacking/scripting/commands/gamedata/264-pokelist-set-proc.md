# (264) _POKELIST_SET_PROC

## Effect

Opens a UI window of the PC with the party and highlights all of the Pokémon that match the parameters set in the BoxOpenParam which is defined in the UIDatabase file found in the masterdatas bundle.

:::info
A list of which Pokémon are highlighted for each index can be found [here](../../../dictionary/pokelist-set-proc.md).
:::

## Syntax

```c
_POKELIST_SET_PROC(BoxOpenParamIndex)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **BoxOpenParamIndex** | The index defined in BoxOpenParam | Number | Required |

## Example

```c
_LDVAL(@LOCALWORK1, 1)
_POKELIST_SET_PROC(@LOCALWORK1)
```

The above script will set the work variable @LOCALWORK1 to 1.

Then, the PC UI window will open and highlight every Pokémon that isn't in your party.

Finally, the UI window is closed.
