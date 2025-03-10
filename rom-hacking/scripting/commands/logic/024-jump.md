# (24) _JUMP

## Synonyms

- _SCENE_CHANGE_LABEL
- _FLAG_CHANGE_LABEL
- _OBJ_CHANGE_LABEL
- _INIT_CHANGE_LABEL

## Effect

Jumps to a script.

The position of a jump is not saved. Execution does not return to this command once a _RET is executed.

## Syntax

```c
_JUMP(label)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **label** | The label to jump to | String | Required |

## Example

```c
_JUMP('ev_dummy')
_SE_PLAY('S_BOO')

ev_dummy:
_SE_PLAY('S_PINPON')
_RET()
```

The above script will jump to the ev_dummy script.

Once there, the sound effect 'S_PINPON' plays. Then, since there were no previous _CALL commands, execution ends. The sound effect 'S_BOO' will not play.
