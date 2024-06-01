---
sidebar_position: 5
---

# Hooks

## Introduction

In ExLaunch, there are three types of hooks that are available to us. Each of them is useful for different reasons.

Generally, hook definitions will look similar to this:
```cpp
HOOK_DEFINE_<TYPE>(<Name>) {
  static <ReturnType> Callback(<arguments>) {
    // Code
  }
};
```

## Replace Hook

This is the most common type of hook. It replaces the code of a function with the code defined in the hook.

Here is an example replace hook for the `Dpr.Battle.Logic.MainModule$$GetMaxFollowPokeLevel` function:
```cpp
HOOK_DEFINE_REPLACE(Dpr_Battle_Logic_MainModule_GetMaxFollowPokeLevel) {
  static uint8_t Callback(Dpr::Battle::Logic::MainModule::Object* __this) {
    // Setting the obedience threshold to always be Lv. 100.
    return 100;
  }
};
```

The offset a replace hook is installed at is the offset of the replaced function.

## Trampoline Hook

This hook acts similarly to a replace hook, but allows the original function to be called from within it, therefore keeping it "intact" in a way.

Here is an example trampoline hook for the `FieldManager$$CheckAvailableFieldItem` function:
```cpp
HOOK_DEFINE_TRAMPOLINE(ShortcutCheckAvailability) {
  static bool Callback(FieldManager::Object* __this, uint16_t itemno) {
    if (CanUseRegisteredCustomItem(itemno)) {
      return true;
    }

    return Orig(__this, itemno);
  }
};
```

As shown above, to call the original function, you simply call `Orig()` with the arguments defined for `Callback()`.

The offset a trampoline hook is installed at is the offset of the replaced function.

## Inline Hook

This is the most complicated type of hook to deal with, but it can be very powerful when used to its full potential.

Instead of installing it at the start of a function, this hook is installed at any offset and replaces one instruction. Because of this, we have direct access to registers instead of a function's arguments.

Here is an example inline hook at offset `01daca9c`, for the `FieldPlayerEntity$$CheckSwim` function:
```cpp
HOOK_DEFINE_INLINE(CheckSurfFlags) {
  static void Callback(exl::hook::nx64::InlineCtx* ctx) {
    bool result = true;
    result &= PlayerWork::GetSystemFlag((int32_t)FlagWork_SysFlag::BADGE_ID_C06);
    result &= PlayerWork::GetBool((int32_t)FlagWork_Flag::FE_HIDEN_03_GET);

    ctx->X[0] = result ? 1 : 0;
  }
};
```

The replaced instruction above is a simple call to `FlagWork$$GetSysFlag`. We replace it with the original check, and also a second check to a work value.

To access registers, we use the `ctx` argument. It has a `uint64_t` array called `X` to access the 64-bit registers, and a `uint32_t` array called `W` for the 32-bit registers. These can be read and written to directly.

:::info

The `W` registers represent the lower 32 bits of the corresponding `X` registers. They are technically not a separate set of registers.

:::

A function's arguments are typically stored in registers `X0` to `X7` at the start of it. When returning a value, a function writes that value to register `X0`.
