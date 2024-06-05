# (479) _GET_MY_SEX

## Effect

Returns the sex of the player.

This is mostly used for determining if Lucas or Dawn should be used in scenes.

## Return Values

| Value | Meaning |
| - | - |
| 0 | Male |
| 1 | Female |

## Syntax

```c
_GET_MY_SEX(result)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **result** | The work to put the result into | Work | Required |

## Example

```c
ev_dummy:
_GET_MY_SEX(@SCWK_ANSWER)
```

The above script will get the player sex and store it in the work `@SCWK_ANSWER`.
