# Monodo

The project is organizad in a monorepo structure. It is composed of 2 repos:

* `@monodo/backend`: A small backend with Express.
* `@monodo/frontend`: A web app served with Vite.

## Main technologies used

* [pnpm](https://pnpm.io/): Dependencies package manager and monorepo orchestrator
* [Vite](https://main.vitejs.dev): Modern frontend tooling with excellent performance
* [Express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js

## Scripts

```bash
# Install packages
pnpm i

# Build projects
pnpm build

# Dev projects
pnpm dev

# Work on one project
cd ./my-project && pnpm $script

# All projects include the following scripts:
pnpm dev # Dinamically serves the projects content with hot reloading
pnpm build # Build the project
pnpm start # Statically serves the build output
pnpm test # Run the tests

# Additionally, some include specific scripts for their cases (see package.json)
```

Remember that all projects can be run in parallel with static and dynamic serving.
