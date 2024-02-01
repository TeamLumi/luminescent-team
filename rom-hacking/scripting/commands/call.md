# (28) _CALL

## Synonyms

- _CHG_COMMON_SCR

## Effect

Calls a script.

The position of the call is saved. Execution returns to this command once a _RET is executed.

## Syntax

```c
_CALL(label)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **label** | The label to call | String | Required |

## Example

```c
_CALL('ev_dummy')
_SE_PLAY('S_BOO')

ev_dummy:
_SE_PLAY('S_PINPON')
_RET()
```

The above script will jump to the ev_dummy script.

Once there, the sound effect 'S_PINPON' plays. Then, execution returns to where the last call happened.

After returning, the sound effect 'S_BOO' plays.
