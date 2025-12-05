# Window Visibility Debug Guide

## Issue: Window Not Visible

The window may not be visible for several reasons. Let's diagnose and fix:

### Possible Causes:

1. **Window is hidden/blank** - React not loading
2. **Window is off-screen** - Position issue
3. **Window transparency** - Background is transparent making it invisible
4. **React modules not bundled** - JSX files not processed

## Diagnostic Steps:

### Step 1: Check if Window Exists
Open DevTools (View > Toggle Developer Tools) and check console for errors.

### Step 2: Check Window Position
The window might be positioned off-screen. Check the positioning code in `window.js`.

### Step 3: Check React Loading
Look for errors like:
- "Failed to load module"
- "Cannot find module 'react'"
- "renderer.jsx: Failed to load"

### Step 4: Verify Electron Forge Vite Plugin
The Vite plugin should bundle React automatically. If not working, we need to fix configuration.

## Immediate Fixes:

### Fix 1: Ensure Window Shows
The window has `show: false` by default. We need to show it after loading.

### Fix 2: Make Window Visible
Add `show: true` or show window after `ready-to-show` event.

### Fix 3: Fix React Loading
React needs to be bundled. The Vite plugin should handle this, but configuration may need adjustment.

## Next Steps:

1. Check console errors first
2. Verify React is bundled
3. Ensure window shows after loading
4. Test all buttons and functions

Let me create fixes for these issues now.

