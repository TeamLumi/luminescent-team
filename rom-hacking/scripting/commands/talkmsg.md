# (70) _TALKMSG

## Synonyms

- _TALK_KEYWAIT

## Effect

Opens a basic message box.

Sets PlayTextFeedSe to true if **textSe** is 1.

## Syntax

```c
_TALKMSG(message, textSe)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **message** | The label for the message that gets shown, in format "file%message" | String | Required |
| **textSe** | If PlayTextFeedSe should be true | Work, Float | Optional |

```c
_TALKMSG(messageFile, message, textSe)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **messageFile** | The file containing the label for the message that gets shown | String | Required |
| **message** | The label for the message that gets shown | String | Required |
| **textSe** | If PlayTextFeedSe should be true | Work, Float | Optional |

## Example

```c
_LDVAL(@LOCALWORK1, 1)
_TALKMSG('dp_dummy_file%dummy_msg', @LOCALWORK1)
```

The above script will set the work variable @LOCALWORK1 to 1.

Then, a message box is opened with the text contained in the label dummy_msg of the dp_dummy_file message file.

PlayTextFeedSe is set to true as well because of @LOCALWORK1's value.
