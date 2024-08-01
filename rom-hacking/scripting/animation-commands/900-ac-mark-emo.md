# (900) _AC_MARK_EMO

## Effect

Displays an emotion bubble above the entity's head. The list of emotions can be found at the bottom of this page.

The bubble lasts for 1.5 seconds.

:::caution
Passing an invalid emotion displays a heart and softlocks the game.
:::

## Syntax

```c
_AC_MARK_EMO(emotion)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **emotion** | The emotion to display | Float | Required |

## Example

```c
anm_dummy:
_AC_MARK_EMO(2)
_ACMD_END()
```

The above script will display a heart above the entity's head.

:::info
A list of animations can be found [here](../../dictionary/chibi-emotions.md).
:::
