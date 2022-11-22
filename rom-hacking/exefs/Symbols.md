# Symbol Linking

## WIP - These docs are a Work In Progress and are currently mostly for my own use

## Introduction

If you want to use any functions or defined symbols from the `main` program, your code needs to know where those symbols are actually defined in memory.
You will need to find these symbols in Ghidra and add their offsets to the `linkerscripts/symbols.<version>.ld` file.

## Mangled Names

C++ mangles any symbol names used in your program, these are unique between namespaces. You will need to use the mangled name in your symbols definition file.  
You can find the mangled names of the symbols you need in a few different ways.
1. `nm CMakeFiles/<Repo Name>.dir/src/<Your .cpp file>.obj`
   1. You'll need to build your project first for this field to be populated
   2. You'll find every symbol your file references inside here with its mangled name
2. `mangler.sh <your method/symbol>`
   1. You'll need to enter your method/symbol including any namespaces and parameters.

## Finding the offset

Finding the offset in Ghidra is relatively simple. This is literally just the location in memory of the function/symbol relative to the program; just go to the function/symbol in ghidra and copy the offset location. This is the same location used for injecting code. Make sure to remove the `0x7100000000` from the start of your offset if using Ghidra Switch Loader.

## Add the symbol to the linker script

1. Open the relevant linker script file (`linkerscripts/symbols.<version>.ld`)
2. Add a new line to the file as follows  
`<Mangled Symbol> = <symbol offset> - <subsdk1 offset>;`  
e.g., `_ZN3Dpr2UI13PoketchButton6OnPushEP10MethodInfo = 0x01e622c0 - 0x05708000;`