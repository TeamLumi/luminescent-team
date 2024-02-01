# Setting Up Ghidra

## Introduction

Ghidra is a really useful tool for reverse engineering the code already written for the game. With it we are able to see the instructions called by the game to run and the offsets of those instructions. We use these offsets to tell ExLaunch where to inject our custom code.  
IL2CPPDumper Allows us to automatically assign names to various points in the program such as functions and static data.
[dnSpy](https://github.com/dnSpy/dnSpy/releases) is also a very useful tool here as its much more user friendly and allows us to easily find offsets. Just load the dummy DLLs produced by IL2CPPDumper.

## Requirements

- [Ghidra](https://github.com/NationalSecurityAgency/ghidra/releases)
- [Ghidra Switch Loader](https://github.com/Adubbz/Ghidra-Switch-Loader/releases) or [nx2elf](https://github.com/shuffle2/nx2elf)
  - The Ghidra Switch Loader loads the program with a base address of `0x7100000000` but we can change this pretty easily and its simpler.
- [IL2CPPDumper](https://github.com/Perfare/Il2CppDumper/releases)
- A Game Dump with exefs and romfs. We need specifically two files.
  - `main` from `exefs/main`
  - `global-metadata.dat` from `romfs/Data/Managed/Metadata/global-metadata.dat`

## Importing to Ghidra

1. Run IL2CPPDumper on `main` and `global-metadata.dat` from the game dump. This will output a bunch of interesting files to `il2cpp_dump` folder. (mainly `il2cpp.h`, `script.json` and a bunch of Dummy DLLs)

    ```shell
    il2cppdumper.exe main global-metadata.dat il2cpp_dump
    ```

2. Run the `il2cpp_header_to_ghidra.py` script on `il2cpp.h` outputted from the previous step.
   1. Make sure `il2cpp_header_to_ghidra.py` and `il2cpp.h` are in the same folder.

        ```shell
        python il2cpp_header_to_ghidra.py
        ```

3. Open Ghidra and create a new project.
4. Install the Ghidra Switch Loader Plugin.
   1. File > Install Extension > Click the Plus Icon > Select the Ghidra Switch Loader .zip
5. Import the `main` file.
   1. File > Import File > Select `main` from game dump
6. double click the imported file to open it in code browser
7. Parse C Source `il2cpp_ghidra.h`
   1. File > Parse C Source
   2. Click the pencil eraser icon to clear the current config
   3. Click the plus icon to add the `il2cpp_ghidra.h` file
   4. Click Parse to Program
8. Run script `ghidra_with_struct.py` with `script.json`
   1. Window > Script Manager
   2. Click the three lines icon to modify script directories
   3. Click the green plus icon to add a new directory
   4. Choose the IL2CPPDumper folder that contains all the .py scripts
   5. Close the script directories window
   6. Click the refresh button at the top right
   7. Find the `ghidra_with_struct.py` script from the list and click the green play button to run it
   8. When prompted for the `script.json` file, choose the `script.json` file outputted by IL2CPPDumper
9. Run Auto Analysis
    1. Analysis > Auto Analyse main. This will take a long time.
