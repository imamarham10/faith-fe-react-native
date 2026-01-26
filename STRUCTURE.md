# Project Structure Guide

This document provides a detailed overview of the project structure and naming conventions.

## Directory Structure

```
faith-fe-react-native/
├── src/                          # Source code directory
│   ├── assets/                   # Static assets
│   │   ├── images/               # Image files
│   │   └── fonts/                # Custom font files
│   │
│   ├── components/               # Reusable UI components
│   │   ├── common/               # Common/shared components
│   │   │   ├── Button/          # Button component
│   │   │   │   ├── Button.tsx   # Component implementation
│   │   │   │   └── index.ts     # Barrel export
│   │   │   ├── Card/            # Card component
│   │   │   ├── Text/            # Text component
│   │   │   └── index.ts         # Common components export
│   │   └── index.ts             # All components export
│   │
│   ├── screens/                  # Screen components (full pages)
│   │   ├── HomeScreen/
│   │   │   ├── HomeScreen.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── navigation/               # Navigation configuration
│   │   ├── RootNavigator.tsx     # Main navigation setup
│   │   └── index.ts
│   │
│   ├── services/                 # API and external services
│   │   ├── apiClient.ts          # HTTP client
│   │   ├── contentService.ts     # Content API service
│   │   └── index.ts
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.ts
│   │   └── index.ts
│   │
│   ├── utils/                    # Utility functions
│   │   ├── formatDate.ts
│   │   ├── validation.ts
│   │   └── index.ts
│   │
│   ├── constants/                # App-wide constants
│   │   ├── colors.ts             # Color definitions
│   │   ├── sizes.ts              # Size/spacing constants
│   │   └── index.ts              # API endpoints, storage keys, etc.
│   │
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts
│   │
│   └── context/                  # React Context providers
│
├── config/                       # Configuration files
│   └── app.config.ts             # App configuration
│
├── App.tsx                       # Main app component
├── index.js                      # Entry point
└── package.json                  # Dependencies
```

## Naming Conventions

### Files and Folders

| Type | Convention | Example |
|------|-----------|---------|
| **Components** | PascalCase | `Button.tsx`, `HomeScreen.tsx` |
| **Utilities** | camelCase | `formatDate.ts`, `validation.ts` |
| **Services** | camelCase | `apiClient.ts`, `contentService.ts` |
| **Hooks** | camelCase with "use" prefix | `useAuth.ts`, `useContent.ts` |
| **Types** | camelCase (file), PascalCase (types) | `index.ts` (contains `User`, `DailyContent`) |
| **Constants** | camelCase (file), UPPER_SNAKE_CASE (values) | `colors.ts` (contains `Colors.primary`) |
| **Folders** | camelCase or PascalCase | `components/`, `HomeScreen/` |

### Code Style

| Element | Convention | Example |
|---------|-----------|---------|
| **Component Names** | PascalCase | `const Button: React.FC` |
| **Function Names** | camelCase | `const formatDate = () => {}` |
| **Variable Names** | camelCase | `const userName = 'John'` |
| **Constants** | UPPER_SNAKE_CASE | `const API_BASE_URL = '...'` |
| **Type/Interface** | PascalCase | `interface User`, `type FaithType` |
| **Props Interface** | ComponentName + Props | `ButtonProps`, `HomeScreenProps` |

## Import Path Aliases

Use path aliases for cleaner imports:

```typescript
// ✅ Good - Using aliases
import {Button} from '@components';
import {HomeScreen} from '@screens';
import {Colors, Sizes} from '@constants';
import {useAuth} from '@hooks';
import {formatDate} from '@utils';
import {User} from '@types';

// ❌ Bad - Relative paths
import {Button} from '../../../components/common/Button';
```

## Component Organization

### Component Structure

Each component should follow this structure:

```
ComponentName/
├── ComponentName.tsx    # Main component file
├── ComponentName.test.tsx  # Tests (optional)
├── ComponentName.stories.tsx  # Storybook (optional)
└── index.ts             # Barrel export
```

### Component Example

```typescript
/**
 * ComponentName Component
 * Brief description of what the component does
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BaseComponentProps} from '@types';

export interface ComponentNameProps extends BaseComponentProps {
  // Props definition
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  // Destructured props
}) => {
  return (
    <View>
      {/* Component JSX */}
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles
});
```

## Best Practices

1. **Barrel Exports**: Always use `index.ts` files for clean imports
2. **Type Safety**: Use TypeScript for all new files
3. **Component Props**: Extend `BaseComponentProps` for consistency
4. **Constants**: Centralize colors, sizes, and other constants
5. **Services**: Keep API logic in service files, not components
6. **Hooks**: Extract reusable logic into custom hooks
7. **Naming**: Be descriptive and consistent
8. **File Organization**: One component/function per file

## Adding New Features

### Adding a New Screen

1. Create folder: `src/screens/NewScreen/`
2. Create component: `NewScreen.tsx`
3. Create barrel export: `index.ts`
4. Add to navigation: `src/navigation/RootNavigator.tsx`
5. Export from: `src/screens/index.ts`

### Adding a New Component

1. Create folder: `src/components/common/NewComponent/`
2. Create component: `NewComponent.tsx`
3. Create barrel export: `index.ts`
4. Export from: `src/components/common/index.ts`

### Adding a New Service

1. Create file: `src/services/newService.ts`
2. Export from: `src/services/index.ts`
3. Use `apiClient` for HTTP requests

### Adding a New Hook

1. Create file: `src/hooks/useNewHook.ts`
2. Export from: `src/hooks/index.ts`
3. Follow naming: `use` prefix
