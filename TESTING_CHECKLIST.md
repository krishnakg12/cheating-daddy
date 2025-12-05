# Testing Checklist - React Version

## Pre-Testing Setup

- [ ] Dependencies installed (`npm install`)
- [ ] No build errors
- [ ] App launches successfully (`npm start`)
- [ ] DevTools accessible (View > Toggle Developer Tools)
- [ ] No console errors on launch

## 1. First Launch & Onboarding

- [ ] Onboarding screen appears on first launch
- [ ] Welcome message displays correctly
- [ ] "Get Started" button works
- [ ] Transitions to main view after onboarding
- [ ] `onboardingCompleted` saved to localStorage
- [ ] Onboarding doesn't show on subsequent launches

## 2. Main View

### API Key Input
- [ ] API key input field visible
- [ ] Placeholder text shows
- [ ] Can type in password field
- [ ] Value persists to localStorage
- [ ] Red blink animation on empty submit
- [ ] "Get one here" link opens browser

### Start Button
- [ ] Start button visible
- [ ] Shows correct keyboard shortcut (Ctrl/Cmd+Enter)
- [ ] Button disabled when initializing
- [ ] Keyboard shortcut works (Ctrl/Cmd+Enter)
- [ ] Transitions to assistant view on start

## 3. Assistant View

### Initial State
- [ ] Default message shows (profile-specific)
- [ ] Text input field visible
- [ ] Navigation buttons visible
- [ ] Save button visible
- [ ] Response counter hidden (no responses yet)

### AI Responses
- [ ] Responses display correctly
- [ ] Markdown rendering works
- [ ] Code blocks have syntax highlighting
- [ ] Links are clickable
- [ ] Lists render properly
- [ ] Bold/italic text works
- [ ] Blockquotes styled correctly
- [ ] Tables render properly

### Response Animation
- [ ] Word-by-word animation on new responses
- [ ] Animation smooth and readable
- [ ] No animation on navigation
- [ ] Animation completes properly

### Response Navigation
- [ ] Previous button works
- [ ] Next button works
- [ ] Previous button disabled at first response
- [ ] Next button disabled at last response
- [ ] Response counter updates correctly
- [ ] Keyboard shortcuts work (Ctrl/Cmd+[/])

### Response Scrolling
- [ ] Can scroll long responses
- [ ] Scroll up shortcut works (Ctrl/Cmd+Shift+Up)
- [ ] Scroll down shortcut works (Ctrl/Cmd+Shift+Down)
- [ ] Scrollbar styled correctly

### Text Input
- [ ] Can type in text input
- [ ] Enter key sends message
- [ ] Shift+Enter adds new line
- [ ] Input clears after sending
- [ ] Status updates after sending

### Save Response
- [ ] Save button works
- [ ] Button changes color when saved
- [ ] Response saved to localStorage
- [ ] Saved state persists across responses
- [ ] Can't save same response twice

## 4. Header

### Title
- [ ] Correct title for each view
- [ ] Title updates on view change

### Status (Assistant View)
- [ ] Elapsed time displays
- [ ] Timer updates every second
- [ ] Status text shows correctly
- [ ] Status updates on AI events

### Navigation Buttons (Main View)
- [ ] History button visible
- [ ] Advanced button visible (if enabled)
- [ ] Customize button visible
- [ ] Help button visible
- [ ] All buttons clickable

### Action Buttons (Assistant View)
- [ ] Hide button visible
- [ ] Hide button shows correct shortcut
- [ ] Close button visible
- [ ] Close button works

### Close/Back Button
- [ ] Shows X icon
- [ ] Closes app from main view
- [ ] Goes back from settings views
- [ ] Closes session from assistant view

## 5. Customize View

- [ ] View loads without errors
- [ ] Profile selection visible
- [ ] Language selection visible
- [ ] Screenshot interval selection visible
- [ ] Image quality selection visible
- [ ] Layout mode selection visible
- [ ] Advanced mode toggle visible
- [ ] Settings persist to localStorage

## 6. Help View

- [ ] View loads without errors
- [ ] Content displays
- [ ] Can navigate back

## 7. History View

- [ ] View loads without errors
- [ ] Saved responses display (if any)
- [ ] Can navigate back

## 8. Advanced View

- [ ] View loads without errors (if advanced mode enabled)
- [ ] Content displays
- [ ] Can navigate back

## 9. Window Management

### Window Movement
- [ ] Ctrl/Cmd+Up moves window up
- [ ] Ctrl/Cmd+Down moves window down
- [ ] Ctrl/Cmd+Left moves window left
- [ ] Ctrl/Cmd+Right moves window right
- [ ] Window stays on screen
- [ ] Movement smooth

### Window Visibility
- [ ] Ctrl/Cmd+\ hides window
- [ ] Ctrl/Cmd+\ shows window again
- [ ] Window state persists

### Click-through Mode
- [ ] Ctrl/Cmd+M enables click-through
- [ ] Can click through window
- [ ] Ctrl/Cmd+M disables click-through
- [ ] Window interactive again

### Always-on-Top
- [ ] Window stays on top of other windows
- [ ] Works across all views

