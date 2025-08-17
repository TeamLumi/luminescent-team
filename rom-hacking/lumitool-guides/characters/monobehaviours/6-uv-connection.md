# UV Connection

This monobehaviour exists to solve a quirk with Unity's UV system that will transform the UVs of every material on a SkinnedMeshRenderer when you transform just one.
It is primarily used by BDSP characters to offset the UVs of their eye materials between different sets of eyes.
We cannot currently preview the results in the Unity editor but an animation with the values in the first image ought to provide the results found in the second:

![uv-connection-1](/img/lumitool-guides/characters/uv-connection-1.webp)

![uv-connection-2](/img/lumitool-guides/characters/uv-connection-2.webp) ![uv-connection-3](/img/lumitool-guides/characters/uv-connection-3.webp)

In the above example, we offset the coordinates of the eye UVs (Material 0 and 1 on the SkinnedMeshRenderer of the breeder) by 0.75 on the Y axis
via animation, using the UV Connection mono.