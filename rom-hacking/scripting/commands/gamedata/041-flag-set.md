# (41) _FLAG_SET

## Effect

Sets the given flag to true.

If the flag is #FLAG_STOP_ZONE_PROGRAM, also updates FieldManager's eventTownMapPos to the player's world position.

## Syntax

```c
_FLAG_SET(flag)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **flag** | The flag to set | Flag | Required |

## Example

```c
_FLAG_SET(#FH_03)
```

The above script will set the #FH_03 flag.
