# (326) _FIRST_POKE_NO_GET

## Effect

Returns which starter the player chose.

## Return Values

### Vanilla

Vanilla returns the Natdex number of the chosen starter.

### Lumi

| Value | Meaning |
| - | - |
| 0 | Turtwig |
| 1 | Chimchar |
| 2 | Piplup |

## Syntax

```c
_FIRST_POKE_NO_GET(result)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **result** | The work to put the result into | Work | Required |

## Example

```c
ev_dummy:
_FIRST_POKE_NO_GET(@SCWK_ANSWER)
```

The above script will check the starter the player chose and stores the result in the work `@SCWK_ANSWER`.
