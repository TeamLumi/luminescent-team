# (146) _OBJ_ADD

## Effect

Shows a PlaceData. This does not carry over after the area is reloaded.

## Syntax

```c
_OBJ_ADD(id)
```

| Argument | Description | Types | Required |
| - | - | - | - |
| **id** | The ID of the PlaceData | Float | Required |

## Example

```c
ev_dummy:
_OBJ_ADD('T01_WOMAN1')
_END()
```

The above script will show the PlaceData with the ID 'T01_WOMAN1' at its position defined in the corresponding PlaceData file.

The above PlaceData should also be found in Vanilla BDSP in the file 'PlaceData_A01.json'.
