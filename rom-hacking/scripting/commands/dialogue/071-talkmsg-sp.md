# (71) _TALKMSG_SP

## Effect

Opens a basic textbox with a given message.

## Syntax

```c
_TALKMSG_SP(file, index, text_sound_effect?)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **file** | The file containing the message that gets shown | String | Required |
| **index** | The label index for the message that gets shown | Work, Float | Required |
| **sound_effect** | If equal to 1, the text clicking sound effect plays when the textbox opens | Work, Float | Optional |

## Example

```c
_LDVAL(@LOCALWORK1, 4)
_TALKMSG_SP('dp_dummy_file', @LOCALWORK1)
_TALK_CLOSE()
```

The above script will set the work variable @LOCALWORK1 to 4.

Then, a textbox is opened with the text contained in the label at index 4 in the dp_dummy_file message file.

Finally, the textbox is closed.
