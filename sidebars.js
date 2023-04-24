/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
 docs: [
    'intro',
    'faq',
    {
      type: 'category',
      label: 'Installation Guide',
      link: {
        type: 'generated-index',
        slug: 'category/installation',
       description: 'Full installation instructions for Luminescent Platinum on various supported platforms. We recommend you use hardware, or Ryujinx if your machine is strong enough for it.',
      },
      collapsed: true,
      items: [
        'installation/atmosphere',
        'installation/ryujinx',
        'installation/yuzu',
      ],
    },
  'features',
  'incense-regional',
  {
      type: 'category',
      label: 'Special Pokémon',
      link: {
        type: 'generated-index',
        slug: 'category/special-events',
        description: 'See where to get special Pokémon in Luminescent Platinum. When possible, shiny hunting has been made as easy as possible for your convenience!',
      },
      collapsed: true,
      items: [
        'special-events/gifts',
        'special-events/static',
        'special-events/legendaries',
        'special-events/trade',
      ],
    },
  'evolutions',
  'npc',
  'items',
  'mods',
  'changelog',
  ],
  };
  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */


module.exports = sidebars ;
