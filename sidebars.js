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
    'faq',
    {
      type: 'category',
      label: 'Installation Guide',
      link: {
        type: 'generated-index',
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
      },
      collapsed: true,
      items: [
        'special-events/gifts',
        'special-events/static',
        'special-events/legendaries',
      ],
    },
  'evolutions',
  'npc',
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
