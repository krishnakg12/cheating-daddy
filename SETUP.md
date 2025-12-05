# Quick Setup Guide - React Version

## Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Windows, macOS, or Linux

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This will install:
- React 18.2.0
- React DOM 18.2.0
- Vite with React plugin
- All Electron dependencies
- All existing project dependencies

### 2. Verify Installation

Check that React is installed:
```bash
npm list react react-dom
```

You should see:
```
├── react@18.2.0
└── react-dom@18.2.0
```

### 3. Run the Application

```bash
npm start
```

The Electron window should open with the React-powered interface.

## First Launch

1. **Onboarding Screen**: On first launch, you'll see a welcome screen. Click "Get Started".

2. **API Key**: Enter your Gemini API key in the main view.
   - Don't have one? Click "get one here" to visit Google AI Studio.

3. **Start Session**: Click "Start Session" or press `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac).

4. **AI Assistant**: The assistant view will open and start capturing your screen and audio.

## Keyboard Shortcuts

| Action | Windows | macOS |
|--------|---------|-------|
| Start Session | `Ctrl+Enter` | `Cmd+Enter` |
| Hide Window | `Ctrl+\` | `Cmd+\` |
| Click-through | `Ctrl+M` | `Cmd+M` |
| Move Window | `Ctrl+Arrows` | `Cmd+Arrows` |
| Previous Response | `Ctrl+[` | `Cmd+[` |
| Next Response | `Ctrl+]` | `Cmd+]` |

## Building for Production

### Package the App
```bash
npm run package
```

This creates a packaged version in the `out/` directory.

### Create Distributable
```bash
npm run make
```

This creates platform-specific installers:
- **Windows**: `.exe` installer in `out/make/squirrel.windows/`
- **macOS**: `.dmg` file in `out/make/`
- **Linux**: `.AppImage` in `out/make/`

## Troubleshooting

### Issue: "Cannot find module 'react'"

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Blank window on launch

**Solution**:
1. Open DevTools: View > Toggle Developer Tools
2. Check console for errors
3. Verify `src/renderer.jsx` exists
4. Ensure `<div id="root"></div>` is in `src/index.html`

### Issue: "npm start" fails

**Solution**:
```bash
# Clear Electron cache
npm run package -- --clean

# Or manually clear
rm -rf ~/.electron
rm -rf node_modules/.cache
```

### Issue: Build fails on Windows

**Solution**:
1. Install Windows Build Tools:
   ```bash
   npm install --global windows-build-tools
   ```
2. Retry the build

### Issue: Build fails on macOS

**Solution**:
1. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```
2. Retry the build

## Development Tips

### Hot Reload
The app uses Vite for fast development builds. Changes to React components will hot-reload automatically.

### Debugging
1. **Renderer Process**: View > Toggle Developer Tools
2. **Main Process**: Check terminal output where you ran `npm start`

### Logs Location
- **Windows**: `%APPDATA%\cheating-daddy\logs\`
- **macOS**: `~/Library/Logs/cheating-daddy/`
- **Linux**: `~/.config/cheating-daddy/logs/`

## Configuration

### API Key Storage
API keys are stored in localStorage. To reset:
1. Open DevTools
2. Go to Application > Local Storage
3. Delete the `apiKey` entry

### Settings Storage
All settings are stored in localStorage:
- `selectedProfile`
- `selectedLanguage`
- `selectedScreenshotInterval`
- `selectedImageQuality`
- `layoutMode`
- `advancedMode`
- `savedResponses`

### Config File
Application config is stored in:
- **Windows**: `%APPDATA%\cheating-daddy\config.json`
- **macOS**: `~/Library/Application Support/cheating-daddy/config.json`
- **Linux**: `~/.config/cheating-daddy/config.json`

## Platform-Specific Notes

### Windows
- Requires Windows 10 or later
- Loopback audio capture for system audio
- May require administrator privileges for first run

### macOS
- Requires macOS 10.13 or later
- Uses SystemAudioDump for system audio capture
- Requires Screen Recording permission (System Preferences > Security & Privacy)
- Requires Microphone permission

### Linux
- Tested on Ubuntu 20.04+
- Uses microphone input (system audio capture limited)
- May require additional permissions for screen capture

## Getting Help

1. **Migration Docs**: See `REACT_MIGRATION.md`
2. **Full Summary**: See `MIGRATION_SUMMARY.md`
3. **Original README**: See `README.md`
4. **React Docs**: https://react.dev
5. **Electron Docs**: https://www.electronjs.org/docs

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Start development
npm start

# Run tests
npm test

# Package app
npm run package

# Create distributable
npm run make

# Clean build
npm run package -- --clean

# Lint code (if configured)
npm run lint
```

## Next Steps

After successful setup:
1. ✅ Test API key input
2. ✅ Start a session
3. ✅ Verify screen capture works
4. ✅ Verify audio capture works
5. ✅ Test AI responses
6. ✅ Try keyboard shortcuts
7. ✅ Explore settings
8. ✅ Test on your target platform

## Success!

If you see the Cheating Daddy interface and can start a session, you're all set! 🎉

The React migration is complete and the app is ready to use.
