# Making a Battle NPC

In this guide I will be assuming that you have set up your Unity environment for characters, that you have ripped a character model and modified it in modelling software, that you have exported it as an FBX and that you have read the sections concerning the [Character Shaders](/rom-hacking/lumitool-guides/characters/shaders), the Animator component, Battle Character Entity Monobehaviour, and (optionally) the Color Variation and UV Connection Monobehaviour in [Monobehaviours](/rom-hacking/lumitool-guides/characters/monobehaviours).
I am going to be demonstrating adding the Platinum Style Barry, as seen in Luminescent Platinum.

I would always recommend adding a ripped prefab of a similar sized character to your scene first. Then moving them to the side to be used as size reference.
You can then import your FBX and add it to the scene too. If the size seems off then you can check the scale and also try toggling the Convert Units in the FBX import settings.

![battle-npc-1](/static/img/lumitool-guides/characters/battle-npc-1.gif)

With your model added to the scene and at the correct scale, check that it animates by selecting an animation (either one that you ripped with the Unity project or one that you have created for yourself if you happened to do so when making your model) and then dragging your custom prefab onto the preview window.

![battle-npc-2](/static/img/lumitool-guides/characters/battle-npc-2.gif)

With this you can be sure that your model is rigged and animating properly and you are ready to move on to implementation.

1. Make sure that your custom prefab is named appropriately. If you are overwriting an existing character then name the prefab the same as theirs. If you are wanting to insert a new character without overwriting one, name it something unique. It is recommended to use the prefix "tr" for "trainer".
2. Ensure that all of the materials on your model are using a character shader. I find that it is best to duplicate similar materials from those that were ripped with the Unity project and then to apply custom textures and tweak the material settings from there.
3. Add the Animator, Battle Character Entity and (optionally) the Color Variation and UV connection components to your prefab. Fill out the information for each as described in the [Character Monobehaviours and Components]{.underline} section. To save time, you can copy the components from one of your ripped prefabs and paste them onto your custom one; modifying data as appropriate.
4. Select each of your Mesh objects and in the Skinned Mesh Renderer component, ensure that Receive Shadows is disabled.

    ![lighting](/static/img/lumitool-guides/characters/lighting.webp)
5. Select your custom prefab and set the Layer to Character. Choose "Yes, change children" when prompted as well.

    ![battle-npc-3](/static/img/lumitool-guides/characters/battle-npc-3.webp)
6. From the Hierarchy tab, drag your custom prefab into a folder in the Project tab and select "Original Prefab" when prompted.
7. Select Window, AssetBundle Browser from the top bar. Drag and drop your new Original Prefab from the Project tab into the "persons/battle" folder. Select Build at the top and then press the Build button below.

Your custom Assetbundle is now built. We need to process it with LumiTool to make the game accept it.

1. Open LumiTool and select the Bundle Prepper.
2. Open your custom AssetBundle in the Loaded Rebuilt Bundle section. It will be located in "AssetBundles\StandaloneWindows\persons\battle" of your Unity project.
3. Without changing any of the settings, select Execute Script. It will prompt you to choose which shader is used by which materials. Match them to those that you used in the Unity editor.
4. When prompted to do so, save your bundle to a new location.
5. (Optional) LumiTool does not yet have the ability to compress your AssetBundles. You can do so yourself with a third party application such as [UABEA](https://github.com/nesrak1/UABEA) or my own [AssetBundle Mass Compressor](https://github.com/ProfBlack/AssetBundle-Mass-Compressor). If using the former, make sure you choose LZ4 compression.

You now have a custom AssetBundle that the game will accept. I'll now walk you through the instructions for how to make a mod that uses it.

Switch and Switch emulators use a system called LayeredFS for mod loading. This means that if files are found in your mod folder that match files found in the romfs for the game, then the modded files will be loaded instead.
Therefore our mod needs to match the folder hierarchy of the game.

## Making a mod that replaces an existing NPC:

1. Create a folder tree of the following folders:
> "ModName\romfs\Data\StreamingAssets\AssetAssistant\Characters\persons\battle".
2. Making sure that the file is named the same as the NPC that you are replacing, put the file in the **battle** folder.

## Making a mod that adds a new NPC:

1. Create a folder tree of the following folders:
> "ModName\romfs\Data\StreamingAssets\AssetAssistant\Characters\persons\battle",

> "ModName\romfs\Data\StreamingAssets\AssetAssistant\Dpr".
2. Copy the **masterdatas** file from **Dpr** folder of your vanilla game romfs to the same folder in your new mod and copy **Dpr.bin** from the **AssetAssistant** folder of your vanilla game romfs to the same folder in your new mod.
3. Put your custom AssetBundle in the **battle** folder.
4. With LumiTool, select the AssetAssistant Manifest Editor, open **Dpr.bin**, select Add Record and input data as below but named for your AssetBundle.

    ![battle-npc-4](/static/img/lumitool-guides/characters/battle-npc-4.webp)
5. Using [UABEA](https://github.com/nesrak1/UABEA), open **masterdatas** and open the TrainerTable Monobehaviour with Edit Data. Expand the TrainerType array and add an entry to the end of it but before the LOVELOVE_98 and LOVELOVE_99 entries. Increment the ID from the previous TrainerType in the table and make up a unique name for the LabelTrType and take note of it. Make sure the ModelID matches the file name of your custom AssetBundle. I'm not going to explain about them here but I will link to where you can read more about the rest of the fields in the TrainerType table in [TrainerTable](/rom-hacking/documentation/trainer-table.md).

    ![battle-npc-5](/static/img/lumitool-guides/characters/battle-npc-5.webp)
6. Save **masterdatas** and open **english** in UABEA and expand the array to add an entry to the bottom of **english_dp_trainers_type**. Iterate the Indexes and make sure the labelName matches the LabelTrType that you created. You can define the name of the outfit at the bottom in str. You can also calculate the strWidth with this [calc_strings](https://github.com/SaltContainer/Lumi_Small_Scripts/tree/main/calc_strings) python script.

With all of your files saved, you now have added a trainer model and tied it to a Trainer Type that can be assigned to trainer teams with [Imposter's Ordeal](https://github.com/Nifyr/Imposters-Ordeal).