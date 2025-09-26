# (70) _TALKMSG

## Synonyms

- _TALK_KEYWAIT

## Effect

Opens a basic textbox with a given message.

## Syntax

```c
_TALKMSG(message, text_sound_effect?)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **message** | The label for the message that gets shown, in the format "file%message" | String | Required |
| **sound_effect** | If equal to 1, the text clicking sound effect plays when the textbox opens | Work, Float | Optional |

## Example

```c
_LDVAL(@LOCALWORK1, 1)
_TALKMSG('dp_dummy_file%dummy_msg')
_TALK_CLOSE()
```

The above script will set the work variable @LOCALWORK1 to 1.

Then, a textbox is opened with the text contained in the label dummy_msg of the dp_dummy_file message file.

Finally, the textbox is closed.
