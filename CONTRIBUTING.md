# Arclix Contribution Guide

Hi! We're really excited and happy to see that you're in contributing to Arclix. Before submitting your contribution, please read through the following guide.

## Prerequisites

1. Make sure you have [Node.js](https://nodejs.org/) which includes `npm` greater than v12.

## Repo Setup

To develop and test the core `Arclix` package:

1. Run `npm i` in Arclix root folder.
2. Do the changes you want in the Arclix.
3. Make sure you run `npm run test` and check whether all the tests are passed before raising the PR.
4. Also make sure you run `npm run build` before raising the PR.
5. You can also do both step 3 & 4 using `npm run verify`.

## Debugging

To use breakpoints and explore code execution, you can use the ["Run and Debug"](https://code.visualstudio.com/docs/editor/debugging) feature from VS Code.

1. Add a `debugger` statement where you want to stop the code execution.

2. Click the "Run and Debug" icon in the activity bar of the editor, which opens the [_Run and Debug view_](https://code.visualstudio.com/docs/editor/debugging#_run-and-debug-view).

3. Click the "JavaScript Debug Terminal" button in the _Run and Debug view_, which opens a terminal in VS Code.

4. From that terminal, go to `playground/xxx`, and run `pnpm run dev`.

5. The execution will stop at the `debugger` statement, and you can use the [Debug toolbar](https://code.visualstudio.com/docs/editor/debugging#_debug-actions) to continue, step over, and restart the process...

## Testing

Will be added soon...

## Pull Request Guidelines

-   Checkout a topic branch from a base branch (e.g. `master`), and merge back against that branch.

-   If adding a new feature:

    -   Add accompanying test case.
    -   Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first, and have it approved before working on it.

-   If fixing a bug:

    -   If you are resolving a special issue, add `(bugfix #xxxx[,#xxxx])` (#xxxx is the issue id) in your PR title for a better release log (e.g. `bugfix: fixed something... (bugfix #1234)`).
    -   Provide a detailed description of the bug in the PR. Live demo preferred.
    -   Add appropriate test coverage if applicable.

-   It's OK to have multiple small commits as you work on the PR. GitHub can automatically squash them before merging.

-   Make sure tests pass!

-   No need to worry about code style as long as you have installed the dev dependencies. Modified files are automatically formatted with Prettier on commit (by invoking [Git Hooks](https://git-scm.com/docs/githooks) via [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks)).

-   PR title must follow the [commit message convention](./.github/COMMIT-CONVENTION.md) so that changelogs can be automatically generated.

## Dependencies Guidelines

Arclix aims to be lightweight, and this includes being aware of the number of npm dependencies and their size.

### Think Before Adding a Dependency

Most deps should be added to `devDependencies` even if they are needed at runtime. Some exceptions are:

-   Type packages. Example: `@types/*`.
-   Deps that cannot be properly bundled due to binary files. Example: `esbuild`.

Avoid deps with large transitive dependencies that result in bloated size compared to the functionality it provides. For example, `http-proxy` itself plus `@types/http-proxy` is a little over 1MB in size, but `http-proxy-middleware` pulls in a ton of dependencies that make it 7MB(!) when a minimal custom middleware on top of `http-proxy` only requires a couple of lines of code.
