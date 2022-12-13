
# Mesh & Texture Replacement Tutorial

Tools Used:

- [Assetstudio](https://github.com/Perfare/AssetStudio)
- [UABEA](https://github.com/nesrak1/UABEA/releases)
- [Melonscript](https://pastebin.com/raw/iCpxzSEF)
- [Assetbundle Browser](https://github.com/Unity-Technologies/AssetBundles-Browser)

## Trainer Model Creation

By smore

1. Rip model from the game as an FBX using Assetstudio  
   1. The models for trainers can be found in `Data>StreamingAssetsAssetAssistant>Characters>persons` within your dumped game files. Find the file for the character you want via trial and error, opening them in Assetstudio to view their assets. To export, select the Mesh, Animator, and eye01_b AnimationClip, and under Export at the toolbar, select Animator+Selected Animation Clips. You can also export the textures here, though the basecolors can’t be exported. I suggest going to Options>Export Options and selecting Tga, that way the alpha channel is retained and can be easily edited in photoshop. Pink exported Normalmaps can be restored to their normal blue form by rearranging the channels as such:
   2. The uti/ filename_U textures (they’re usually deep blue) contain the PBR maps. If you decide to edit them, plug in each of your maps into one document’s channels as follows:

2. Make the desired mesh edits in 3d modeling software of your choice.
   1. In my experience, it’s easiest to get working if you combine everything onto one UV/Texture sheet, including the parts of the body that are being transferred over from the original mesh.
3. Transfer the rigging.
   1. If you created new meshes, as opposed to just editing the base mesh, you will need to transfer the skinning from the original mesh to your new version. I did this in 3DSmax, so for me, that went like this, but it will vary depending on your program:
   2. Open the original base fbx with skin and bones. Import your new mesh to that document. Rotate your new mesh 90 degrees so it’s lying on its back(I don’t know why but I had to do this for it to work), and Reset its Xform. Copy the Skin modifier from the original mesh. You can hide that mesh now, or even delete it. Paste that Skin modifier onto the new mesh. Here, you can start editing the weight-painting for the skin, if you want, but I recommend skipping that until everything’s working in-game and coming back to it later. The skin should copy over with the majority of the rigging intact.

## Model Importing

By Leaf

1. Rip model from the game as an FBX using Assetstudio
2. Make the desired mesh edits in 3d modeling software of your choice.
3. Export as FBX from 3d modeling software.
   1. If using Blender, a special FBX exporter is required- look into both BetterFBX and UnityFBX and see which works for you. 3ds Max users will not have this issue.
4. Import both your edited model and the original model into Unity
5. Create two folders inside your unity project’s “assets” folder- “Editor” and “Export”
6. Place the Melonscript into the Editor folder.
7. Drag both the original model and the edited model into the scene view to place them in the scene
8. Go to Tools>melonscript>Generate Skinned Mesh Component to open the Melonscript UI.
9. Drag the original model’s mesh component into the Base Mesh tab
   1. The mesh component should be called something like “pm0001_00_00_skin”
10. Click the + icon under the Base Mesh tab, then drag the edited mesh’s mesh component into the Element 0 tab
11. Click generate, and a brand new mesh should be created in your Export folder.
    1. Sometimes, as a result of different unit measurements between different programs, the new mesh can be too small. To check for this and other potential complications without having to load it in game, replace the mesh component of the skinnedmeshrenderer of the original model in your scene view with the one you just created, to check if there are any deformities. If there are deformities as a result of size, try setting the original model’s scale factor (Not the scale in the scene!) to 100.
12. In the assets view on the bottom of the screen, find the edited model and expand its components using the small arrow. Then, click on the mesh component and use Edit>Duplicate to create a copy of the mesh. Rename this to something you will be able to spot later, like “Pokemon Textures.”
    1. This is necessary because the Melonscript does not preserve submesh data, so we are going to use the submesh data from this later. You can ignore this step and related subsequent steps if your mesh only needs one submesh.
13. Under Window, open AssetBundle Browser.
14. Drag the “Pokemon Textures” Mesh and the newly created mesh in the Export folder into the window.
15. Switch to the Build tab and click the large Build button
16. Locate the Assetbundle you just created for the new mesh and open it in UABEA, selecting that you want to compress to memory.
    1. The Assetbundles should be in My project>AssetBundles>StandaloneWindows. Ignore the files labeled .manifest
17. Go to info. Select the Mesh component of your Assetbundle. Select Export Dump on the side to dump the mesh as a text file.
18. Repeat steps 16 and 17 for the “Pokemon Textures” Assetbundle.
19. Open both text files in a text editor. Copy over the submesh data from the “Pokemon Textures'' file into the New Mesh’s file, replacing the array that is already there.
    1. It will start the line that says “1 Array Array (x items)” and end where the indentation ends.
20. Use UABEA to open the original BDSP game file that contains the mesh component you want to replace.
21. Under info, locate the mesh component and select “import dump.” Then select the new mesh’s text file to overwrite the original.
22. Save the file.
    1. Note that UABEA cannot overwrite the original file, as it will cause it to crash (and you don’t want to do this anyways.) Save it instead to your desktop or some other folder where it will be safe

Congratulations, you should hopefully have a working game file with your new mesh. Put it in your romfs folder and load up the game to check it out.

## Texture Editing

Hi all, Indigo hijacking the document here from Leaf hehehe, anyways i’m going to show you how to add textures to your shiny new model!

1. So you’ve gotten your model in the game? Great job, the hard part is over, kinda. A common issue with models run through Melonscript is that material groups get all wonky. This means that the textures that should be in one area are now in another, but don’t fret this can be fixed!
2. Typically I like to compile my model’s field and common files and open all of it in asset studio. I then open it up in Blender. If you check the material groups in blender, this should give you a good idea of how things have been moved around.
3. The next step is to open the XX_00_00 field file in UABEA. From here, I recommend extracting each material file as a .json file and opening it in notepad++.
4. In the Col0tex section of each .json file, I verify the pathID of each texture and make sure it matches the right texture that is in the XX_00_00 file from the common folder. You can easily verify the pathID in Asset Studio.
5. After you mix and match each texture to the right respective areas, also verify that the X&Y scales of each col0tex section is each set to 1.
6. So in the off-chance that the eye materials were moved, after the textures are fixed, the wrong area of the body might play a blinking animation. This is because the animation is also mix-matched due to the materials being mixed up. Let’s start by opening “PokemonCustomNodeAnim”.
   1. This is a monobehaviour file in the XX_00_00 file in the field folder. Be sure to export this as a .JSON before opening it in notepad++
7. CTRL+F to find the path-ids of the eye groups in notepad++ (IDs are found using asset studio) and change them to the swapped material group in order to make the new eye group blink instead of the randomly assigned area.
8. Okay, so now it should look okay, but now there are weird shadows everywhere! No biggy, this has to do with .AMB files and your normals. These are image files that provide your textures with a sense of depth and allow shadows to work properly.
9. Download the image below, and using UABEA, open the XX_00 file in your common folder and replace all images with the .amb extension with this by using the plugins option on the side menu and then using the edit texture button.
10. Next find your normal col files, these should be reddish pink images. Using a photo editing software like clip studio paint or photoshop, stretch it out to be twice it’s length. Then replace the image file.
    1. This is only good if the same pokemon or similar pokemon base is being used. In any other case typically a normal map can be found, the same steps would be followed, but with the new image.
11. Now follow step #9 and insert the new texture, be sure to set the wrap options to repeat and repeat.
12. Save the files and now put them all in your mods folder. Boot up your game and you should be good to go.

## Texture Editing FOR TRAINERS

1. The first step is to open asset studio and open your edited trainer file. What's most important is that you find the textures. When you find these textures you should look for the path ids. A path ID is essentially the way the game knows where these textures are and where they can pull them from.
2. Once you find the path IDs, open the edited trainer file in UABEA, and find the material files. Export them all in one location and open them in notepad++ as .json files.
3. For trainers, the most important line to look for is "_MainTex", if you can't find this, control + f the keywords. What you're going to look for underneath this is "m_PathID". This is the area that determines what texture is being pulled for this material. Cross compare it with the textures in asset studio to make sure it's pointing to the right images. Also verify that "m_scale" is set to 1 for both x and y underneath.
4. Save these edited material .jsons and reimport them back into UABEA. Save the edited file and test it in ryujinx.

Reach out to Indigo #7051 on discord with any questions
