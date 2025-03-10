# (4) _TIME_WAIT

## Effect

Blocks script execution for the amount of time given.
The **result** work is set to 1 on every loop until the time has expired. It is then set to 0 and execution resumes.

## Syntax

```c
_TIME_WAIT(time, result)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **time** | The amount of time to wait, in frames (30 frames per second) | Work, Float | Required |
| **result** | The work to put the result into | Work | Required |

## Example

```c
_TIME_WAIT(120, @LOCALWORK2)
_SE_PLAY('S_PINPON')
```

The above script will block script execution for approximately 4 seconds. The work variable @LOCALWORK2 is set to 0 upon execution resuming.

Finally, the sound effect 'S_PINPON' plays.
