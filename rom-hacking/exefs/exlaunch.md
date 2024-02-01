# Setting Up ExLaunch

## Introduction

ExLaunch is a modding template that allows us to inject new C/C++ code into the ExeFS with minimal knowledge of ARM OpCodes.
So far, building has only been tested with Linux and WSL. If you get it working on native windows feel free to update this.
This guide assumes you're using Windows Subsystem for Linux. The setup is pretty straightforward, if you can use a Linux operating system you can probably work out how to get it going on your own.

## Requirements

- Windows Subsystem for Linux (WSL/WSL2)
- A Linux build in WSL
- I recommend [Windows Terminal](https://aka.ms/terminal) too (This is installed by default in Windows 11)
- [devkitPro](https://devkitpro.org/)
- Python
- The [Keystone-Engine](https://www.keystone-engine.org/) Python Module
- CMake
- Either the [ExLaunch Template](https://github.com/Martmists-GH/BDSP_rombase) repo or the [Luminescent fork](https://github.com/TeamLumi/Luminescent_ExLaunch) of it

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
   1. You can either install it from the [Microsoft Store Page](https://www.microsoft.com/p/ubuntu/9pdxgncfsczv) or install it with a Powershell command.

        ```powershell
        wsl --install -d Ubuntu
        ```

   2. Once Installed, Open/Run it from the start menu, the store page, or from within Terminal and set up your account.

3. Install devkitPro tools and libraries in Ubuntu.
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

4. Install Python, either on Ubuntu or Windows. Ubuntu should have `python3` installed by default but not `pip`. `python-is-python3` is also handy to have.

    For Ubuntu:
    ```bash
    sudo apt update
    sudo apt install python-is-python3 pip
    ```

    For Windows, you can get the installer from [python.org](https://www.python.org/downloads/).

5. Install The Keystone-Engine Python Module.

    ```bash
    pip install keystone-engine
    ```

6. Install the latest version of `CMake` on Ubuntu. The latest version is available from the [kitware APT repo](https://apt.kitware.com/).

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

7. Clone the ExLaunch repo either to Ubuntu or Windows. Ubuntu should come with git for it already. For Windows you can download it from the [Git website](https://git-scm.com/downloads) if you don't have it already.

    ```bash
    // If you want to start from the ROM Base
    git clone https://github.com/Martmists-GH/BDSP_rombase.git

    // If you want to start from Luminescent
    git clone https://github.com/TeamLumi/Luminescent_ExLaunch.git
    ```
