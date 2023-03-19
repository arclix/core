# Arclix Contribution Guide

Hi! We're really excited and happy to see that you're contributing to Arclix. Before submitting your contribution, please read through the following guide.

## Prerequisites

1. Make sure you have [Node.js](https://nodejs.org/) which includes `npm` greater than v12.

## Repo Setup

To develop and test the core `Arclix` package:

1. Run `npm i` in Arclix root folder.
2. Do the changes you want in the Arclix.
3. Make sure you run `npm run test` and check whether all the tests are passed before raising the PR.
4. Also make sure you run `npm run build` before raising the PR.
5. You can also do both step 3 & 4 using `npm run verify`.

## Testing

We do unit testing for all the module including core, utility, etc.

### Unit Tests

Unit tests are powered by [vitest](https://vitest.dev/). The detailed configuration of vitest is inside `vitest.config.cjs` file.

-   Run unit tests under each module using:
    ```bash
    npm run test
    ```
-   Run unit tests with coverage using:
    ```bash
    npm run test:coverage
    ```

> **Warning**
> Do maintain the `branches` and `functions` greater than `50%` in the coverage.

## Pull Request Guidelines

-   Checkout a topic branch from a base branch (e.g. `master`), and merge back against that branch.

-   If adding a new feature:

    -   Add accompanying test case.
    -   Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first, and have it approved before working on it.

-   If fixing a bug:

    -   If you are resolving a special issue, add `fix: remove something (#issue id) #PR id` in your PR title for a better release log (e.g. `fix: remove something (#1) #2`).
    -   Provide a detailed description of the bug in the PR. Live demo preferred.
    -   Add appropriate test coverage if applicable.

-   It's OK to have multiple small commits as you work on the PR. GitHub can automatically squash them before merging.

-   Make sure to run the following commands before raising the PR:

    ```bash
    npm run format
    ```

    ```bash
    npm run verify:pr
    ```

-   No need to worry about code style as long as you have installed the dev dependencies. Modified files are automatically formatted with Prettier on commit (by invoking [Git Hooks](https://git-scm.com/docs/githooks) via [husky](https://typicode.github.io/husky)).

-   PR title must follow the [commit message convention](./.github/COMMIT_CONVENTION.md) so that changelogs can be automatically generated.

## Dependencies Guidelines

Arclix aims to be lightweight, and this includes being aware of the number of npm dependencies and their size.

### Think Before Adding a Dependency

Most deps should be added to `devDependencies` even if they are needed at runtime. Some exceptions are:

-   Type packages. Example: `@types/*`.
-   Deps that cannot be properly bundled due to binary files. Example: `esbuild`.

Avoid deps with large transitive dependencies that result in bloated size compared to the functionality it provides. For example, `http-proxy` itself plus `@types/http-proxy` is a little over 1MB in size, but `http-proxy-middleware` pulls in a ton of dependencies that make it 7MB(!) when a minimal custom middleware on top of `http-proxy` only requires a couple of lines of code.
