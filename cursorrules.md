# Cursor Rules Configuration

## Commit Message Format
- **Prefix**: `[type]: `
- **Types**:
  - `feat`
  - `fix`
  - `docs`
  - `style`
  - `refactor`
  - `test`
  - `chore`
- **Max Length**: 72 characters
- **Description Max Length**: 100 characters

## Editor Settings
- **Tab Size**: 2
- **Insert Spaces**: true
- **Trim Trailing Whitespace**: true
- **Insert Final Newline**: true
- **Word Wrap**: false
- **Auto Indent**: true
- **Detect Indentation**: true
- **Format On Save**: true
- **Format On Paste**: true

## Language-specific Settings

### JavaScript/TypeScript
- **Quote Style**: single
- **Semicolons**: true
- **Prefer Const**: true
- **Bracket Spacing**: true
- **Arrow Parens**: avoid
- **TypeScript Strict Mode**: true
- **TypeScript Module Resolution**: node
- **TypeScript Target**: ESNext

### Elysia.js/Bun
- **Quote Style**: single
- **Semicolons**: true
- **Module Type**: ESM
- **Node Resolution**: bundler
- **Bun Runtime Target**: bun
- **Import Extensions**: preserve

### Drizzle ORM
- **Schema Format**: TypeScript
- **Quote Style**: single
- **Semicolons**: true
- **Migration Directory**: drizzle/migrations
- **Schema Directory**: drizzle/schema

### Oslo (Auth)
- **Quote Style**: single
- **Semicolons**: true

### JSX/TSX
- **Quote Style**: single
- **Semicolons**: true
- **JSX Bracket Same Line**: false
- **JSX Single Quote**: true

### Python
- **Tab Size**: 4
- **Quote Style**: double
- **Max Line Length**: 88
- **Sort Imports**: true

### JSON/YAML
- **Tab Size**: 2

### HTML
- **Quote Style**: double

### CSS/SCSS
- **Quote Style**: double
- **Indent Size**: 2

### Markdown
- **Trim Trailing Whitespace**: false

## Terminal
- **Default Terminal**: integrated
- **Terminal Shell**: system_default
- **Terminal Font Size**: 14

## Git Settings
- **Git Enabled**: true
- **Git Auto Fetch**: true
- **Git Validate Commit Msg**: true
- **Git Fetch Interval**: 300 seconds

## AI Settings
- **Copilot Enabled**: true
- **Context Window Size**: 10000
- **AI Suggestions On Typing**: true
- **AI Auto Complete**: true
- **AI Completion Delay**: 300 milliseconds

## Code Folding
- **Folding Enabled**: true
- **Fold Markers**:
  - `{{{`: `}}}`
  - `#region`: `#endregion`

## File Explorer
- **Auto Reveal In Explorer**: true
- **Compact Folders**: true
- **Exclude From Explorer**:
  - node_modules
  - .git
  - dist
  - build
  - coverage
  - .bunfig.toml
  - bun.lockb

## File Exclusions for Search
- **Exclude From Search**:
  - node_modules
  - .git
  - dist
  - build
  - __pycache__
  - venv
  - .env
  - coverage
  - .next
  - .DS_Store
  - *.log
  - *.lock
  - bun.lockb
  - drizzle/migrations-history
  - .bunfig.toml

## Project Structure
- **Source Directory**: src
- **Routes Directory**: src/routes
- **Controllers Directory**: src/controllers
- **Models Directory**: src/models
- **Drizzle Schema**: drizzle/schema
- **Drizzle Migrations**: drizzle/migrations
- **Oslo Auth**: src/auth
- **Config Files**:
  - tsconfig.json
  - package.json
  - .env
  - .env.example
  - bunfig.toml

## Keyboard Shortcuts
*(Custom keyboard shortcuts can be added here)* 