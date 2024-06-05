# (36) _SWITCH

## Effect

Prepares a "switch" statement based on the value of the given work.

## Syntax

```c
_SWITCH(work)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **work** | The work to use | Work | Required |

## Example

```c
_LDVAL(@LOCALWORK1, 2)
_SWITCH(@LOCALWORK1)
_CASE_JUMP(1, 'ev_dummy_1')
_CASE_JUMP(2, 'ev_dummy_2')
_CASE_JUMP(3, 'ev_dummy_3')
```

The above script will set the work variable @LOCALWORK1 to 2.

Then, a switch statement using @LOCALWORK1 is prepared.

First, the value of @LOCALWORK1 is compared to 1. Since they're not equal, execution continues.

Then, the value of @LOCALWORK1 is compared to 2. Since they're equal, ev_dummy_2 is jumped to.
