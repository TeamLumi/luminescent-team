# Color Variation

This script is responsible for defining what skin, eye and hair colors should be applied to what materials, depending on the selection that the player made at the start of the game.
These choices are broken down into a maximum of four Properties:

![color-variation-1](/img/lumitool-guides/characters/color-variation-1.webp)

You can then define a number of SkinnedMeshRenderers to be affected by the script as Elements.
Each Element can then have a number of material indexes chosen to be affected (I recommend using no more than six per Element) and given specific color values with the color picker:

![color-variation-2](/img/lumitool-guides/characters/color-variation-2.webp)

The above example represents the bare minimum for a field player character. Their main outfit body as well as their bicycle outfit body.
I explained how to determine the Material Index for a SkinnedMeshRenderer but I shall explain again:

![color-variation-3](/img/lumitool-guides/characters/color-variation-3.webp)

The only materials that we are concerned with are materials that are part of the character's actual anatomy.

To determine the appropriate Channel, you will need to look at the Mask texture associated with the material.

![color-variation-4](/img/lumitool-guides/characters/color-variation-4.webp)

Red is Channel 0, Green is Channel 1 and Blue is Channel 2. Anything colored in black will retain the color of the main color texture no matter what.
The precompiled unity scripts will also allow you to preview the Color Variations if you define the property you wish to preview and run the code with the play button:

![color-variation-5](/img/lumitool-guides/characters/color-variation-5.webp)