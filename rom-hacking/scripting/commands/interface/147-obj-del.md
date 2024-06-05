# (147) _OBJ_DEL

## Effect

Permanently hides a PlaceData and sets its visibility flag.

:::info
The visibility flag is touched, unlike [_OBJ_ADD](146-obj-add.md) which doesn't touch it.
:::

## Syntax

```c
_OBJ_DEL(id)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **id** | The ID of the PlaceData | Float | Required |

## Example

```c
ev_dummy:
_OBJ_DEL('T01_WOMAN1')
_END()
```

The above script will hide the PlaceData with the ID 'T01_WOMAN1' at its position defined in the corresponding PlaceData file.

The above PlaceData should also be found in Vanilla BDSP in the file 'PlaceData_A01.json'.
