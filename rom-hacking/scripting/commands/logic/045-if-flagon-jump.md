# (45) _IF_FLAGON_JUMP

## Effect

Checks the value of a flag. Jumps to a script if it is true.

The position of the jump is not saved. Execution does not return to this command once a _RET is executed.

## Syntax

```c
_IF_FLAGON_JUMP(flag, label)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **flag** | The flag to check | Flag, SysFlag | Required |
| **label** | The label to jump to | String | Required |

## Example

```c
_FLAG_SET(#FH_03)
_IF_FLAGON_JUMP(#FH_03, 'ev_dummy')
```

The above script will set the #FH_03 flag.

Next, it checks the same flag. Since it is true, the script jumps to ev_dummy.
