# (1137) _UMA_IS_NULL

## Effect

Checks if an UMA Anime Controller is currently loaded and stores the result in a work variable.

The result will be 0 if an UMA Anime Controller is loaded and 1 if it is not.

## Syntax

```c
_UMA_IS_NULL(result)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **result** | Result of if an UMA Anime Controller is loaded | Work | Required |


## Example

```c
ev_dummy:
_UMA_IS_NULL(@LOCALWORK1)
_IFVAL_CALL(@LOCALWORK1, 'EQ', 0, 'ev_dummy_release')
ev_dummy_release:
_RELEASE_UMA_ANIME()
_RET()
```

The above script checks if an UMA Anime Controller is loaded and calls a script to unload it if one is.