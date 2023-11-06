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
      label: 'Dictionary',
      link: {
        type: 'doc',
        id: 'dictionary/index',
      },
      collapsed: true,
      items: [
        'dictionary/areas',
      ],
    },
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
          type: 'doc',
          label: 'Scripting Introduction',
          id: 'scripting/introduction'
        },
        {
          type: 'doc',
          label: 'PlaceData',
          id: 'scripting/place-data'
        },
        {
          type: 'doc',
          label: 'StopData',
          id: 'scripting/stop-data'
        },
        {
          type: 'category',
          label: 'Commands',
          link: {
            type: 'doc',
            id: 'scripting/commands/index',
          },
          collapsed: true,
          items: [
            'scripting/commands/end',
            'scripting/commands/time-wait',
            'scripting/commands/cmpwk',
            'scripting/commands/jump',
            'scripting/commands/call',
            'scripting/commands/ret',
            'scripting/commands/if-jump',
            'scripting/commands/if-call',
            'scripting/commands/ifval-jump',
            'scripting/commands/ifval-call',
            'scripting/commands/switch',
            'scripting/commands/case-jump',
            'scripting/commands/case-cancel',
            'scripting/commands/flag-set',
            'scripting/commands/arrive-flag-set',
            'scripting/commands/flag-reset',
            'scripting/commands/flag-check',
            'scripting/commands/if-flagon-jump',
            'scripting/commands/if-flagoff-jump',
            'scripting/commands/if-flagon-call',
            'scripting/commands/if-flagoff-call',
            'scripting/commands/flag-check-wk',
            'scripting/commands/flag-set-wk',
            'scripting/commands/trainer-flag-set',
            'scripting/commands/trainer-flag-reset',
            'scripting/commands/trainer-flag-check',
            'scripting/commands/if-tr-flagon-jump',
            'scripting/commands/if-tr-flagoff-jump',
            'scripting/commands/if-tr-flagon-call',
            'scripting/commands/if-tr-flagoff-call',
            'scripting/commands/add-wk',
            'scripting/commands/sub-wk',
            'scripting/commands/ldval',
            'scripting/commands/talkmsg',
            'scripting/commands/obj-anime',
            'scripting/commands/obj-anime-wait',
            'scripting/commands/obj-add',
            'scripting/commands/obj-del',
          ],
        },
        {
          type: 'category',
          label: 'Animation commands',
          link: {
            type: 'doc',
            id: 'scripting/animation-commands/index',
          },
          collapsed: true,
          items: [
            'scripting/animation-commands/ac-up',
            'scripting/animation-commands/ac-down',
            'scripting/animation-commands/ac-left',
            'scripting/animation-commands/ac-right',
            'scripting/animation-commands/ac-loop',
            'scripting/animation-commands/ac-dir-u',
            'scripting/animation-commands/ac-dir-r',
            'scripting/animation-commands/ac-dir-d',
            'scripting/animation-commands/ac-dir-l',
            'scripting/animation-commands/acmd-end',
            'scripting/animation-commands/ac-dir-val',
            'scripting/animation-commands/ac-wait',
            'scripting/animation-commands/ac-mark-gyoe',
            'scripting/animation-commands/ac-world-x',
            'scripting/animation-commands/ac-world-z',
            'scripting/animation-commands/ac-index-anime',
            'scripting/animation-commands/ac-index-anime-wait',
            'scripting/animation-commands/ac-mark-emo',
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
