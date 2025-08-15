# Release Process

This document describes the automated and manual release processes for the rd-monolith project.

## 🤖 Automated Releases (Recommended)

### How it Works

- **Trigger**: Automatically runs when a PR is merged into `main`
- **Version**: Auto-increments patch version (e.g., `v1.0.0` → `v1.0.1`)
- **Process**: Test → Build → Create Release → Deploy to Production

### What Happens

1. **Detection**: Checks if the push to main is a merge commit (not a direct push)
2. **Version Generation**: Automatically increments the patch version from the latest tag
3. **Testing**: Runs the full test suite
4. **Building**: Builds both frontend and backend
5. **Release Creation**:
   - Creates a git tag
   - Generates release notes from commit messages
   - Creates a GitHub release
6. **Deployment**: Deploys to Fly.io production environment
7. **Notification**: Updates the release with deployment status

### To Trigger an Automated Release

Simply merge a PR into main:

```bash
# Create a PR and merge it through GitHub UI
# OR merge locally:
git checkout main
git pull origin main
git merge your-feature-branch
git push origin main
```

## 🔧 Manual Releases

### When to Use Manual Releases

- For hotfixes that need specific version numbers
- For major/minor version bumps
- When you need to control the exact release timing

### Option 1: Manual Workflow Dispatch

1. Go to GitHub Actions → "Manual Release" workflow
2. Click "Run workflow"
3. Enter the desired version (e.g., `v2.0.0`)
4. Click "Run workflow"

### Option 2: Git Tag Push

```bash
# Create and push a tag manually
git tag v1.2.0
git push origin v1.2.0
```

## 📋 Release Workflow Details

### Automated Release Workflow (`.github/workflows/auto-release.yml`)

- **Trigger**: Push to `main` branch (merge commits only)
- **Jobs**: check-merge → test → build → create-release → deploy
- **Version Strategy**: Auto-increment patch version
- **Release Notes**: Generated from commit messages since last release

### Manual Release Workflow (`.github/workflows/release.yml`)

- **Trigger**: Manual workflow dispatch OR git tag push
- **Jobs**: test → build → create-manual-release → deploy
- **Version Strategy**: User-specified version
- **Release Notes**: Generated from commit messages since last release

## 🔑 Required Secrets

The following secrets must be configured in GitHub repository settings:

- `FLY_API_TOKEN` - For Fly.io deployment
- `RD_JWT_SECRET` - For JWT authentication
- `RD_GITHUB_CLIENT_ID` - For GitHub OAuth
- `RD_GITHUB_CLIENT_SECRET` - For GitHub OAuth

## 🚀 Deployment Target

All releases deploy to:

- **Platform**: Fly.io
- **App**: `rd-monolith`
- **Region**: San Jose (sjc)
- **URL**: https://rd-monolith.fly.dev (or your configured domain)

## 📝 Best Practices

### For Automated Releases

- Write clear, descriptive commit messages (they become release notes)
- Use conventional commit format when possible:
  - `feat: add new feature`
  - `fix: resolve bug in component`
  - `docs: update documentation`
  - `refactor: improve code structure`

### For Manual Releases

- Use semantic versioning:
  - `v1.0.0` - Major release (breaking changes)
  - `v1.1.0` - Minor release (new features)
  - `v1.0.1` - Patch release (bug fixes)

### General

- Always test locally before merging to main
- Review the CI/CD pipeline status before considering a release complete
- Monitor the deployment in Fly.io dashboard after release

## 🔍 Monitoring Releases

- **GitHub Releases**: Check the [Releases page](https://github.com/rollercoaster-dev/rd-monolith/releases)
- **GitHub Actions**: Monitor workflow runs in the [Actions tab](https://github.com/rollercoaster-dev/rd-monolith/actions)
- **Fly.io Dashboard**: Monitor deployment status and logs
- **Production Site**: Verify the release is live at your production URL

## 🆘 Troubleshooting

### Automated Release Not Triggering

- Ensure the push to main is a merge commit (not a direct push)
- Check that all required secrets are configured
- Verify the workflow file syntax in GitHub Actions

### Deployment Failures

- Check Fly.io API token validity
- Verify environment variables are properly set
- Review build logs for compilation errors
- Check Fly.io resource limits and quotas

### Version Conflicts

- If auto-versioning creates conflicts, use manual release with specific version
- Ensure tags are unique and follow semantic versioning
