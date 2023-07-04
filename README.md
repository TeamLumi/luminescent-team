# [Luminescent Team Website](https://luminescent.team)

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ git clone
$ fnm use
$ npm install
```

### Plugin Setup

Install the extension/plugin for your favorite IDE (VSCode, JetBrains, NVIM, ...).

VSCode is the best!

1. [EditorConfig](https://editorconfig.org/) - EditorConfig helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
2. [Prettier](https://prettier.io/) - An opinionated code formatter
3. [ESLint](https://eslint.org/) - ESLint statically analyzes your code to quickly find problems. It is built into most text editors and you can run ESLint as part of your continuous integration pipeline.
4. [FNM](https://github.com/Schniz/fnm) - 🚀 Fast and simple Node.js version manager, built in Rust

> Note: Prettier is disabled for Markdown files for now - requires configuring to comply with Docusaurus

### Pokedex Feature Flag

The Pokedex is still a work in progress feature, which we have hidden behind a "feature flag". We basically tell
Docusaurus to not include anything related to the Pokedex (including gamedata). We achieve this via environment variables.

If you want to work on the Pokedex Feature - you need to load the environment variable. The easiest way is to
copy the `.example.env` file as `.env`.

### Local Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

This site is automatically built and deployed to GitHub Pages using an Action.  
Every commit to main will build and deploy a new version of the site.  
There is also an Action to attempt building the site on any pull requests made targeting main.

### Generate Missing Pokemon Form Image CSV

1. `npm run test` generates the junit jest report in `/reports/jest-report.xml`
2. `node scripts/junitReportParser.js` creates a csv with missing pokemon forms + expected filename in `/reports/missing-images.csv`

### Convert Image Folder to webp with CLI tool cwebp (MacOS)

This inline script will convert all images for a given folder into webp format with a quality of 85%.

More info under: https://web.dev/codelab-serve-images-webp/

1. `brew install webp`
2. ``$ `for file in IMAGES/*; do cwebp -q 85 "$file" -o "${file%.*}.webp"; done` `` - replace `IMAGES` with folder location, don't forget the backtick quotes for the inline script
