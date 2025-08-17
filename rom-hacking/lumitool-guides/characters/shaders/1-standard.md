## Character Standard

One of the first things you're likely to notice about characters are that they are mostly uncoloured outside of the game:

[shaders-standard-1](../../static/img/lumitool-guides/characters/shaders-standard-1.png)

This is because the Character Standard shader allows for colouring them in real time, in game using mask textures.
This is not mandatory for your own models but it is very useful for allowing player characters in particular to
have hair, eye and skin tones applied depending on what the player chooses at the start of the game.

The ripped dummy shaders do not currently allow us to see the colours applied in the Unity editor; however I have
recreated the shader to a degree and it will provide you with a mostly accurate implementation of
the textures listed below. You can download this recreated shader [[here]{.underline}](https://drive.google.com/file/d/1a6A07jwsdUNda4J6K328tkHI6LKxnXfI/view?usp=sharing).
This is optional though as the dummy shader will work the same when building your AssetBundles.

For the mask texture, we can see and modify the parameters for each material, below is a field face material.
We can specify RGBA colour values to be applied to the Red, Green and Blue channels of the mask texture:

[shaders-standard-2](../../static/img/lumitool-guides/characters/shaders-standard-2.png)

This example only uses Red and Green but also Black for parts of the texture that are not to be coloured.

For the Complex/Utility textures, these achieve a number of things:

[shaders-standard-3](../../static/img/lumitool-guides/characters/shaders-standard-3.png)

The standard colour applied across the texture should be pure Blue. If you wish for parts of the texture to be affected by the material
emission values then you should mix in Red to make Magenta. If you want parts of the texture to be affected by the reflectivity and specular
values then mix in Green to make Cyan. For ambient occlusion, subtract some Blue to make darker shades of Blue.

3D artists ought to be familiar with how Bump/Normal maps work already.
If not you're going to get a much better answer searching the internet than any explanation that I can offer:

[shaders-standard-4](../../static/img/lumitool-guides/characters/shaders-standard-4.png)

The aforementioned maps and parameters are all composited with the base Colour map:

[shaders-standard-5](../../static/img/lumitool-guides/characters/shaders-standard-5.png)

When composited together, you will get a result like this (example below using my recreated shader):

[shaders-standard-6](../../static/img/lumitool-guides/characters/shaders-standard-6.png)

There are more parameters in the Character Shader but generally speaking you will want to copy and paste appropriate materials from the
characters that you've ripped and repurpose them for your own. Swapping in your own textures.