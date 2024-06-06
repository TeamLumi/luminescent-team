# Headers

## Introduction

Headers allow us to define a few things. They allow us to use cleaner manually created types than those provided in `il2cpp.h` and they allow us to reference methods in the main program.

## il2cpp.h

The `il2cpp.h` header includes all the types defined in the main program but they are not very pretty, they're all in the global namespace and have poor names. We do not include that file in the repo as we want to have clean types that are easier to deal with. When you want to use a specific type that is not available yet, you should create a new header in the `src/mod/externals` directory.

## Complete Example

See here an example header file for the PokemonParam Class. It includes function definitions, a super class, nested namespaces, the TypeInfo, etc.

```cpp title="src/mod/externals/Pml/PokePara/PokemonParam.h"
#pragma once

#include "externals/il2cpp-api.h"

#include "externals/Pml/PokePara/CoreParam.h"
#include "externals/Pml/PokePara/InitialSpec.h"
#include "externals/System/Primitives.h"

namespace Pml::PokePara {
  struct PokemonParam : ILClass<PokemonParam, 0x04c59c10> {
    struct Fields : CoreParam::Fields {
      // No new fields
    };

    struct StaticFields {
      System::Byte_array* sParamSerializeBuffer;
    };

    inline void ctor(int32_t monsno, uint16_t level, uint64_t id) {
      external<void>(0x02054fe0, this, monsno, level, id);
    }

    inline void ctor(Pml::PokePara::InitialSpec::Object* spec) {
      external<void>(0x02055140, this, spec);
    }
  };
}
```

The offset given as a template argument to `ILClass` points to the TypeInfo of the type you're defining. This is generally only needed if you need to access static fields or need to create a new instance.

If the type you're defining has a parent type (when the first field is named `super` in `il2cpp.h`), you should inherit its fields by making the inner `Fields` struct that you're defining a derived struct of the `Fields` struct of the parent type. If that was too confusing to follow, just remember that this is how you do it:
```cpp
struct Fields : Parent::Fields {
  // New fields
};
```

## ILClass vs ILStruct

There are a few ways to determine if the header you're creating should be an `ILClass` or an `ILStruct`.

### In il2cpp.h

You can check the `Object` struct for the type you're creating in `il2cpp.h` (The one that ends in `_o`). If there are both a `klass` and `monitor` field, then an `ILClass` should be used. If there is only the `fields` field, then an `ILStruct` is appropriate.

### In dump.cs

The type you're looking for will be defined either as a `class` or a `struct` in this file. No need to think too much about it: `class` corresponds to `ILClass` and `struct` corresponds to `ILStruct`.

## Referencing internal functions

Referencing internal functions is usually pretty simple.

### Non-static function

Here is an example for a non-static function:
```cpp
inline void ctor(Pml::PokePara::InitialSpec::Object* spec) {
  external<void>(0x02055140, this, spec);
}
```

`external<T>()` does most of the work for you. All you have to do is give it, in that order:
- The offset for the start of the function
- `this`, the current instance of the object
- All the arguments to call the function with, in order

If there is a return type that is not `void`, you can simply return the result of `external<T>()` directly. **Make sure you do not return if the return type is** `void`**! This is undefined behavior and could cause crashes.**

### Static function

For a static function, the format is similar but changes slightly:
```cpp
static inline bool IsGet(int32_t id) {
  return external<bool>(0x01d603e0, id);
}
```

The two differences are the addition of the `static` keyword at the front of the function, and not passing `this` to `external<T>()`. The rest is the same.

You can generally tell if a function is static or not by its arguments. If the first argument in ghidra is of the class's type and has the name `__this`, then it's usually non-static.

### MethodInfo

99% of the time, we can ignore the MethodInfo argument that is always the last argument of a function. It'll always be 0 or null.

In the rare chance that the MethodInfo of a function you wish to call **is** needed, its type will generally have the offset of the function appended to it (something like `MethodInfo_1CFA100`).

You can declare the function similarly to this:
```cpp
template <typename T>
inline T::Object* GetCurrentUIWindow(ILMethod<T>& method) {
  return external<typename T::Object*>(0x01cfa100, this, *method);
}
```

In the `ILClass`, you should define a `StaticILMethod` to use when calling:

```cpp
static inline StaticILMethod<0x04c90130, Dpr::UI::UIWindow> Method$$GetCurrentUIWindow_UIWindow_ {};
```

And when calling it, you can pass in this `StaticILMethod` like so:

```cpp
auto window = uiManager->GetCurrentUIWindow(Dpr::UI::UIManager::Method$$GetCurrentUIWindow_UIWindow_);
```

## Usage

When using these headers you've created, there's a few things to keep in mind.

### Ghidra type equivalence

Types that end in `_o` refer to an Object. You'll want to declare your variables similarly to this:
```cpp
Pml::PokePara::PokemonParam::Object* pokeParam = //...
```

Types that end in `_c` refer to a Class. You can access it through the `getClass()` static function, when the TypeInfo is defined.
```cpp
Pml::PokePara::PokemonParam::Class* pokeParamClass = Pml::PokePara::PokemonParam::getClass();
```

Types that end in `_Fields` refer to the fields. You can access them through the Object like this:
```cpp
Pml::PokePara::PokemonParam::Fields pokeParamFields = pokeParam->fields;
```

Types that end in `_StaticFields` refer to the static fields. You can access them through the Class like this:
```cpp
Pml::PokePara::PokemonParam::StaticFields* pokeParamStaticFields = pokeParamClass->static_fields;
```

Types that end in `_array` refer to an array of Objects. You can declare one like so:
```cpp
Pml::PokePara::PokemonParam::Array* pokeParamArray = //...
```

### New instance

You can create new Object instances with the `newInstance()` function. It will call the defined `ctor` function that matches the given arguments. For example, for a defined `ctor` that looks like this:
```cpp
inline void ctor(Pml::PokePara::InitialSpec::Object* spec) {
  external<void>(0x02055140, this, spec);
}
```

You can create a new instance (in this case, it's a `Pml::PokePara::PokemonParam::Object*`) like so:
```cpp
Pml::PokePara::InitialSpec::Object* initialSpec = //...
Pml::PokePara::PokemonParam::Object* param = Pml::PokePara::PokemonParam::newInstance(initialSpec);
```

And this will automatically call the appropriate memory allocation functions and the `ctor` function defined above.
