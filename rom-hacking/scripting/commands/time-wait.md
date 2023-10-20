# (4) _TIME_WAIT

## Effect

Blocks script execution for the amount of time given.
The **result** work is set to 0 on every loop until the time has expired. It is then set to 1 and execution resumes.

## Syntax

```c
_TIME_WAIT(time, result)
```

| Argument | Description | Types |
| - | - | - |
| **time** | The amount of time to wait, in frames (1/30ths of a second) | Work, Float |
| **result** | The work to put the result into | Work |

## Example

```c
_TIME_WAIT(120, @LOCALWORK2)
_SE_PLAY('S_PINPON')
```

The above script will block script execution for approximately 4 seconds. The work variable @LOCALWORK2 is set to 1 upon execution resuming.

Finally, the sound effect 'S_PINPON' plays.
