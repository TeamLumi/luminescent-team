# (1038) _CAMERA_CONTROLLER_PLAY

## Effect

Attaches the Field Camera to the root object of a given Animation Clip and plays it.

## Syntax

```c
_CAMERA_CONTROLLER_PLAY(animationClip)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **animationClip** | The name of the Animation Clip | String | Required |

## Example

```c
_LOAD_CAMERA_CONTROLLER('field/camera/chapter110')
_LOAD_WAIT_CAMERA_CONTROLLER()
_CAMERA_CONTROLLER_PLAY('chapter110-001_cut01')
_CAMERA_CONTROLLER_WAIT('chapter110-001_cut01')
```

The above script loads the `field/camera/chapter110` assetbundle and will wait for it to be loaded. Then it will attach the Field Camera to the root object of the Animation Clip called `chapter110-001_cut01` and will play it until it finishes.