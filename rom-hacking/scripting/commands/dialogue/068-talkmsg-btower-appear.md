# (68) _TALKMSG_BTOWER_APPEAR

## Effect

Opens the next Battle Tower trainer's introduction textbox.

## Syntax

```c
_TALKMSG_BTOWER_APPEAR(index)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **index** | The index of the trainer to open the textbox of (0 for the first trainer and 1 for the second trainer in double battles) | Work, Float | Optional |

## Example

```c
_TALKMSG_BTOWER_APPEAR(0)
_TALKMSG_BTOWER_APPEAR(1)
_TALK_CLOSE()
```

The above script will open the introduction textbox of the first trainer, then open the one for the second trainer.

Finally, the textbox is closed.