## 10. Screen Capture

### Manual Mode
- [ ] Can select manual mode
- [ ] No automatic captures
- [ ] Manual capture works (if implemented)

### Automatic Mode
- [ ] 1 second interval works
- [ ] 2 second interval works
- [ ] 5 second interval works
- [ ] 10 second interval works
- [ ] Captures sent to AI

### Image Quality
- [ ] High quality setting works
- [ ] Medium quality setting works
- [ ] Low quality setting works
- [ ] Quality affects token usage

## 11. Audio Capture

### macOS
- [ ] SystemAudioDump loads
- [ ] System audio captured
- [ ] Microphone captured (if enabled)
- [ ] Audio sent to AI

### Windows
- [ ] Loopback audio works
- [ ] Microphone captured (if enabled)
- [ ] Audio sent to AI

### Linux
- [ ] Microphone captured
- [ ] Audio sent to AI

## 12. AI Integration

### Gemini API
- [ ] API key validated
- [ ] Connection established
- [ ] Responses received
- [ ] Errors handled gracefully

### Profiles
- [ ] Interview profile works
- [ ] Sales profile works
- [ ] Meeting profile works
- [ ] Presentation profile works
- [ ] Negotiation profile works
- [ ] Exam profile works

### Languages
- [ ] English (US) works
- [ ] Other languages selectable
- [ ] Language affects responses

## 13. Settings Persistence

### LocalStorage
- [ ] API key persists
- [ ] Selected profile persists
- [ ] Selected language persists
- [ ] Screenshot interval persists
- [ ] Image quality persists
- [ ] Layout mode persists
- [ ] Advanced mode persists
- [ ] Saved responses persist

### Config File
- [ ] Config file created
- [ ] Onboarded status persists
- [ ] Stealth level persists (if set)
- [ ] Layout persists

## 14. Layout Modes

### Normal Mode
- [ ] Default layout loads
- [ ] Comfortable spacing
- [ ] Readable font sizes
- [ ] Window size appropriate

### Compact Mode
- [ ] Compact layout loads
- [ ] Reduced spacing
- [ ] Smaller fonts
- [ ] Smaller window size
- [ ] All features accessible

## 15. Styling & Theming

### CSS Variables
- [ ] All CSS variables defined
- [ ] Colors consistent
- [ ] Transparency works
- [ ] Hover states work
- [ ] Focus states work

### Responsive Design
- [ ] Layout adapts to window size
- [ ] No horizontal scrolling
- [ ] Content readable at all sizes

### Animations
- [ ] View transitions smooth
- [ ] Button hover effects work
- [ ] Loading states animated
- [ ] No janky animations

## 16. Error Handling

### API Errors
- [ ] Invalid API key shows error
- [ ] Network errors handled
- [ ] Rate limit errors handled
- [ ] Error messages clear

### UI Errors
- [ ] Empty states handled
- [ ] Loading states shown
- [ ] Error boundaries work (if implemented)
- [ ] No white screen of death

## 17. Performance

### Load Time
- [ ] App loads in < 3 seconds
- [ ] No blocking operations
- [ ] Smooth animations

### Memory Usage
- [ ] No memory leaks
- [ ] Memory usage stable
- [ ] Can run for extended periods

### CPU Usage
- [ ] CPU usage reasonable
- [ ] No excessive polling
- [ ] Efficient rendering

## 18. Cross-Platform

### Windows
- [ ] App builds successfully
- [ ] All features work
- [ ] Keyboard shortcuts correct
- [ ] Audio capture works
- [ ] Screen capture works

### macOS
- [ ] App builds successfully
- [ ] All features work
- [ ] Keyboard shortcuts correct
- [ ] Audio capture works
- [ ] Screen capture works
- [ ] Permissions requested

### Linux
- [ ] App builds successfully
- [ ] All features work
- [ ] Keyboard shortcuts correct
- [ ] Audio capture works
- [ ] Screen capture works

## 19. Build & Package

### Development Build
- [ ] `npm start` works
- [ ] Hot reload works
- [ ] DevTools accessible
- [ ] No build warnings

### Production Build
- [ ] `npm run package` succeeds
- [ ] Packaged app runs
- [ ] All features work
- [ ] No console errors

### Distributable
- [ ] `npm run make` succeeds
- [ ] Installer created
- [ ] Installer works
- [ ] App installs correctly
- [ ] App runs after install

## 20. Documentation

- [ ] README.md updated
- [ ] SETUP.md clear and accurate
- [ ] REACT_MIGRATION.md comprehensive
- [ ] MIGRATION_SUMMARY.md complete
- [ ] BEFORE_AFTER.md helpful
- [ ] All code comments accurate

## Test Results

### Date Tested: _______________
### Tester: _______________
### Platform: _______________
### Version: _______________

### Pass Rate: _____ / _____ (___%)

### Critical Issues Found:
1. 
2. 
3. 

### Minor Issues Found:
1. 
2. 
3. 

### Notes:


### Sign-off:
- [ ] All critical features working
- [ ] No blocking bugs
- [ ] Ready for release

**Tester Signature**: _______________
**Date**: _______________
