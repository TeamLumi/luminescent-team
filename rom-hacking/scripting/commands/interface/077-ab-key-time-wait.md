# (77) _AB_KEY_TIME_WAIT

## Effect

Waits an amount of time and then for the player to press A or B.

## Syntax

```c
_AB_KEY_TIME_WAIT(time)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **time** | The amount of time to wait, in seconds | Work, Float | Required |

## Example

```c
_LDVAL(@LOCALWORK1, 5)
_AB_KEY_TIME_WAIT(@LOCALWORK1)
_SE_PLAY('S_PINPON')
```

The above script will set the work variable @LOCALWORK1 to 1.

Then, the script waits for 5 seconds, then waits for the player to press A or B. Once the player does, the sound effect 'S_PINPON' plays.
