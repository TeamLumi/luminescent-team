# EV-AS Guide

This guide is for the setup of z80Rotom's [ev-as scripting tool](https://github.com/z80rotom/ev-as).

## Setup

1. Install your [preferred version of Python](https://www.python.org/downloads/)
    - I personally use 3.10, but anything that doesn't make ev-as scream at you is good enough.
    - While you're installing Python, make sure to click the option to add it to PATH.
2. Install the latest release for [ev-as](https://github.com/z80rotom/ev-as/releases/latest)
3. Install the [BDSP Repacker](https://github.com/Ai0796/BDSP-Repacker)
4. Find the `english` file that you'd like to use for this project which can be found at `romfs\Data\StreamingAssets\AssetAssistant\Message\english`.
5. Follow the instructions for the BDSP Repacker to unpack your `english` file.
6. Copy the entire `AssetFolder` into the same folder as the `ev.g4` file.


## Usage

Once you've familiarized yourself with the instructions below, continue to the [Scripting Basics guide](scripting-guide.md).

### Ev Parse
Takes the provided `Dpr/ev_script` file, extracts and parses all of the individual script files to the generated `parsed` folder.

1. Find the `ev_script` file for your current install found at `romfs\Data\StreamingAssets\AssetAssistant\Dpr`
2. Place that file in the `Dpr` folder that you made earlier
3. Double-Click the `ev_parse.exe`
4. Press any key to continue
5. Find all of your newly parsed script files in the `parsed` folder


### Ev As
Takes all the .ev files from the `scripts` folder, assembles it and repacks it into the Unity ev_script bundle. It will also check your scripts for improper label usage, as well as pack any macro messages into your dialogue file.

1. Make sure all of the changed script files are in the `scripts` folder and NOT the `parsed` folder
2. Double-Click the `ev_as.exe`
3. Press any key to continue
4. Find the newly built ev_script file in the `bin` folder
5. Replace the ev_script file in `romfs\Data\StreamingAssets\AssetAssistant\Dpr` with the newly built one.