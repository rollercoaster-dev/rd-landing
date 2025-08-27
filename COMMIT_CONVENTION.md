# Commit Message Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automated semantic versioning and release generation.

## Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Types

- **feat**: A new feature (triggers MINOR version bump)
- **fix**: A bug fix (triggers PATCH version bump)
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries

## Breaking Changes

Add `BREAKING CHANGE:` in the footer or `!` after the type to trigger a MAJOR version bump:

```
feat!: remove deprecated API endpoint

BREAKING CHANGE: The /api/v1/old-endpoint has been removed. Use /api/v2/new-endpoint instead.
```

## Examples

```bash
# Patch release (0.0.1 → 0.0.2)
git commit -m "fix: resolve Auto Release workflow build failure"

# Minor release (0.0.1 → 0.1.0)
git commit -m "feat: add semantic-release for automated versioning"

# Major release (0.0.1 → 1.0.0)
git commit -m "feat!: migrate to new authentication system"

# No release
git commit -m "docs: update README with deployment instructions"
git commit -m "chore: update dependencies"
```

## Scopes (Optional)

You can add scopes to provide more context:

```bash
git commit -m "feat(auth): add OAuth2 integration"
git commit -m "fix(ui): resolve mobile menu accessibility issue"
git commit -m "perf(api): optimize database queries"
```

## Automated Releases

When commits are merged to `main`, semantic-release will:

1. **Analyze commits** since the last release
2. **Determine version bump** based on commit types
3. **Generate changelog** from commit messages
4. **Create GitHub release** with release notes
5. **Deploy to production** automatically

## Tips

- Use clear, descriptive commit messages
- Keep the first line under 72 characters
- Use the imperative mood ("add" not "added" or "adds")
- Reference issues/PRs when relevant: `fix: resolve login issue (#123)`
