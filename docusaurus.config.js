// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require('dotenv').config();

const BASE_URL = '/luminescent-team-dev/';
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// Pokedex is disabled by default
const isDexEnabled = process.env.DEX_ENABLED === 'true';
const pageExclusions = !isDexEnabled ? ['**/dex.js'] : [];

const isPokedexEnabled = process.env.POKEDEX_ENABLED === 'true';
const isMoveDexEnabled = process.env.MOVEDEX_ENABLED === 'true';

const POKEDEX_BASE_PATH = 'pokedex';
const MOVEDEX_BASE_PATH = 'moves';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Luminescent Platinum',
  tagline: 'A BDSP ROM Hack',
  url: 'https://luminescent.team',
  baseUrl: BASE_URL,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'TeamLumi', // Usually your GitHub org/user name.
  projectName: 'luminescent-team', // Usually your repo name.
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          /** editUrl:
            'https://github.com/TeamLumi/luminescent-team/blob/main/', */
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        pages: {
          exclude: [...pageExclusions],
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'rom-hacking',
        path: 'rom-hacking',
        routeBasePath: 'rom-hacking',
        sidebarPath: require.resolve('./sidebarsROMHacking.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs2',
        path: 'docs2',
        routeBasePath: 'docs2',
        // Add sidebar path if needed.
        // sidebarPath: require.resolve('./docs2Sidebars.js'),
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/docs/category/installation',
            from: '/install',
          },
        ]
      },
    ],
    // enable plugin
    ...(isPokedexEnabled
      ? [
          [
            './plugins/pokedex-data-plugin',
            {
              path: POKEDEX_BASE_PATH,
              routeBasePath: BASE_URL,
              pokemonComponent: '@site/src/pages/_dex.jsx',
              pokemonRedirectComponent: '@site/src/components/common/RedirectComponent.jsx',
              listComponent: '@site/src/pages/_dexlist.jsx',
              wrapperComponent: '@site/src/components/Pokedex2/PokedexPageWrapper.jsx',
              mapComponent: '@site/src/pages/_mapper.jsx',
            },
          ],
        ]
      : []),
    ...(isMoveDexEnabled
      ? [
          [
            './plugins/move-data-plugin',
            {
              path: MOVEDEX_BASE_PATH,
              routeBasePath: BASE_URL,
              moveComponent: '@site/src/pages/_move_page.jsx',
              moveListComponent: '@site/src/pages/_move_list_page.jsx',
              wrapperComponent: '@site/src/components/MoveDex/MoveDexPageWrapper.jsx'
            }
          ]
        ]
      : []
    )
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      navbar: {
        title: 'Team Luminescent',
        logo: {
          alt: 'Pokemon Luminescent Platinum Logo',
          src: 'img/lumiLogo-small.webp',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Luminescent Documents',
          },
          { to: '/rom-hacking', label: 'ROM Hacking', position: 'left' },
          { to: '/blog', label: 'Blog', position: 'left' },
          ...(isDexEnabled ? [{ to: '/dex', label: 'Pokédex', position: 'left' }] : []),
          ...(isPokedexEnabled ? [{ to: POKEDEX_BASE_PATH, label: 'Pokédex', position: 'left' }] : []),
          { to: '/mapper', label: "Mapper (Beta)", position: "left" },
          {
            label: 'Discord',
            href: 'https://discord.gg/luminescent',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Mod Docs',
                to: '/docs/',
              },
              {
                label: 'ROM Hacking',
                to: '/rom-hacking/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/luminescent',
              },
              {
                label: 'Nexus Mods',
                href: 'https://www.nexusmods.com/pokemonbdsp/mods/1',
              },
              {
                label: 'Twitter',
                href: 'https://mobile.twitter.com/LuminescentTeam/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/orgs/TeamLumi/repositories',
              },
              {
                label: 'Source Code',
                href: 'https://github.com/TeamLumi/luminescent-team'
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Team Luminescent. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
