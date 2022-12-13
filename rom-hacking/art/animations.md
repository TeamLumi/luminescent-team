# BDSP Animation Insertion/Creation Guide

| Written By  | Special Thanks |
| ----------- | -------------- |
| Indigo      | Yisuno         |

## Introduction

There are two different paths that you can take with making custom animations for BDSP. Both of these methods have been used successfully in the past with little to no problems.

- Animating in Blender and importing into unity.
- Animating with UMotion in Unity.

This tutorial will focus primarily on using Blender to animate since there are more resources on using that software and it’s the only one I know how to do.

- [Here’s a great place to start learning how to animate in Blender if you’ve never done it before.](https://youtu.be/_C2ClFO3FAY)

There are only a few things that you will need in order to get started with making custom animations. Thankfully, all of them are free.

- [Blender](https://www.blender.org/)
  - Animations can be done in here.
- [Unity](https://unity3d.com/get-unity/download)
  - BDSP was built in unity, so most editing is done here.
- [UnityFBX](https://github.com/EdyJ/blender-to-unity-fbx-exporter)
  - In order to export properly from Blender.
- [Asset Bundle Browser](https://github.com/Unity-Technologies/AssetBundles-Browser)
  - A package for Unity that will allow you to repack FBXs.
- [UABEA](https://github.com/nesrak1/UABEA)
  - Asset repacker. Use this to replace original animation files.
- [Asset Studio](https://github.com/Perfare/AssetStudio)
  - Unpacks models/animations from BDSP.

## Ripping the Model + Animation

This step includes AssetStudio and a Dump of BDSP.

- The first thing you’ll want to do is get a legitimate, personally owned dump of BDSP. I won’t walk you through how to do that, but google is your friend.
- Open up Asset Studio, select load file, as seen below.

![Asset Studio File Load File](https://lh3.googleusercontent.com/OLrOYEEFM6ZPj9Sqdsv4Zx5rEVX39D1gIKo5jw-xkB7JboBrttrWLlg-znh84FI5ju-5kW6gzKLQhdZfMV3jLLxkuBaxDLgmD6XEeMfexvHN8un3s7dx1s25MYgOt_XFN-fcZIy5jXNB5JWCUTu8uA)

- For my example, I’m going to work on giving the trainer a new throwing animation. So I would select the pc001_19 file from my dump.

![Asset Studio Asset List UI](https://lh5.googleusercontent.com/g3E1-NJKx5qsrlZz1MFSwKUDHzH84TQOYFazQuEHZwldOq4Laqi8okNl9ZVxRg5Of9GpEGWXAdoVOM48uwElyKf0_HreRpickWV3Rry2xJzJhLRiOrcny_aDslOQCaTat9U-Br2kDHEzKcA_DwyRMIU)

- For today’s example I want to edit the throw animation, which is named “advent_06”. So I typically organize the list on the left by type and select everything non animation (including the animator file) and the animation I wish to edit.

![Asset Studio Asset List UI](https://lh5.googleusercontent.com/oS8T93krhQpFm0SoRONRI18Dlswphv-RmSqFkIGjJXFr0ZbJNXNA1rgDZ1AHPkhTRAdr-S9b-XwmuQ5rQ1AMk5UPLPgKVSht7PUubD5uy-tSPh5pSH7FA_3rQqOE8z27jPOcplupQwoHWCFpWrR01rQ)

- Right click the blue area and select “export animator + selected clips”. Choose a destination and you will soon have an FBX bundle of the model and your selected animation.

## Animating in Blender

This step includes Blender + your recently extracted model and animation.

- Once you open Blender, delete the cube, camera, and lights that are currently in your scene.
- Import the FBX you just extracted using assetstudio. You will have to zoom in a bit since BDSP models are super tiny.

![Blender Imported Model](https://lh4.googleusercontent.com/ZhSO-QvLNzSEX2jDdBJd0bZCoGAnTPR9F8Fekz8BIs143NGttcve92QMcL8Tu7Tlijde6EAZX3RuKo0Iz9u2wNSePd9O59EHh0pAo1RzB-8zso19V4poO5dlLoIrp2Buh1Y--jzUSnCvOjVBQs6yQJs)
It should look something like this.

- From here you can manipulate the animation using techniques linked in the video above. Be sure not to delete any bones on the rig or add any new ones since rig imports aren’t possible at the moment.
- You can hide any bones or parts of the mesh that you’d like, but make sure to press alt + h when you’re done to unhide anything you’ve hidden.
- If you haven’t already, install the unityfbx plugin for blender. This can be done by going to edit → preferences → add-ons.
- Choose the unopened zip file from github when installing unityfbx.
- Select everything in the scene relating to the model and animation by pressing “A”, including the keyframes of animation that you created. Then export the file as a unityFBX file
- Make sure to check the “Selected Objects Only” option when exporting.

![Blender Selected Objects Only](https://lh4.googleusercontent.com/z-EHE12V0ldmOsVD5_dJ_-RtTMoXrCQNvGoduWpWqVlL3cT28Y9Trhy5y0-ItWfJT1wfPF_dR6ckRbCkJYaZOtcFczZg3QtFNjdKNzbMpQ9bUwSUS7hzPSYWkKlA_W5HPwDcTKLj0jqLmahSkyy1Yy0)

- Now we’re ready to move to Unity!

## Importing into Unity

This step includes Unity and Asset Bundle Browser  

- Drag the newly exported unityFBX file that you created in Blender into your assets in Unity.
- Install the Asset Bundle Browser by going to package manager, located here

![Unity Window Package Manager](https://lh3.googleusercontent.com/NJKJz5UDTMkJADpX5so0QxPfCi1DpkfJTH21nEHilY986UF9KS5xXuxB4tQx6vJwtyl7z_IZXkdRYCHw5uBT0flEFU3qnqHRRogGpK3TRI8CTV0gfOy5QKar6VZbniLB6QuY66Lsskm8nxm9TxiO9q0)

- Press the plus in the top left corner of the menu. Select add package from disk. Select the package.json file from the zip you downloaded earlier for the AssetBundleBrowser.

![Unity Package Manager Add Package from Disk](https://lh5.googleusercontent.com/osubnwY8z5um1b8k2S9KiugLBKtONiH4t0yPTVWOM2i9MTUlIYyt3UeFzG_w8tlOTGAIcYqJvzwOOeH_egnLo16RUAMji8JtAb0KZ_M9m1hTQxkFlmc36rtcklMKAYB0yBuJXsnaCXqMRBRMYH5nnfo)

- Open up the asset bundle browser you just installed by clicking here

![Unity Window AssetBundle Browser](https://lh6.googleusercontent.com/_X0JOfsaQ0WhR8Y-aSBUJt_e0dwoZUbSiFcXo6fwPGjmm7dUqQR9KuI3A9BmtLf4gQl7k4AR2dozvK_v8ukE26z0L3p4erve_ShdF0FmezE7V7XnX9NMF5H0rEaeOXn7LNc7TNLpb6YLv0Wdpu0LZQo)

- When the menu opens, drag your fbx package into the menu. It should look something like this.

![Unity AssetBundle Browser](https://lh5.googleusercontent.com/6kkVUYB7YITKQ7UnMvrn8lvr2hV059cQvB08QogkQYP8pegJQqxT3ZeU6WV-57ylpZZyryRglafwnDNoDmM5puAFy6ysWqL_AaQAPhOqeItgOWSspuJxTZ7mv91ZpATIuWopM3-k59yoYip4AQTPuLI)

- Go to the build tab and then press build. It should export a file to your project folder that unity currently has open inside of the AssetBundles/Standalone Windows Folder.

## Putting your Animation Back into the Game

This step includes UABEA

- Open UABEA. Open the file you just exported from unity. Press Info.
- Navigate to the animation you edited and select export dump, MAKE SURE YOU SAVE THIS AS A JSON FILE!

 ![UABEA Assets Info Export Dump](https://lh5.googleusercontent.com/wHUWrZs-4EnUrZ0Qe1U99kz1_focolmvLh8BWZ0_bJWzQU_1mndJutIGh_BuvOUz8TlPrmbo9r8LKNkDJZDr6C3aIxO01bmxzb0Rv_4fIfMTLYYkrsjHs9CrGjfg3hzVeIHNcrqvExKff6jMlnohMhk)

- Next, open up the original model/animation file from your dump and also go to the info tab.

![UABEA Assets Info Import Dump](https://lh4.googleusercontent.com/CuOi_qHWt5lJOc0NuUVeaaACwMa3sDHHlRqT47dSVqvmIFD2msHcgky9IaWcHVnGMgFqA7x8LmYnikeW6HXrPumHo1oHk-DGlKAyblaFsN3tPJ2z9yl5go5uv9FvQgjt-ArqflqeXwhYmxosIb6vOGs)

- Select Import Dump and choose the JSON file from your edited animation that you just exported.
- Be sure to save this file in a different location from the file with a different name. Save under both the info tab and the general UABEA tab.
- Rename the file it exports to whatever the original filename was for the model/animation. Then put it in your mods folder.

TA-DA! You’ve got an animation done!

## Helpful Tips

- A common issue with creating animations is the bone hierarchy getting messed up. This can either be edited by changing it in the anim’s text file or deleting a certain object in blender.
- The goal here is to make sure the rig starts with the origin and not “pc_xx”.
- I’ve noticed some issues with using 2022 versions of Unity, sometimes using a 2019 build works better.
