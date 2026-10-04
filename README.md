# Codveda Front-End Internship

Nine projects, three levels. The internship asks for **any two tasks from each level**. All three are here so you can submit the pair you want.

Suggested submission:

- Level 1: landing page and interactive form
- Level 2: React SPA and GitHub search
- Level 3: component library and animation page

The performance report is the other Level 3 option. It optimizes the landing page rather than starting a new product.

## Level 1 — open the HTML file

No install step.

- Landing: `level-1/task-1-landing/index.html`
- Form: `level-1/task-2-form/index.html`
- Counter: `level-1/task-3-counter/index.html`

The landing build (minified CSS/JS and cache headers) is documented in `level-3/task-2-performance/PERFORMANCE.md`.

## Level 2

```bash
cd level-2/task-1-spa
npm install
npm run dev
```

Home, About, and Contact share one React Context draft. Routes are client-side. `vercel.json` and `netlify.toml` are included for deploy; publishing still needs your own Vercel or Netlify account.

```bash
cd level-2/task-2-github-search
```

Open `index.html`. Search calls `https://api.github.com/search/repositories`, waits 300ms after typing, and shows loading and error states.

```bash
cd level-2/task-3-tailwind
npm install
npm run dev
```

Hearth Goods is a Tailwind page with a custom color and type theme, plus shared button, card, badge, and field styles.

## Level 3

```bash
cd level-3/task-1-ui-library
npm install
npm run dev
npm run storybook
npm run build
```

`dev` is the catalog. `storybook` documents Button, Input, Card, and Modal. `build` emits `dist/keel-ui.js` for npm. Publishing to the public registry still needs your npm login.

The same Level 3 task also asks for a Django app with registration, login, and password reset:

```bash
cd level-3/task-1-auth-app
.venv\Scripts\python manage.py migrate
.venv\Scripts\python manage.py runserver
```

Open http://127.0.0.1:8000/ . Register, write a note, and use Forgot your password to reset it.

Animations: open `level-3/task-3-animations/index.html`. It uses GSAP timelines, scroll triggers, and hover motion, and it stays still when the system asks for reduced motion.

## Deploy notes

- SPA: `npm run build` in `level-2/task-1-spa`, then deploy the `dist` folder. The included redirect files keep `/about` and `/contact` on refresh.
- Tailwind page: deploy `level-2/task-3-tailwind/dist`.
- Static tasks can be deployed as plain files.

GitHub: https://github.com/amirhossein-najafi/codveda-frontend

Submitted for the Codveda front-end internship.
