# Setting up our Unity environment for Characters

:::info
Some of the information and methods in this documentation may be incomplete or yet to be finalised.

If you require a portable version of the character modding guide. One can be exported from the original documentation [here](https://docs.google.com/document/d/17-ilwKgopvpniS9LXQpFMdDoMpMEBZLABntXTqmG-zE/edit?usp=sharing)
:::

To begin we need to grab certain files from our dump of BDSP 1.3.0, in particular these files in the **romfs\Data** path:

- **boot.config**
- **globalgamemanagers**
- **globalgamemanagers.assets**
- **level0**
- **rawsettings**
- **resources.assets**
- **resources.assets.resS**
- **sharedassets0.assets**

- The **Resources** folder with **unity default resources** and **unity_builtin_extra** in it.
- The **StreamingAssets** folder with the files that you wish to rip in it, with their proper file paths.

Below are screenshots demonstrating a folder set up in which we are ripping the files for Default Lucas Battle **pc0001_00** and
Field **fc0001_00**, Default Dawn Battle **pc0002_00** and Field **fc0002_00**, Barry Battle **tr0002_00** and Field **fc0003_00**.

These bundles have some dependencies however that we also need to rip.
Most of these are dependencies of the player field files. These are **fc0001_11**, **fc0002_11**, **pc_parts** and **shaders**.

![files-1](/img/lumitool-guides/characters/files-1.webp)

![files-2](/img/lumitool-guides/characters/files-2.webp)

![files-3](/img/lumitool-guides/characters/files-3.webp)

![files-4](/img/lumitool-guides/characters/files-4.webp)

![files-5](/img/lumitool-guides/characters/files-5.webp)

We need to use AssetRipper to rip these files back to the Unity editor.
Before Loading the folder, open AssetRipper's settings and ensure that the following settings are set:

- Sprite Export Format: **Unity**
- Shader Export Format: **Dummy Shader**

With these set you can load your folder and export all assets to a folder of your choosing. If you see any errors in the console, informing
you that asset dependencies are missing, you can refer to our [CAB Sources](https://docs.google.com/spreadsheets/d/1BDHkJQX-N5ULClRdw3n0lsgjIJdMX22YmXVY28SSiFc/edit?gid=1878934111#gid=1878934111) documentation to find out what they are.

Next, navigate to the **Assets** folder in your exported project and must delete and replace the **Scripts** folder with the Pre-Compiled Scripts folder that you downloaded earlier.

![scripts](/img/lumitool-guides/characters/scripts.webp)

Now you can open the **Scenes** folder and load the **level0.unity** file. Once it has loaded, before doing anything you\'ll need to install the following Packages with the Package Manager:

- Asset Bundle Browser
- TextMeshPro
- Timeline
- Unity UI (Installed automatically with TextMeshPro)

You might also encounter some \"unsafe code\" errors, like below.

![unsafe-code](/img/lumitool-guides/characters/unsafe-code.webp)

If that\'s the case, you can turn on unsafe code from:  
File \> Build Settings \> Player Settings\... \> Other Settings \> Configuration \> Allow \'unsafe\' Code

You can also find it at:

Edit \> Project Settings \> Player \> Other Settings \> Configuration \> Allow \'unsafe\' Code

With that our Unity environment is fully set up and we have rips of some players and NPCs to use as a framework for our custom characters.
We'll come back here in a bit with our custom models.