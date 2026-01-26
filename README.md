# Faith - React Native App

A spiritual companion app built with React Native, providing personalized daily content for multiple faiths.

## Project Structure

```
faith-fe-react-native/
├── src/
│   ├── assets/           # Images, fonts, and other static assets
│   │   ├── images/
│   │   └── fonts/
│   ├── components/       # Reusable UI components
│   │   └── common/        # Common components (Button, Card, Text, etc.)
│   ├── constants/        # App-wide constants (colors, sizes, API endpoints)
│   ├── context/          # React Context providers
│   ├── hooks/            # Custom React hooks
│   ├── navigation/       # Navigation configuration
│   ├── screens/          # Screen components
│   ├── services/         # API services and external integrations
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── config/               # Configuration files
├── App.tsx               # Main application component
├── index.js              # Entry point
└── package.json          # Dependencies and scripts
```

## Naming Conventions

### Files and Folders
- **Components**: PascalCase (e.g., `Button.tsx`, `HomeScreen.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`, `validation.ts`)
- **Constants**: camelCase files, UPPER_SNAKE_CASE for values (e.g., `API_BASE_URL`)
- **Hooks**: camelCase with "use" prefix (e.g., `useAuth.ts`)
- **Types**: camelCase (e.g., `index.ts` in types folder)
- **Services**: camelCase (e.g., `apiClient.ts`, `contentService.ts`)

### Code Style
- **Components**: PascalCase (e.g., `const Button: React.FC`)
- **Functions**: camelCase (e.g., `const formatDate = () => {}`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `const API_BASE_URL = '...'`)
- **Types/Interfaces**: PascalCase (e.g., `interface User`, `type FaithType`)

## Getting Started

### Prerequisites
- Node.js >= 18
- React Native development environment set up
- iOS: Xcode (for Mac)
- Android: Android Studio

### Installation

1. Install dependencies:
```bash
npm install
```

2. For iOS (Mac only):
```bash
cd ios && pod install && cd ..
```

3. Start Metro bundler:
```bash
npm start
```

4. Run on iOS:
```bash
npm run ios
```

5. Run on Android:
```bash
npm run android
```

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier

## Project Features

- ✅ TypeScript for type safety
- ✅ ESLint + Prettier for code quality
- ✅ React Navigation for routing
- ✅ Path aliases for clean imports
- ✅ Organized folder structure
- ✅ Reusable component library
- ✅ Service layer for API calls
- ✅ Custom hooks for shared logic
- ✅ Centralized constants and types

## Development Guidelines

1. **Components**: Create reusable components in `src/components/common/`
2. **Screens**: Add new screens in `src/screens/`
3. **Services**: Add API services in `src/services/`
4. **Types**: Define types in `src/types/`
5. **Constants**: Add constants in `src/constants/`
6. **Hooks**: Create custom hooks in `src/hooks/`

## Path Aliases

The project uses path aliases for cleaner imports:

```typescript
import {Button} from '@components';
import {HomeScreen} from '@screens';
import {Colors, Sizes} from '@constants';
import {useAuth} from '@hooks';
import {formatDate} from '@utils';
import {User} from '@types';
```

## License

Private - All rights reserved
