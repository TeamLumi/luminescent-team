# Battle Character Entity and Battle Player Entity

The battle monobehaviours are incredibly similar; so much so that I'm combining them here.
As you might imagine they tell an object that they are a battle character entity or a battle player entity.
Unlike with field players, battle players can be used as NPC battle characters and players simultaneously:

[battle-entity-1](../../static/img/lumitool-guides/characters/battle-entity-1.png)

- **Entity Name:** You should match this to the name of your prefab but don't strictly have to.
- **Blink Process:** I don't have a full understanding of the impact of each of these variables but together they control the rate at which the eye01_b animation is played.
- **Renderers:** Adjust the size of this and include all SkinnedMeshRenderers that your character has.
- **Locators:** Used for giving battle cameras something to lock onto for the various battle camera sequences. The bottom 4 Locators are used for attaching pokeballs to the character during the ball throw sequence. A list of battle locators can be found [[here]{.underline}](https://docs.google.com/spreadsheets/d/1lF9hdc9042NIlKLmnrCVF9eN1ymcCRFCa0G62tAnVLk/edit?usp=sharing).
- **Base Layer Clips:** An array of animation clips with a predefined order. The list can be found [[here]{.underline}](https://docs.google.com/spreadsheets/d/1lF9hdc9042NIlKLmnrCVF9eN1ymcCRFCa0G62tAnVLk/edit?usp=sharing).
- **Eye Layer Clips:** Defines the animation to use for blinking.
- **Eye Layer Avatar Mask:** This is an Avatar Mask asset that contains a manifest of all of the bones in your prefab. The bones that have their toggle set to true will be the only ones that are allowed to animate when the blinking animation plays. These should be your Eye bones such as the ones shown below:
> [battle-entity-2](../../static/img/lumitool-guides/characters/battle-entity-2.png)
- **Eye Layer Blending:** Set to Additive to make it add to the existing animation rather than overriding it.
- **Motion Blend Time:** Parameter for controlling how animations blend together.

The Battle Player Entity mono adds very little to this. Just places for watch, hat and shoe renderers that are used in the same way that the Field Player Entity ones are.
Please refer to that section for an explanation for how to use these, but know that they are optional:

[battle-entity-3](../../static/img/lumitool-guides/characters/battle-entity-3.png)