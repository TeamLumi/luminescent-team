# Exefs Modding Guide

## WIP - These docs are a Work In Progress and are currently mostly for my own use

## Introduction

There are a few main components to exefs modding that you will need to have at least a basic understanding of.

- Using Ghidra/IDA to research
- [ARM opcodes](https://developer.arm.com/documentation/ddi0487/ha/?lang=en)
- Using Starlight to compile c++ code

The basic format is to use ghidra to find an offset where we want to inject custom code. We then write c++ code and build it using starlight. This then gives us IPS patches we can install on our switch or emulator.

## Setup

- [Set up Ghidra](./Setting%20Up%20Ghidra.md)

- [Set up Starlight](./Setting%20Up%20Starlight.md)

## Building

The Starlight template has build options for `atmosphere`, `yuzu`, `ryujinx` and `simplemodmanager`, when you build for any of these targets it will output files and folders in the correct directory structure to be dumped into the mods folder.

To build you mod into an IPS Patch simply run the following commands.

```bash
cmake . -DCMAKE_TOOLCHAIN_FILE=cmake/toolchain.cmake  # Configure tasks
make release_<target>                                 # build tree
make zip_<target>                                     # export as zip
make send_<target>                                    # optional: send to switch using ftp (only supports atmosphere and simplemodmanager) 
```

To build for another target simply replace `<target>` with your build target e.g., `atmosphere`

```bash
make release_atmosphere
```

## Example Usage

lets go through an example of disabling the affection mechanic.  
This is something you could pretty easily do without Starlight but its a decent example.

1. Set up your development enviroment as above.

2. Use Ghidra (and/or dnSpy) to find the offset to a function where you want to inject your custom code. This is probably going to be the hardest part, we need to look through the code and find the relevant location for our injection.

   1. Lets open ghidra and search through the functions using the Symbol Tree on the left sidebar.
   2. Just from messing around in the files we know `Dpr` is where most game functions are. Within this we know affection is a battle mechanic so lets look under `Dpr.Battle.Logic`.  
   3. After a bit of searching around we find a function in the `MainModule` called `Dpr.Battle.Logic.MainModule$$IsFriendshipActive` which returns a `boolean`, this looks correct so lets assume it is and test it.
   4. The function starts at the adress of `71020378d0` in `BD-1.3.0` which equates to an offset of `020378d0`.

3. Create an `.slpatch` file in the `patches` directory which states the offset to inject your code and the function to run.

   1. Lets create a new file `patches\affection.slpatch`
   2. At the top of the file add the target file and version `[target=main, version=bd_130]`
   3. Add the offset where we want to inject our code and a colon, `020378d0:`
   4. Each line under this thats indented is the code to run as ASM codes. (See the ARM opcodes reference) As we want to branch to a new function lets add `b` and the name of the function we will be making in the next step. e.g., `b affection`

   ```
   [target=main, version=bd_130]
   020378d0:  // Dpr.Battle.Logic.MainModule$$IsFriendshipActive
      b affection
   ```

4. Create a `c++` file in the `src` directory which contains the code to be run.

   1. Lets create a new file `src\affection.cpp`
   2. Within this file lets create a function that matches the one we found earlier but lets name it `affection`.  
   You'll notice that to make it match it needs to take an argument `Dpr_Battle_Logic_MainModule_o* mainModule`, we will need to add `#include "il2cpp.h"` to the top of the file to include the types from the original program.
   3. Inside this function lets just make it `return false;`

   ```cpp
   #include "il2cpp.h"

   bool affection(Dpr_Battle_Logic_MainModule_o* mainModule) {
       return false;
   }
   ```

5. Build your mod as above.

6. Install and test your new mod on your target platform.
