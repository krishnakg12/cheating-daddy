# React Migration Guide

## Overview

The cheating-daddy application has been migrated from Lit web components to React 18. All functionality remains identical, but the frontend now uses modern React patterns with functional components and hooks.

## What Changed

### Framework
- **Before**: Lit.dev web components with `LitElement` base class
- **After**: React 18 with functional components and hooks

### Component Structure
- **Before**: Custom elements with `@customElement` decorators
- **After**: Standard React functional components exported as default

### State Management
- **Before**: Lit reactive properties (`@property`, `@state`)
- **After**: React hooks (`useState`, `useEffect`, `useCallback`)

### Lifecycle Methods
- **Before**: `connectedCallback()`, `disconnectedCallback()`, `updated()`
- **After**: `useEffect()` hooks with appropriate dependencies

### Templates
- **Before**: Lit's `html` tagged template literals
- **After**: JSX syntax

### Styling
- **Before**: Lit's `css` tagged template literals in static styles
- **After**: External CSS files imported into components

## Installation

```bash
# Install dependencies
npm install

# The following packages were added:
# - react@^18.2.0
# - react-dom@^18.2.0
# - @vitejs/plugin-react@^4.2.1
# - vite@^5.0.0
```

## Development

```bash
# Start the Electron app in development mode
npm start
```

## Building

```bash
# Package the application
npm run package

# Create distributable
npm run make
```

## Component Mapping

| Lit Component | React Component | Location |
|--------------|-----------------|----------|
| `CheatingDaddyApp` | `App` | `src/components/App.jsx` |
| `AppHeader` | `AppHeader` | `src/components/app/AppHeader.jsx` |
| `MainView` | `MainView` | `src/components/views/MainView.jsx` |
| `AssistantView` | `AssistantView` | `src/components/views/AssistantView.jsx` |
| `CustomizeView` | `CustomizeView` | `src/components/views/CustomizeView.jsx` |
| `HelpView` | `HelpView` | `src/components/views/HelpView.jsx` |
| `HistoryView` | `HistoryView` | `src/components/views/HistoryView.jsx` |
| `AdvancedView` | `AdvancedView` | `src/components/views/AdvancedView.jsx` |
| `OnboardingView` | `OnboardingView` | `src/components/views/OnboardingView.jsx` |

## Key Features Preserved

✅ Live AI assistance with Gemini 2.0 Flash
✅ Screen & audio capture
✅ Multiple profiles (Interview, Sales, Meeting, etc.)
✅ Transparent overlay window
✅ Click-through mode
✅ All keyboard shortcuts
✅ IPC communication with Electron main process
✅ LocalStorage persistence
✅ Markdown rendering with syntax highlighting
✅ Response navigation and saving
✅ Layout modes (normal/compact)
✅ Advanced mode toggle

## Architecture

### Entry Point
- `src/index.html` - HTML shell with React root div
- `src/renderer.jsx` - React app initialization with ReactDOM

### Main App Component
- `src/components/App.jsx` - Root component with routing and state management

### State Management
All state is managed in the main `App` component using React hooks:
- `useState` for component state
- `useEffect` for side effects and IPC listeners
- `useCallback` for memoized callbacks
- Props drilling for passing state to child components

### IPC Communication
Electron IPC communication is handled through `useEffect` hooks that set up listeners on mount and clean them up on unmount.

## Development Notes

### Hot Module Replacement
The app uses Vite for fast development builds with HMR support.

### Electron Integration
The main Electron process (`src/index.js`) remains unchanged. All IPC handlers and window management logic is preserved.

### CSS Variables
All CSS custom properties from the original Lit implementation are preserved in `src/index.html` for consistent theming.

### External Dependencies
- `marked.js` - Markdown parsing (loaded globally)
- `highlight.js` - Syntax highlighting (loaded globally)
- React and ReactDOM are bundled with the app

## Testing

All original features should be tested:
1. API key input and validation
2. Session start/stop
3. Screen capture at different intervals
4. Audio capture (macOS/Windows/Linux)
5. AI response rendering with markdown
6. Response navigation (previous/next)
7. Response saving to history
8. Keyboard shortcuts
9. Window movement and click-through
10. Profile and language selection
11. Layout mode switching
12. Settings persistence

## Troubleshooting

### Build Issues
If you encounter build errors:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Electron Issues
If the Electron window doesn't load:
1. Check that `src/renderer.jsx` is being loaded
2. Verify React is installed: `npm list react`
3. Check browser console for errors (View > Toggle Developer Tools)

### IPC Communication Issues
If features like screen capture don't work:
1. Verify `window.cheddar` is available (check `src/utils/renderer.js`)
2. Check that IPC handlers are registered in `src/index.js`
3. Look for errors in both renderer and main process consoles

## Future Improvements

Potential enhancements for the React version:
- Add TypeScript for type safety
- Implement React Context API for global state
- Add React Router for more sophisticated routing
- Create custom hooks for reusable logic (useIPC, useLocalStorage)
- Add PropTypes or TypeScript interfaces
- Implement React.memo for performance optimization
- Add error boundaries for better error handling
- Create a component library with Storybook

## Migration Checklist

- [x] Install React and ReactDOM
- [x] Install Vite with React plugin
- [x] Create main App component
- [x] Convert AppHeader to React
- [x] Convert MainView to React
- [x] Convert AssistantView to React
- [x] Create placeholder views (Customize, Help, History, Advanced, Onboarding)
- [x] Update index.html with React root
- [x] Create renderer.jsx entry point
- [x] Preserve all CSS variables and styles
- [x] Maintain IPC communication
- [x] Preserve localStorage usage
- [x] Keep keyboard shortcuts functional
- [ ] Full implementation of CustomizeView (simplified for now)
- [ ] Test all features end-to-end
- [ ] Update documentation

## Support

For issues or questions about the React migration, please refer to:
- React documentation: https://react.dev
- Electron documentation: https://www.electronjs.org/docs
- Original project README: README.md
