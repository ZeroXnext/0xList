# Token List Builder

A modular toolchain for generating, validating, and maintaining Uniswap-compatible token lists. Includes a CLI, web interface, and automated GitHub workflows for rule-based token aggregation and versioning.

# Developing

## Requirements

- Node.js (v16 or later)
- Yarn (with Corepack enabled)
- Turborepo (included as a dev dependency)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/ZeroXnext/tokenlist-builder.git
   ```
2. Navigate into the project directory:
   ```
   cd tokenlist-builder
   ```
3. Enable Corepack:
   ```
   corepack enable
   ```
4. Install dependencies using Yarn:
   ```
   yarn install
   ```

## Commit Guidelines

This repository uses **[Commitizen](https://github.com/commitizen/cz-cli)** for standardized commit messages following the **Conventional Commits** specification.

### How to Commit

Use the Commitizen CLI instead of `git commit`:

```bash
git cz
```

## Project Structure

- `packages/core`: Core libraries and utilities
- `packages/cli`: Command-line interface tools

## Notes

This is a monorepo managed with Turborepo. Each package (`core`, `cli`, `web`) can be developed and built independently or together through the root workspace commands.
