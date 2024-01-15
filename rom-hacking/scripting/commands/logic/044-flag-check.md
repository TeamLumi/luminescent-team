# (44) _FLAG_CHECK

## Effect

Checks the value of a flag and sets the comparison result.

:::caution

The comparison result is "less" if the flag is true, and "equal" if the flag is false. Keep this in mind if using "FLGON" and "FLGOFF" as the comparison operator since they correspond to "equal" and "less" respectively (so the opposite of what you would expect here).

:::

## Syntax

```c
_FLAG_CHECK(flag)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **flag** | The flag to check | Flag | Required |

## Example

```c
_FLAG_SET(#FH_03)
_FLAG_CHECK(#FH_03)
_IF_JUMP('FLGON', 'ev_dummy')
```

The above script will set the #FH_03 flag.

Then, the #FH_03 flag is checked and the comprison result is set.

Next, the result of the comparison is checked. Since the condition is "FLGON" which corresponds to "equal", ev_dummy will not be jumped to.
