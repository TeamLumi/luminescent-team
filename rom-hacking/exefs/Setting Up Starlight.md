# Setting Up Starlight

## WIP - These docs are a Work In Progress and are currently mostly for my own use

## Introduction

Starlight is a modding template that allows us to take advantage of IPS Patches to inject new c/c++ code into the exefs with minimal knowledge of ARM OpCodes.
So far this has only been tested with Linux and WSL, if you get it working on native windows feel free to update this.
This guide assumes you're using Windows Subsystem for Linux. The set up is pretty straightforward, if you can use a linux operating system you can probably work out how to get it going on your own.

## Requirements

- Windows Subsystem for Linux (WSL/WSL2)
- A Linux build in WSL
- I recommend [Windows Terminal](https://aka.ms/terminal) too (This is installed by default in Windows 11)
- [devkitPro](https://devkitpro.org/)
- Python
- The [Keystone-Engine](https://www.keystone-engine.org/) Python Module
- CMake
- [The Starlight Template](https://github.com/Martmists-GH/BDSP.git)

## Setting Up the Enviroment

1. Install/Enable WSL. It is enabled by default on newer builds of windows but if not simply run this command in Powershell as an administrator.

    ```powershell
    wsl --install
    ```

    I also recommend using WSL2 as it has some extra features. New installs should use this by default but if you're still on WSL1 use this command to upgrade.  

    ```powershell
    wsl --set-default-version 2
    ```

    See [This Microsoft Article](https://docs.microsoft.com/en-us/windows/wsl/install) for more info

2. Install a Linux build. I prefer Ubuntu as it has a lot of community support.  
   1. You can either install it from the [Microsoft Store Page](https://www.microsoft.com/p/ubuntu/9pdxgncfsczv) or install it with a Powershell command  

        ```powershell
        wsl --install -d Ubuntu
        ```

   2. Once Installed, Open/Run it from the start menu, the store page, or from within Terminal and set up your account.

3. Install devkitPro tools and libraries in Ubuntu
   1. Follow the instructions on this page to install [devkitPro Pacman](https://devkitpro.org/wiki/devkitPro_pacman)  

        ```bash
        wget https://apt.devkitpro.org/install-devkitpro-pacman
        chmod +x ./install-devkitpro-pacman
        sudo ./install-devkitpro-pacman
        ```

   2. Install the `switch-dev` and `switch-portlibs` package groups using devkitPro Pacman. (While all the packages in these groups are not necessary, they are handy to have anyway)

        ```bash
        sudo dkp-pacman -Sy
        sudo dkp-pacman -S switch-dev
        sudo dkp-pacman -S switch-portlibs
        ```

    Once you have installed devkitPro you will need to log out and back in to Ubuntu to get it working. or run this command to make it work immediately.

    ```bash
    source /etc/profile.d/devkit-env.sh
    ```

4. Install Python. Ubuntu should have `python3` installed by default but not `pip`. `python-is-python3` is also handy to have.

    ```bash
    sudo apt update
    sudo apt install python-is-python3 pip
    ```

5. Install The Keystone-Engine Python Module

    ```bash
    pip install keystone-engine
    ```

6. Install the latest version of `CMake`
    The latest version is available from the [kitware APT repo](https://apt.kitware.com/).

    ```bash
    sudo apt update
    sudo apt install -y software-properties-common lsb-release gpg wget apt-transport-https
    wget -O - https://apt.kitware.com/keys/kitware-archive-latest.asc 2>/dev/null | gpg --dearmor - | sudo tee /usr/share/keyrings/kitware-archive-keyring.gpg >/dev/null
    echo 'deb [signed-by=/usr/share/keyrings/kitware-archive-keyring.gpg] https://apt.kitware.com/ubuntu/ $(lsb_release -cs) main' | sudo tee /etc/apt/sources.list.d/kitware.list >/dev/null
    sudo apt update
    sudo rm /usr/share/keyrings/kitware-archive-keyring.gpg
    sudo apt-get install kitware-archive-keyring
    sudo apt install cmake
    ```

7. Download the Starlight Template to your Ubuntu filesystem. Git is the easiest way.

    ```bash
    git clone https://github.com/Martmists-GH/BDSP.git
    ```

## Connecting with Visual Studio Code

I prefer to use VSCode for pretty much everything as its very extensible with its plugins.

1. To get started install [VSCode here](https://code.visualstudio.com/download). We will then need to install a few plugins.

2. Next install the [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) extension. 

3. With this extension installed you can run `code .` within your WSL Ubuntu console to open vscode to that location or click the double arrows in the bottom left of VSCode. The terminal in VSCode gives access to the WSL Terminal.  

Some extensions are installed locally and others in the WSL Context. You will need to install the [C/C++ Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools-extension-pack) in the Remote WSL context.
