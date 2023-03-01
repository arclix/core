## Git Commit Message Convention

The commit messages should follow the following examples.

#### Examples

```
feature(#issue_id): add 'comments' option
bugfix(#issue_id): fix dev error
refactor(#issue_id): refactor the 'comments' option
revert(#issue_id): add 'comments' option
```

### Feature

If the PR adds a new feature, it should begin with `feature(#issue_id): `, followed by the commit message.

### BugFix

If the PR fixes a bug, it should begin with `bugfix(#issue_id): `, followed by the commit message.

### Refactor

If the PR does refactiring of existing code, it should begin with `refactor(#issue_id): `, followed by the commit message.

### Revert

If the PR reverts a previous commit, it should begin with `revert(#issue_id): `, followed by the header of the reverted commit.

### Commit Message

The commit message contains a succinct description of the change:

-   use the imperative, present tense: "change" not "changed" nor "changes"
-   don't capitalize the first letter
-   no dot (.) at the end
