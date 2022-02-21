# vanilla-js-sidebar

A simple sidebar component

[![NPM](https://img.shields.io/npm/v/@eardi/vanilla-js-sidebar.svg)](https://www.npmjs.com/package/@eardi/vanilla-js-sidebar)

## Install

`vanilla-js-sidebar` requires Node.js version 12

```bash
# npm
npm install --save @eardi/vanilla-js-sidebar

# yarn
yarn add @eardi/vanilla-js-sidebar
```

## Usage

### Default usage

```js
import Sidebar from '@eardi/vanilla-js-sidebar';

const buttonSelector = 'someselector'; // Change this to your button el

// Content of sidebar can be HTML string
const sidebarContent = `<div class="sidebar-content">
    <h1>Hello! I am a sidebar</h1>
    <p>The content of the sidebar goes here. You can also set the direction to show from TOP, BOTTOM, LEFT, or RIGHT.</p>
</div>`;

// OR let's say you want to pass a reference to a DOM element
const sidebarContentElement = document.createElement('div');
sidebarContent.innerHTML = sidebarContent;

const sidebar = new Sidebar({
  direction: Sidebar.direction.LEFT,
  panelStyles: {
    maxWidth: 'min(90%, 400px)'
  }
});

sidebar.renderContent(sidebarContent || sidebarContentElement);
buttonSelector.onclick = () => sidebar.show();
```

### Use with React

This is a Codesandbox example which shows the usage in React:

[React Example](https://codesandbox.io/s/sidebarreact-5gkv6r)

### Loading through adding script tag

Add this right before the closing of `<body>`:

`<script src="https://unpkg.com/@eardi/vanilla-js-sidebar@0.4.1/src/sidebar.js" crossorigin></script>`

## Running example app locally

```sh
$ yarn install
$ yarn serve-example
```

## License

MIT © [ardeshireshghi](https://github.com/ardeshireshghi)
