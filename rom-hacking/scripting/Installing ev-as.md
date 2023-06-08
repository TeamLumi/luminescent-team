
# EV-AS Guide

This guide is for the setup of z80Rotom's [ev-as scripting tool](https://github.com/z80rotom/ev-as) and expects a few bare minimum skills. You should know how to download GitHub repositories, whether by downloading the zip or cloning the repo. You should also be comfortable with running commands such as `python` and `cd` from the terminal/command prompt/PowerShell.

For Pokémon Luminescent, as of 8th June 2023, I will be recommending the usage of the [`custom_commands` branch](https://github.com/z80rotom/ev-as/tree/custom_commands). This is required to ensure the functionality of Eterna's gym, as well as other events in the future.

# Setup

In this tutorial, we will be working with the source code and will therefore need to download some large dependencies. This is so we can work with the latest release at all times and most Unity modding tools will require these dependencies anyway.

Firstly, we will need to download the 14GB dependency called [Microsoft Build Tools v14](https://visualstudio.microsoft.com/visual-cpp-build-tools/). We need this for it's LZ4 compression library, which BDSP's Unity Assetbundles are compressed with. I am unaware of a smaller alternative. Feel free to reach out to me if you find one. 

You can get around this dependency by using the built package of ev-as, however the last attached release is quite outdated and you would need this package anyway to build it. So feel free to download Build Tools, clone ev-as, build it to an executable format and uninstall the dependency if you're desperate for space. 

Now, install your [preferred version of Python](https://www.python.org/downloads/), I personally use 3.10, but anything that doesn't make ev-as scream at you is good enough. 

Once you have your dependencies, Python and ev-as ready to go, create a folder in the same folder as `ev.g4` called `Dpr`. This folder name is case sensitive, `dpr` or `DPR` will not function. While you're at it, create a folder called `bin`, which is where your finished product will be built to later. 

Finally, create a folder called `scripts`. We will use this later.

# Additional Setup

For the purpose of macro commands, you will need to install the [BDSP Repacker](https://github.com/Ai0796/BDSP-Repacker) and unpack your `romfs\Data\StreamingAssets\AssetAssistant\Message\english` file. Once unpacked, you will have the various JSONs that ev-as requires. No further setup is necessary at this point. The `AssetFolder` must be copied into ev-as' main folder after unpacking.

## Usages

When editing scripts, you **must** copy your .ev file of choice from the `parsed` folder and paste it in your `scripts` folder. **Changes made to files in `parsed` will not be reflected**.
ev-as has a few different commands that can be run. This tutorial will assume you have opened a terminal in the main ev-as folder.

## ev_as.py

Run via: `python .\src\ev_as.py`

Takes all the .ev files from the `scripts` folder, assembles it and repacks it into the Unity ev_script bundle. It will also check your scripts for improper label usage, as well as pack any macro messages into your dialogue file.

## ev_parse.py

Run via: `python .\src\ev_parse.py`

Takes the provided `Dpr/ev_script` file, extracts and parses all of the individual script files to the generated `parsed` folder.