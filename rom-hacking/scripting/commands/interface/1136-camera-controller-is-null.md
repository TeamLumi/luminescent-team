# (1136) _CAMERA_CONTROLLER_IS_NULL

## Effect

Checks if a Camera Controller is currently loaded and stores the result in a work variable.

The result will be 0 if a Camera Controller is loaded and 1 if it is not.

## Syntax

```c
_CAMERA_CONTROLLER_IS_NULL(result)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **result** | Result of if a Camera Controller is loaded | Work | Required |


## Example

```c
ev_dummy:
_CAMERA_CONTROLLER_IS_NULL(@LOCALWORK1)
_IFVAL_CALL(@LOCALWORK1, 'EQ', 0, 'ev_dummy_release')
ev_dummy_release:
_RELEASE_CAMERA_CONTROLLER()
_RET()
```

The above script checks if a Camera Controller is loaded and calls a script to unload it if one is.