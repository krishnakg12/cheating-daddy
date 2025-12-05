# Quick Start Guide - React Migration

## 🚀 Getting Started

### Step 1: Install Dependencies

```bash
npm install
```

This will install:
- React 18.2.0
- ReactDOM 18.2.0
- Vite 5.0.0
- @vitejs/plugin-react
- All Electron Forge dependencies
- All other required packages

### Step 2: Start the Application

```bash
npm start
```

## ⚠️ Important Notes

### Current Setup Status

1. **React Components**: Core components (App, MainView, AssistantView) are fully implemented
2. **Vite Integration**: Electron Forge Vite plugin is configured but needs testing
3. **Build System**: May require adjustments based on testing results

### If the App Doesn't Load

#### Option 1: Check Console Errors
1. Open DevTools (View > Toggle Developer Tools in Electron)
2. Check for any errors in the console
3. Common issues:
   - React not loading → Check that dependencies are installed
   - `window.cheddar` undefined → Check that `renderer.js` loads before React
   - Module import errors → Vite bundling may need configuration

#### Option 2: Manual Vite Build (Alternative Approach)

If Electron Forge + Vite doesn't work immediately:

1. **Build React app separately:**
   ```bash
   npx vite build
   ```

2. **Update window.js to load built files:**
   Change `loadFile` to load from `dist/` directory in production

3. **Or use Vite dev server:**
   - Start Vite dev server: `npx vite`
   - Update window.js to load from `http://localhost:3000` in development

### Testing Core Features

Once the app loads:

1. ✅ **API Key Input**: Should accept and store Gemini API key
2. ✅ **Start Session**: Should initialize Gemini and start capture
3. ✅ **Screen Capture**: Should capture screenshots every 2 seconds
4. ✅ **Audio Capture**: Should capture system audio (macOS/Windows) or mic
5. ✅ **AI Responses**: Should display in AssistantView with markdown
6. ✅ **Keyboard Shortcuts**: Should work for window movement, click-through, etc.

### Known Limitations

- **Placeholder Views**: CustomizeView, HelpView, HistoryView, AdvancedView, OnboardingView are basic placeholders
- **Vite Integration**: May need refinement after testing
- **Security**: Currently using `nodeIntegration: true` - can be improved with preload script

## 🔧 Development Workflow

### Making Changes

1. Edit React components in `src/components/`
2. Changes should hot-reload (if Vite dev server is working)
3. Restart app if needed: `npm start`

### Building for Production

```bash
# Package the app
npm run package

# Create distributable
npm run make
```

## 📝 Next Steps

1. Test the application thoroughly
2. Complete placeholder components (see REACT_MIGRATION_STATUS.md)
3. Refine Vite integration if needed
4. Add proper error boundaries
5. Improve security with preload script and context isolation

## 🆘 Troubleshooting

### "React is not defined"
- Run `npm install` again
- Check `node_modules/react` exists
- Verify package.json has React dependencies

### "Cannot find module 'react'"
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Blank Window
- Check DevTools console for errors
- Verify `src/renderer.jsx` exists
- Check that `index.html` has `<div id="root"></div>`

### IPC Not Working
- Verify `window.require('electron')` is available
- Check that main process IPC handlers are registered
- See `src/index.js` for IPC setup

---

For detailed migration status, see `REACT_MIGRATION_STATUS.md`

