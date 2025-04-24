# Release Workflow Tasks

This document outlines the tasks needed to implement a tag-based release workflow for the rd-monolith project.

## Current Workflow

Currently, the CI/CD workflow in `.github/workflows/ci.yml` deploys to Fly.io whenever changes are pushed to the `main` branch. This approach doesn't allow for controlled releases.

## Desired Workflow

We want to implement a tag-based release workflow similar to the one used in the openbadges-modular-server repository:

1. Run tests on all pull requests and pushes to main
2. Only deploy to production when a tag with the format `v*` (e.g., v1.0.0) is pushed

## Tasks

### 1. Update CI Workflow

- [x] Modify `.github/workflows/ci.yml` to run tests on pull requests and pushes to main
- [x] Remove automatic deployment on push to main

### 2. Create Release Workflow

- [x] Create a new workflow file `.github/workflows/release.yml`
- [x] Configure it to run only when a tag with the format `v*` is pushed
- [x] Include steps to:
  - [x] Run tests
  - [x] Build the application
  - [x] Deploy to Fly.io

### 3. Documentation

- [x] Update README.md with information about the release process
- [x] Document how to create and push a release tag

## Release Process

To create a new release:

1. Ensure all changes are merged to the `main` branch
2. Create a new tag with the format `v{major}.{minor}.{patch}` (e.g., v1.0.0)
3. Push the tag to GitHub:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
4. The release workflow will automatically run tests, build the application, and deploy to production

## Benefits

- More controlled release process
- Clear versioning of production deployments
- Ability to quickly rollback by deploying a previous tag
- Separation of development (main branch) from production releases (tags)
