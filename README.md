# [Luminescent Team Website](https://luminescent.team)

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npm install
```

### Plugin Setup

Install the extension/plugin for your favorite IDE (VSCode, JetBrains, NVIM, ...).

1. [EditorConfig](https://editorconfig.org/) - EditorConfig helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
2. [Prettier](https://prettier.io/) - An opinionated code formatter
3. [ESLint](https://eslint.org/) - ESLint statically analyzes your code to quickly find problems. It is built into most text editors and you can run ESLint as part of your continuous integration pipeline.

> Note: Prettier is disabled for Markdown files for now - requires configuring to comply with Docusaurus

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
