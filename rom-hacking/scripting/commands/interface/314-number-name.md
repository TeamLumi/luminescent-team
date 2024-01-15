# (309) _NUMBER_NAME

## Effect

Puts the number in the [Buffer](../../../dictionary/glossary.md#text-output-buffer) at the given index.

## Syntax

```c
_NUMBER_NAME(index, number)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **index** | The index of the buffer to write the value to | Float | Required |
| **number** | The number | Work, Float | Required |

## Example

```c
ev_dummy:
_LDVAL(@SCWK_TEMP1, 7); Digit 7
_NUMBER_NAME(0, @SCWK_TEMP1)
_TALKMSG('dp_dummy_file%dummy_msg')
```

The above script will put the number 7 in buffer position 0 and then print out the message from `dp_dummy_file%dummy_msg`.
