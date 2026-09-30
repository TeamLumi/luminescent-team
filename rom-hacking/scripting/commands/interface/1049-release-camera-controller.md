# (1049) _RELEASE_CAMERA_CONTROLLER

## Effect

Unloads a Camera Controller assetbundle that had been loaded with [_LOAD_CAMERA_CONTROLLER](1036-load-camera-controller.md).

## Syntax

```c
_RELEASE_CAMERA_CONTROLLER()
```

## Example

```c
_LOAD_CAMERA_CONTROLLER('field/camera/chapter110')
_LOAD_WAIT_CAMERA_CONTROLLER()
_CAMERA_CONTROLLER_PLAY('chapter110-001_cut01')
_CAMERA_CONTROLLER_WAIT('chapter110-001_cut01')
_CAMERA_CONTROLLER_END()
_RELEASE_CAMERA_CONTROLLER()
```

The above script loads the `field/camera/chapter110` assetbundle and will wait for it to be loaded. Then it will attach the Field Camera to the root object of the Animation Clip called `chapter110-001_cut01` and will play it until it finishes. The camera is then reattached to the player and the assetbundle is unloaded.