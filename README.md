# ALAB 320H.9.1 — Todo List (React + Tailwind)

This is a simple **Todo List** app made with **React**, **Vite**, and **Tailwind CSS**.

The vibe is a kid-friendly “little helper” checklist (meals + snacks), but you can add any kind of task you want.

## What it can do (rubric checklist)

* **Heading:** “Todo List”
* **Add a todo**

  * Uses a controlled input
  * New todos show up at the **top** (newest first)
* **Complete a todo**

  * Checkbox toggles completed / not completed
  * Completed todos look **muted** and have a **line-through**
* **Delete a todo**

  * Delete removes the todo
  * The **Delete button only works if the todo is completed** (otherwise it’s disabled)
* **Edit a todo**

  * Edit turns the title into a controlled input
  * While editing:

    * **Edit/Delete buttons disappear**
    * **Save button shows up**
  * Keyboard shortcuts:

    * **Enter = Save**
    * **Escape = Cancel**
* **State rules**

  * Todos are handled with `useReducer`
  * UI stuff uses `useState` (new todo input + edit text for each item)

---

## Getting started

### You need these first

* Node.js installed
* npm installed (npm comes with Node)

### Install + run the app

In the project folder, run:

```bash
npm install
npm run dev
```

Then open the link Vite prints in the terminal (usually `http://localhost:5173/`).

### Build + lint (optional but good)

```bash
npm run build
npm run lint
```

---

## How to demo it (quick)

1. **Add**

   * Type a todo → click **Add**
   * It should appear at the top
2. **Toggle**

   * Click the checkbox
   * The style should change (muted + line-through)
3. **Delete rule**

   * Try deleting an unfinished todo → Delete should be disabled
   * Mark it complete → Delete becomes clickable → delete it
4. **Edit**

   * Click **Edit** → input shows up + **Save** button appears
   * Type a change
   * Press **Enter** to save (or click Save)
   * Press **Escape** to cancel

---

## Helpful commands

* `npm run dev` — starts the dev server
* `npm run build` — makes a production build
* `npm run preview` — previews the build locally
* `npm run lint` — runs ESLint

---

## Notes / common issues

* If your editor complains about `@tailwind` being “unknown”, that’s usually just the editor being picky. The app can still run fine.
* If installs ever get weird, do a clean reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```
