# (76) _AB_KEYWAIT

## Effect

Waits for the player to press A or B.

## Syntax

```c
_AB_KEYWAIT()
```

## Example

```c
_LDVAL(@LOCALWORK1, 1)
_AB_KEYWAIT()
_SE_PLAY('S_PINPON')
```

The above script will set the work variable @LOCALWORK1 to 1.

Then, the script waits for the palyer to press A or B. Once the player does, the sound effect 'S_PINPON' plays.
