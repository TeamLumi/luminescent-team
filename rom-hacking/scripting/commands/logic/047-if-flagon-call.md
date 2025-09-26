# (47) _IF_FLAGON_CALL

## Effect

Checks the value of a flag. Calls a script if it is true.

The position of a call is saved. Execution returns to this command once a _RET is executed.

## Syntax

```c
_IF_FLAGON_CALL(flag, label)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **flag** | The flag to check | Flag, System Flag | Required |
| **label** | The label to call | String | Required |

## Example

```c
_FLAG_SET(#FH_03)
_IF_FLAGON_CALL(#FH_03, 'ev_dummy')
```

The above script will set the #FH_03 flag.

Next, it checks the same flag. Since it is true, the script calls ev_dummy.
