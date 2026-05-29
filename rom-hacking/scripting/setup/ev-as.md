# EV-AS Guide

This guide is for the setup of z80Rotom's [ev-as scripting tool](https://github.com/z80rotom/ev-as) and expects a few bare minimum skills. You should know how to download GitHub repositories, whether by downloading the zip or cloning the repo. You should also be comfortable with running commands such as `python` and `cd` from the terminal/command prompt/PowerShell.

## Setup

In this tutorial, we will be working with the source code and will therefore need to download some large dependencies. This is so we can work with the latest release at all times and most Unity modding tools will require these dependencies anyway.

1. Download the 14GB dependency called [Microsoft Build Tools v14](https://visualstudio.microsoft.com/visual-cpp-build-tools/).
    - This is for it's LZ4 compression library, which BDSP's Unity Assetbundles are compressed with. I am unaware of a smaller alternative. Feel free to reach out to me if you find one. 
2. Install your [preferred version of Python](https://www.python.org/downloads/)
    - I personally use 3.10, but anything that doesn't make ev-as scream at you is good enough
    - While you're installing Python, make sure to click the option to add it to PATH.
3. Create a folder in the same folder as the `ev.g4` file and call it `Dpr`.
    - The folder names are case sensitive, `dpr` or `DPR` will not function.
4. Create another folder called `bin`, which is where your finished product will be built to later. 
5. Create one last folder called `scripts`. We will use this later.

### Additional Setup

For the purpose of macro commands, you will need to install the [BDSP Repacker](https://github.com/Ai0796/BDSP-Repacker) and unpack your `english` file which can be found at `romfs\Data\StreamingAssets\AssetAssistant\Message\english`. Once unpacked, you will have the various JSONs that ev-as requires. No further setup is necessary at this point. The `AssetFolder` must be copied into ev-as' main folder after unpacking.

## Usage

To run these commands, open a command prompt in the main ev-as folder.  Once you've familiarized yourself with the commands below, continue to the [Scripting Basics guide](scripting-guide.md).

### Ev Parse
Takes the provided `Dpr/ev_script` file, extracts and parses all of the individual script files to the generated `parsed` folder.

1. Find the `ev_script` file for your current install found at `romfs\Data\StreamingAssets\AssetAssistant\Dpr`
2. Place that file in the `Dpr` folder that you made earlier
3. Run the command `python .\src\ev_parse.py`
4. Find all of your newly parsed script files in the `parsed` folder


### Ev As
Takes all the .ev files from the `scripts` folder, assembles it and repacks it into the Unity ev_script bundle. It will also check your scripts for improper label usage, as well as pack any macro messages into your dialogue file.

1. Make sure all of the changed script files are in the `scripts` folder and NOT the `parsed` folder
2. Run the command `python .\src\ev_as.py`
3. Find the newly built ev_script file in the `bin` folder
4. Replace the ev_script file in `romfs\Data\StreamingAssets\AssetAssistant\Dpr` with the newly built one.