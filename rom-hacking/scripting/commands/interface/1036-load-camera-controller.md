# (1036) _LOAD_CAMERA_CONTROLLER

## Effect

Loads an assetbundle with an Animator Controller in the `field/camera` directory. Only one of these can be loaded at one time.

These assetbundles contain Animation Clips that can be called with [_CAMERA_CONTROLLER_PLAY](1038-camera-controller-play.md) to serve as a track for the Field Camera to be attached to.

## Syntax

```c
_LOAD_CAMERA_CONTROLLER(assetbundlePath)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **assetbundlePath** | The path to the assetbundle | String | Required |


## Example

```c
_LOAD_CAMERA_CONTROLLER('field/camera/chapter110')
_LOAD_WAIT_CAMERA_CONTROLLER()
_CAMERA_CONTROLLER_PLAY('chapter110-001_cut01')
_CAMERA_CONTROLLER_WAIT('chapter110-001_cut01')
```

The above script loads the `field/camera/chapter110` assetbundle and will wait for it to be loaded. Then it will attach the Field Camera to the root object of the Animation Clip called `chapter110-001_cut01` and will play it until it finishes.