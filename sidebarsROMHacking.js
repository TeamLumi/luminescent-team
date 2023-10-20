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
    {
      type: 'category',
      label: 'Scripting',
      link: {
        type: 'generated-index',
        slug: 'category/scripting',
        description: 'Everything about ev_scripts.',
      },
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Setting up',
          link: {
            type: 'generated-index',
            slug: 'category/scripting/setup',
            description: 'Setup instructions and guides on editing in-game ev_scripts. This is all done in RomFS.',
          },
          collapsed: true,
          items: [
            'scripting/setup/ev-as',
            'scripting/setup/placedatas',
            'scripting/setup/scripting-guide',
          ],
        },
        {
          type: 'category',
          label: 'Commands',
          collapsed: true,
          items: [
            'scripting/commands/end',
            'scripting/commands/time-wait',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'ExeFS Editing',
      link: {
        type: 'generated-index',
        slug: 'category/exefs',
        description: 'Modifying the underlaying game code, or Executable File System (ExeFS).',
      },
      collapsed: true,
      items: [
        'exefs/guide',
        'exefs/ghidra',
        'exefs/exlaunch',
        'exefs/headers',
        'exefs/hooks',
        'exefs/logging',
        'exefs/debugging',
      ],
    },
    {
      type: 'category',
      label: 'Art',
      link: {
        type: 'generated-index',
        slug: 'category/art',
        description: 'Guides for editing textures models and animations.',
      },
      collapsed: true,
      items: [
        'art/animations',
        'art/mesh_and_texture_replacement',
      ],
    },
    {
      type: 'category',
      label: 'Editing music and sound files.',
      link: {
        type: 'generated-index',
        slug: 'category/audio',
        description: 'Editing music and sound files.',
      },
      collapsed: true,
      items: [
        'audio/labels',
      ],
    },
  ]
};

module.exports = sidebars;
