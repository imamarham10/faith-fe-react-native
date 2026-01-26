# Working with React Native in Cursor IDE

## ✅ Yes, Cursor IDE Works Perfectly with React Native!

Cursor IDE (based on VS Code) is an excellent choice for React Native development. You can write, edit, and manage all your React Native code in Cursor.

## How It Works

### Development Workflow

1. **Edit Code in Cursor** ✏️
   - Write TypeScript/JavaScript code
   - Edit React Native components
   - Manage project structure
   - Use IntelliSense, autocomplete, and debugging

2. **Run App on Simulator/Emulator** 📱
   - iOS: Use Xcode Simulator or physical device
   - Android: Use Android Studio Emulator or physical device
   - Metro bundler runs in terminal (or integrated terminal in Cursor)

3. **Hot Reload** 🔥
   - Changes in Cursor automatically reflect in the running app
   - No need to rebuild - just save and see changes instantly

## What You Can Do in Cursor

✅ **Code Editing**
- Full TypeScript/JavaScript support
- React Native component development
- Navigation setup
- Service layer (API calls)
- State management
- Custom hooks

✅ **Debugging**
- Set breakpoints
- Inspect variables
- Step through code
- Debug both JavaScript and native code

✅ **IntelliSense**
- Autocomplete for React Native APIs
- Type checking with TypeScript
- Import suggestions
- Code navigation

✅ **Git Integration**
- Version control
- Commit, push, pull
- Branch management

## What Runs Outside Cursor

❌ **App Execution**
- iOS Simulator (runs via Xcode)
- Android Emulator (runs via Android Studio)
- Physical devices (connected via USB)

❌ **Metro Bundler**
- Runs in terminal (can use Cursor's integrated terminal)
- Bundles JavaScript code
- Serves to simulators/emulators

## Typical Workflow

### 1. Start Development Session

```bash
# Terminal 1: Start Metro bundler
npm start

# Terminal 2: Run on iOS
npm run ios

# OR Terminal 2: Run on Android
npm run android
```

### 2. Edit Code in Cursor

- Open any file in `src/`
- Make changes
- Save (Cmd+S / Ctrl+S)
- See changes instantly in simulator/emulator (Hot Reload)

### 3. Debug Issues

- Set breakpoints in Cursor
- Use debugger panel
- Inspect variables and call stack

## Cursor-Specific Features

### AI-Powered Development
- Cursor's AI can help write React Native code
- Generate components, hooks, services
- Explain code, fix bugs
- Refactor code

### Integrated Terminal
- Open terminal in Cursor (View → Terminal)
- Run npm commands
- Start Metro bundler
- Run build commands

### File Explorer
- Navigate project structure
- Create new files/folders
- Search files quickly

## Recommended Setup

### 1. Install Extensions (if not already installed)

Cursor should prompt you, or install manually:
- **Prettier** - Code formatting
- **ESLint** - Code linting
- **TypeScript** - Type checking

### 2. Use Integrated Terminal

- View → Terminal (or `` Ctrl+` ``)
- Run all npm/react-native commands here

### 3. Enable Auto-Save

- File → Auto Save (optional, but helpful)

## Project Structure in Cursor

```
faith-fe-react-native/
├── src/              ← Edit your code here
│   ├── components/   ← React components
│   ├── screens/      ← Screen components
│   ├── navigation/   ← Navigation setup
│   ├── services/     ← API services
│   └── ...
├── ios/              ← Native iOS code (usually don't edit)
├── android/          ← Native Android code (usually don't edit)
└── App.tsx           ← Main app entry point
```

## Tips for Best Experience

1. **Use Path Aliases**: Import using `@components`, `@screens`, etc.
2. **TypeScript**: Get full type checking and IntelliSense
3. **ESLint**: Catch errors before runtime
4. **Prettier**: Auto-format on save
5. **Git Integration**: Commit frequently from Cursor

## Running the App

### Option 1: Command Line (Recommended)
```bash
# In Cursor's integrated terminal
npm start          # Start Metro
npm run ios        # Run iOS (in another terminal)
npm run android    # Run Android (in another terminal)
```

### Option 2: Debug Panel
- Use `.vscode/launch.json` configurations
- Press F5 to start debugging
- Select "Debug Android" or "Debug iOS"

## Troubleshooting

### Metro Bundler Not Starting
- Check if port 8081 is available
- Run `npm start -- --reset-cache`

### Changes Not Reflecting
- Make sure Metro bundler is running
- Check if Hot Reload is enabled
- Try manual reload: Cmd+R (iOS) or R+R (Android)

### TypeScript Errors
- Run `npm run type-check` to see all errors
- Make sure `tsconfig.json` is configured correctly

## Summary

✅ **Cursor IDE is perfect for React Native development!**

- Edit all your code in Cursor
- Use terminal for running commands
- App runs in simulators/emulators
- Hot reload connects everything together
- Full debugging and IntelliSense support

You're all set! Start coding in Cursor and see your changes live in the app! 🚀
