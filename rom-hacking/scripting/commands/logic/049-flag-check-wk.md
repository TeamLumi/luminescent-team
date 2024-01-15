# (49) _FLAG_CHECK_WK

## Effect

Checks the flag corresponding to the value of a work.

Sets a work with the result.

:::caution

Contrary to what might be expected, a result of 0 is true and 1 is false.

:::

## Syntax

```c
_FLAG_CHECK_WK(flag, result)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **flag** | The work containing the flag to check or the direct flag number | Work, Float | Required |
| **result** | The work to put the result in | Work | Required |

## Example

```c
_FLAG_SET(#FH_03)
_FLAG_CHECK_WK(#FH_03, @LOCALWORK1)
_IFVAL_JUMP(@LOCALWORK1, 'EQ', 0, 'ev_dummy')
```

The above script will set the #FH_03 flag.

Next, it checks the same flag. Since it is true, 0 is put into @LOCALWORK1.

Finally, @LOCALWORK1 is compared to 0. Since it is equal to it, the script jumps to ev_dummy.
