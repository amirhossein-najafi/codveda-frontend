# Keel UI

Reusable React components for buttons, text fields, cards, and modal dialogs. Dialogs use the native `dialog` element, so focus stays inside until the dialog closes. Fields expose labels, hints, and errors through `aria-describedby` and `aria-invalid`.

## Scripts

```bash
npm install
npm run dev
npm run storybook
npm run build
```

`npm run dev` opens a small catalog page. `npm run storybook` opens the component docs on port 6006. `npm run build` writes an ES module to `dist/keel-ui.js` and leaves React as a peer dependency.

## Publish

This package is ready to publish. It is not published from this internship folder.

```bash
npm login
npm publish --access public
```

Consumers import the components and the theme:

```js
import { Button, Card, Input, Modal } from "keel-ui";
import "keel-ui/theme.css";
```
