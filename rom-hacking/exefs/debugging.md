---
sidebar_position: 7
---

# Debugging

## Introduction

Debugging can be extremely useful when making your exefs mods. It will allow you to view the asm code as it's running, view register values at certain points, and add break points to step through your code.

For debugging, you'll need the help of Ghidra (I'm pretty sure you can set up IDA in a similar way), GDB (The GNU Project Debugger) and a GDB Stub (Yuzu or Atmosphere).
This tutorial assumes you're using Ghidra and Windows with WSL.

## How To

1. Set up your GDB Stub. Once you enable the GDB stub your games will hang at startup waiting for a connection.
   1. In Yuzu
      1. Emulation -> Configure -> General -> Debug -> Debugger -> Enable GDB Stub
      2. Take note of the port number here (or change it)
   2. In Atmosphere
      1. Ensure your version of Atmosphere is at least version 1.2.4 (System Settings → System → "Current version: ... | AMS X.Y.Z | ..." under the 'System Update' button)
      2. Modify sd:/atmosphere/config/system_settings.ini (or create it if it doesn't exist) and ensure the following values are set accordingly:

      ```ini
      [atmosphere]
      enable_htc = u8!0x0
      enable_standalone_gdbstub = u8!0x1
      ```

      3. Reboot your Switch
2. Set up GDB
   1. Set up WSL on your PC
   2. Enable SSH into your WSL VM
   3. Install `gdb-multiarch` to your WSL VM
3. Set up Ghidra
   1. Open the BDSP Main file with debugger (Right click -> Open With -> Debugger)
   2. Make sure the base address of main is `0x8004000` (this is where yuzu loads the file to)
      1. Window -> Memory Map -> House Icon At Top Right -> `8004000`
      2. This may be different for atmosphere
   3. Create a new Debugger Target
      1. In the Targets window click the green/yellow socket at the top right
      2. Choose `GNU gdb via SSH` and enter your details (I had to modify the following)
         1. GDB launch command: `usr/bin/gdb-multiarch`
         2. SSH username: `<WSL Username>`
      3. You may need to edit more or less depending on how you set up your SSH
      4. Click Connect and confirm any SSH details (password, keys etc.)
4. Connect and Debug
   1. Run BDSP in Yuzu (It will hang at launch when connecting to GDB)
   2. In the Ghidra Interpreter window enter `target extended-remote <YourWindowsIP>:<YuzuGDBPort>`
   3. In the Ghidra Modules window click the two way red arrow (This links your main program with the program loaded in memory)
   4. Set any breakpoints you need in the code (Right click -> Toggle Breakpoint)
   5. In the Ghidra Objects window, continue execution and step through code at breakpoints
   6. In the Ghidra Registers window, view the value of any registers at the current execution location
