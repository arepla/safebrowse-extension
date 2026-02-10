# Contributing to SafeBrowse

First off, thank you for considering contributing to SafeBrowse! 🎉

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if relevant**
- **Include your Chrome version and OS**

### Suggesting Features

Feature suggestions are welcome! Please provide:

- **Clear description of the feature**
- **Why this feature would be useful**
- **Possible implementation approach** (optional)
- **Examples from other extensions** (if applicable)

### Pull Requests

1. **Fork the repository**
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly** in Chrome
5. **Commit with clear messages**:
   ```bash
   git commit -m "Add feature: brief description"
   ```
6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request** with:
   - Clear title and description
   - Screenshots/GIFs of changes
   - List of changes made

## Development Guidelines

### Code Style

- Use **2 spaces** for indentation
- Use **camelCase** for variables and functions
- Use **meaningful variable names**
- Add **comments** for complex logic
- Keep functions **small and focused**

### CSS Guidelines

- Use **CSS variables** for colors and common values
- Follow **BEM naming** where appropriate
- Add **transitions** for smooth UX
- Ensure **responsive design**
- Support **dark mode**

### JavaScript Guidelines

- Use **modern ES6+** syntax
- Use **async/await** for asynchronous operations
- Handle **errors gracefully**
- Add **JSDoc comments** for functions
- Avoid **global variables**

### Testing

Before submitting, test:

- ✅ Link preview on various websites
- ✅ PiP button on different video players
- ✅ New tab page functionality
- ✅ Settings save/load correctly
- ✅ No console errors
- ✅ Works in different screen sizes

### Commit Messages

Follow this format:
```
Type: Brief description

Detailed explanation if needed
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

**Examples:**
```
feat: Add custom background image support

Users can now upload and set custom background images for the new tab page.
```

```
fix: Link preview not showing on dynamically loaded content

Updated observer to detect links added after page load.
```

## Project Structure

Understanding the codebase:

```
safebrowse-extension/
├── manifest.json          # Extension config - START HERE
├── background/           # Background service worker
├── content/              # Injected into web pages
├── newtab/               # New tab replacement
├── popup/                # Extension toolbar popup
└── icons/                # Extension icons
```

## Need Help?

- 💬 Join discussions in [GitHub Discussions](https://github.com/yourusername/safebrowse-extension/discussions)
- 📧 Email: dev@safebrowse.com
- 🐛 Report issues in [GitHub Issues](https://github.com/yourusername/safebrowse-extension/issues)

## Code of Conduct

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

Thank you for contributing! 🙌
