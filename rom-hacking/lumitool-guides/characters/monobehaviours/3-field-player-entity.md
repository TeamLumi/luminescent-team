# Field Player Entity

This monobehaviour tells an object that it is a field player entity. These are the chibi models that the player uses in the game.
Let's take a look at one of our player character rips. I'm only going to go over the sections that I have found to be relevant in my experience:

[field-player-entity-1](../../static/img/lumitool-guides/characters/field-player-entity-1.png)

- **Entity Name:** You should match this to the name of your prefab but don't strictly have to.
- **Is Ignore Player Collision:** Allows the player to walk through the entity if true.
- **Hand Scale:** Sets the scale of the hand bones defined further down in the Variations section.
- **Clips:** An array of animation clips with a predefined order. Field player characters use a lot of these for actions like fishing, surfing, running through grass among many other things. The full list can be found [[here]{.underline}](https://docs.google.com/spreadsheets/d/1lF9hdc9042NIlKLmnrCVF9eN1ymcCRFCa0G62tAnVLk/edit?usp=sharing).
- **Blink Patterns:** This links to another monobehaviour that defines the pacing for the character's blinking. All player characters use BlinkCurves but there also exists ElderlyCurves and KidsCurves that you can technically use.
- **Variations:** Player Characters always have a size of 2 for their Variations.The first is used for the player's main body and the second is used for when the player is on their bicycle. Here you can define which bones in your character's rig are the Neck (used for having characters turn their neck to look at the player) the Hands (used for setting the hand scale as above) and setting the Face Renderer and materials. The Face Renderer is the SkinnedMeshRenderer that has your character's face and mouth materials on it. Below is example of where this info can be found for Variation 1 and 2 respectively:
> [field-player-entity-2](../../static/img/lumitool-guides/characters/field-player-entity-2.png)
> [field-player-entity-3](../../static/img/lumitool-guides/characters/field-player-entity-3.png)
> The bones for the first variation are found under Origin. The bones for the second variation are found under Bicycle/Origin.
- **Watch Renderer:** A SkinnedMeshRenderer (usually used for poketches) that can be turned on or off with scripts.
- **Hat and Shoes Renderers:** The Everyday outfits for Lucas and Dawn have extra SkinnedMeshRenderers for when they are given running shoes and their hat. Element 0 in each is their hair with hat and their running shoes. These renderers are optional if you don't want to have the player change their clothes in this way. If used, the SkinnedMeshRenderer for hair1 and shoes1 should be on. Meanwhile, the SkinnedMeshRenderer for hair2 and shoes2 should be off:
> [field-player-entity-4](../../static/img/lumitool-guides/characters/field-player-entity-4.png)
- **Mesh Group and Bicycle Object:** The GameObjects for these have their active status toggled when the player gets on or off of their bike. Thereby turning the SkinnedMeshRenderer objects on and off so that the proper models appear in game. The Bicycle object should be set to off as standard:
> [field-player-entity-5](../../static/img/lumitool-guides/characters/field-player-entity-5.png)
- **Rod Renderers:** The three fishing rods SkinnedMeshRenderers that fall under the FishingRod GameObject. All three of these should have their SkinnedMeshRenderer turned off.
> [field-player-entity-6](../../static/img/lumitool-guides/characters/field-player-entity-6.png)
- **Pod Renderer:** The watering can SkinnedMeshRenderer that falls under the WateringCan GameObject. This object should have its SkinnedMeshRenderer turned off.
> [field-player-entity-7](../../static/img/lumitool-guides/characters/field-player-entity-7.png)
- **Beadaru Renderer:** The Bibarel SkinnedMeshRenderer used during surfing and rock climbing that's found under the Beadaru GameObject. This object should have its SkinnedMeshRenderer turned off.
> [field-player-entity-8](../../static/img/lumitool-guides/characters/field-player-entity-8.png)
- **Mukuhawk Renderer:** The Staraptor SkinnedMeshRenderer used when flying that's found under the Mukuhawk GameObject. This object should have its SkinnedMeshRenderer turned off.
> [field-player-entity-9](../../static/img/lumitool-guides/characters/field-player-entity-9.png)
- **Bicycle Colors:** The four colors for the bicycle.
- **Bicycle Renderer:** The bicycle SkinnedMeshRenderer used for biking that's found under the Bicycle GameObject. This object should have its SkinnedMeshRenderer kept on.
> [field-player-entity-10](../../static/img/lumitool-guides/characters/field-player-entity-10.png)