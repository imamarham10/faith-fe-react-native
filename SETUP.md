# Setup Instructions

## Prerequisites

1. **Node.js** (>= 18) - [Download](https://nodejs.org/)
2. **React Native CLI** - Already included in package.json
3. **For iOS Development:**
   - macOS with **Xcode** installed from App Store (REQUIRED)
   - **Ruby 3.0+** (use rbenv: `brew install rbenv ruby-build`)
   - **CocoaPods**: `gem install cocoapods` (after Ruby is set up)
4. **For Android Development:**
   - Android Studio installed
   - Android SDK configured

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. iOS Setup

#### Install Xcode (REQUIRED)
1. Open the **App Store** on your Mac
2. Search for "Xcode"
3. Install Xcode (this is a large download, ~15GB)
4. After installation, open Xcode once to accept the license agreement
5. Set Xcode as the active developer directory:
   ```bash
   sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
   ```

#### Install Ruby 3.0+ (if needed)
If you have an older Ruby version (< 3.0):
```bash
# Install rbenv (Ruby version manager)
brew install rbenv ruby-build

# Add rbenv to your shell (add to ~/.zshrc)
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
eval "$(rbenv init - zsh)"

# Install Ruby 3.3.6
rbenv install 3.3.6
rbenv global 3.3.6

# Verify
ruby --version  # Should show 3.3.6 or higher
```

#### Install CocoaPods
```bash
gem install cocoapods
```

#### Install iOS Dependencies
```bash
cd ios
pod install
cd ..
```

**Note:** You must have Xcode installed before running `pod install`.

### 3. Run the App

#### iOS
```bash
npm run ios
```

Or open in Xcode:
```bash
cd ios
open Faith.xcodeproj
```

#### Android
```bash
npm run android
```

Make sure you have an Android emulator running or a device connected.

## Troubleshooting

### CocoaPods Issues

If `pod install` fails:
1. Make sure CocoaPods is installed: `pod --version`
2. Update CocoaPods: `sudo gem install cocoapods`
3. Clear CocoaPods cache: `pod cache clean --all`
4. Try again: `cd ios && pod install`

### Metro Bundler

If Metro bundler has issues:
```bash
npm start -- --reset-cache
```

### Clean Build

**iOS:**
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

**Android:**
```bash
cd android
./gradlew clean
cd ..
```

## Project Structure

- `src/` - All source code
- `ios/` - iOS native project
- `android/` - Android native project
- `config/` - Configuration files

## Next Steps

1. Install dependencies: `npm install`
2. Set up iOS: `cd ios && pod install && cd ..`
3. Start Metro: `npm start`
4. Run on device: `npm run ios` or `npm run android`
