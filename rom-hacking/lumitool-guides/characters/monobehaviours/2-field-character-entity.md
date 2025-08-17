# Field Character Entity

This monobehaviour tells an object that it is a field character entity. These are the chibi people in the game.
Let's take a look at one of our character rips. I'm only going to go over the sections that I have found to be relevant in my experience:

![field-character-entity-1](/img/lumitool-guides/characters/field-character-entity-1.webp)

- **Entity Name:** You should match this to the name of your prefab but don't strictly have to.
- **Is Ignore Player Collision:** Allows the player to walk through the entity if true.
- **Hand Scale:** Sets the scale of the hand bones defined further down in the Variations section.
- **Clips:** An array of animation clips with a predefined order. Field characters typically use very few of these. Usually just wait_f, walk_f and occasionally run_f but the list can be found [here](https://docs.google.com/spreadsheets/d/1lF9hdc9042NIlKLmnrCVF9eN1ymcCRFCa0G62tAnVLk/edit?usp=sharing).
- **Blink Patterns:** This links to another monobehaviour that defines the pacing for the character's blinking. Most characters use BlinkCurves but there also exists ElderlyCurves and KidsCurves.
- **Variations:** Field Characters always have a size of 1 for their Variations. Here you can define which bones in your character's rig are the Neck (used for having characters turn their neck to look at the player) the Hands (used for setting the hand scale as above) and setting the Face Renderer and materials. The Face Renderer is the SkinnedMeshRenderer that has your character's face and mouth materials on it. Below is example of where this info can be found:

    ![field-character-entity-2](/img/lumitool-guides/characters/field-character-entity-2.webp)
- **Watch Renderer:** A SkinnedMeshRenderer (usually used for poketches) that can be turned on or off with scripts.