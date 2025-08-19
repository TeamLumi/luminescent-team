# TrainerTable

:::info
This page is WIP and may not be complete in some parts.
:::

The TrainerTable is an asset in the **masterdatas** assetbundle that contains information about trainers and their teams.

## TrainerType:

The TrainerType table details information about each trainer type in the game. These trainer types can be used in trainer teams.

```c
{
      "TrainerID": 66,
      "LabelTrType": "DP_Trainers_Type_TR_RIVAL_01",
      "Sex": 0,
      "Group": 1,
      "BallId": 4,
      "FieldEncount": [
        "01",
        "02"
      ],
      "BtlEffId": [
        25,
        72,
        73,
        68
      ],
      "EyeBgm": "EV201",
      "ModelID": "tr0002_00",
      "Hand": 2,
      "HoldBallHand": 0,
      "HelpHand": 1,
      "HelpHoldBallHand": 1,
      "ThrowTime": 0.01,
      "CaptureThrowTime": 0.01,
      "LoseLoopTime": 2.0,
      "TrainerEffect": "",
      "Age": 2
    },
```

## Attributes

### TrainerID

The index for the TrainerType table. These should be unique to each other.

### LabelTrType

This is the field that shows up when you defeat a trainer and it says you defeated `{Trainer Type} {Trainer Name} was defeated` and other related text fields.

### Sex

The use for this field has not been documented. Might be for pronouns.

### Group

Corresponds to the amount of friendship given when defeated.

### BallId

The type of poke balls that are thrown by the trainer. It will be this for every mon unless the mon overwrites it.

### FieldEncount

The use for this field has not been documented.

### BtlEffId

Defines the music that happens during the battle for these specific types of battles based on the index:

1. Single battle
2. Double battle with 1 enemy trainer
3. Double battle with 2 enemy trainers
4. Multi battle with 2 enemy trainers

### EyeBgm

The music that occurs when the trainer sees you to battle.

### ModelID

The model used in battle.

### Hand, HoldBallHand, HelpHand, HelpHoldBallHand

The hand that the ball is thrown with. The hand that the ball is held with during the entry animation. The hand that the second ball is held in when using two Pokémon. The hand that the second ball is held in during the entry animation when using two Pokémon.

| Value | Hand |
| - | - |
| 0 | None |
| 1 | Left |
| 2 | Right |

### ThrowTime

Stubbed

### CaptureThrowTime

Stubbed

### LoseLoopTime

Seconds that the lose animation starts from after its first full run through.

### TrainerEffect

Any battle particle effect by its effectId, it's when the trainer battle first opens in front of the screen when the trainers slide over from left to right at the start.

### Age

The use for this field has not been documented. Probably stubbed.