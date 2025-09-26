# (307) _RIVAL_NAME

## Effect

Puts the rival name in the [Buffer](../../introduction.md#text-output-buffer) at the given index.

## Syntax

```c
_RIVAL_NAME(index)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **index** | The index of the buffer to write the value to | Work, Float | Required |

## Example

```c
ev_dummy:
_RIVAL_NAME(0)
_TALKMSG('dp_dummy_file%dummy_msg')
```

The above script will put the rival name in buffer position 0 and then print out the message from `dp_dummy_file%dummy_msg`.
