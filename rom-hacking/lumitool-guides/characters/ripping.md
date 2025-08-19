# Ripping a character model for editing

This step is optional, only move ahead if you want to rip models with animations included in their FBX files.
I have pre-ripped the models for all of the game characters and they can be found [here](https://drive.google.com/drive/folders/1sg5d6WXiSiD0NfLLCb5zImnWnbwpiLrv?usp=sharing).

If you want models with animations that display in your modelling software though you will need to open AssetStudio.
Select File, Load File and navigate to one of the following path in your BDSP romfs dump:

- **romfs\Data\StreamingAssets\AssetAssistant\Characters\persons\field** for field characters
- **romfs\Data\StreamingAssets\AssetAssistant\Characters\persons\battle** for battle characters

From here you will be presented with the AssetBundles for all of the characters in the game.
They aren't clearly labelled but you can load the entire folder if you wish and select Filter Type, Mesh to see each of their models.

Select your chosen character. Now we want to export an FBX, containing the model and all of the character's animations.
To do this we sort by Type and left click the very top AnimationClip. Then scroll down to the Animator and shift-left click.
This should select all animation clips and your animator. Now click Export, Animator + selected AnimationClips.
Save the output and you have successfully ripped a character.

![ripping](/img/lumitool-guides/characters/ripping.webp)

The FBX file that you find in the Animator folder can now be imported into your 3D Modelling software for you to make edits to use as a base
for your new character. You'll be mostly on your own when it comes to the modelling but I will go over how to import them properly.

## 3ds Max:

![3ds-max-1](/img/lumitool-guides/characters/3ds-max-1.webp)

For both battle and field characters make sure that you do the following:

![3ds-max-2](/img/lumitool-guides/characters/3ds-max-2.webp)

For field player characters in particular you can delete all of these objects too:

![3ds-max-3](/img/lumitool-guides/characters/3ds-max-3.webp)

## Blender:

![blender-1](/img/lumitool-guides/characters/blender-1.webp)

For both battle and field characters make sure that you do the following:

![blender-2](/img/lumitool-guides/characters/blender-2.webp)

For field player characters in particular you can delete all of these objects too:

![blender-3](/img/lumitool-guides/characters/blender-3.webp)

