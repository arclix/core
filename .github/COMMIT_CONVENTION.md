## Git Commit Message Convention

We follow a standard commit convention followed by [Angular's commit convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

So that we have the following advantages:

- get **more readable messages**.
- easy to follow throught **project history**.
- generate better **change log** for Arclix.

## Commit Message Format

The commit messages should follow the following:

```
<type>[optional scope]: <description> (#issue id)

[optional body]

[optional footer(s)]
```

### Types

| Type       | Description                                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------------------- |
| `feat`     | A new feature                                                                                               |
| `fix`      | A bug fix                                                                                                   |
| `docs`     | Documentation only changes                                                                                  |
| `style`    | Changes that do not affect the meaning of the code(white-space formatting, missing semi-colons,etc)         |
| `refactor` | A code change that neither fixes a bug nor adds a feature                                                   |
| `perf`     | A code change that improves performance                                                                     |
| `test`     | Adding missing tests or correcting existing tests                                                           |
| `build`    | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
| `ci`       | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
| `chore`    | Other changes that don't modify src or test files                                                           |
| `revert`   | Reverts a commit                                                                                            |

### Examples

1. Commit message with description and scope

   ```
   feat(core): add create project (#1)
   ```

2. Commit message with `!` to draw attention to breaking change

   ```
   refactor(core)!: remove create project (#2)
   ```

3. Commit message without scope

   ```
   feat: add create project (#1)
   ```

### Revert

If the PR reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit.

Example:

```
revert: feat(core): add create poject (#1)
```

### Scopes

The scope could be anything specifying the place of the commit change. For example `core`, `build`, `workflow`, `cli`, `create`, `generate`, `deps`, etc...

### Commit Message

The commit message contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

> **Note:**
> We use [commitlint](https://commitlint.js.org) to restrict the commit messages to follow our convention mentioned above.
