# (309) _ITEM_NAME

## Effect

Puts the item name in the [Buffer](../../introduction.md#text-output-buffer) at the given index.

## Syntax

```c
_ITEM_NAME(index, item)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **index** | The index of the buffer to write the value to | Float | Required |
| **item** | The item ID | Work, Float | Required |

## Example

```c
ev_dummy:
_LDVAL(@SCWK_TEMP1, 7); Dive Ball
_ITEM_NAME(0, @SCWK_TEMP1)
_TALKMSG('dp_dummy_file%dummy_msg')
```

The above script will put the item name of Dive Ball in buffer position 0 and then print out the message from `dp_dummy_file%dummy_msg`.
