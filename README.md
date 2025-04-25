# Scry

Scry is a modern, elegant flashcard application built with React Native. It serves as an intelligent cognitive extension, helping users remember and synthesize knowledge through a clean, minimalist interface.

![Scry App](assets/icon.png)

## Features

- **Intelligent flashcards** with multiple-choice questions
- **Clean, modernist interface** following an 8pt grid system
- **Smooth animations** for card transitions and interactions
- **Memory tracking** to optimize learning and review
- **Note-taking** for insights during review sessions

## Technology Stack

- **React Native** with TypeScript
- **Expo** for cross-platform development
- **Zustand** for state management
- **Moti/Reanimated** for fluid animations
- **Styled Components** for component styling
- **React Navigation** for screen management

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/scry-app.git
cd scry-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Verify installation**

```bash
npm ls react react-dom styled-components
```

## Running the App

### Development Mode

```bash
# Start the development server
npm start
```

This will launch the Expo development server, giving you options to run the app on different platforms.

### iOS Simulator

```bash
# Run on iOS simulator
npm run ios
```

Requires Xcode and iOS simulator installed on macOS.

### Android Emulator

```bash
# Run on Android emulator
npm run android
```

Requires Android Studio and an Android emulator configured.

### Physical Device

Scan the QR code displayed in the terminal with the Expo Go app (available on iOS and Android).

## Project Structure

```
scry-app/
├── assets/                # Icons, images, and fonts
├── src/
│   ├── api/               # Mock API and data
│   ├── components/        # UI components
│   │   ├── core/          # Basic UI building blocks
│   │   └── features/      # Complex feature components
│   ├── hooks/             # Custom React hooks
│   ├── navigation/        # Navigation configuration
│   ├── screens/           # App screens
│   ├── store/             # Zustand state management
│   ├── theme/             # Styling and theming
│   └── types/             # TypeScript type definitions
```

## Design Philosophy

Scry follows a high modernist design language, with a focus on:

- **Clarity above all** — Every element exists to enhance understanding
- **Form is function** — The structure is the style
- **Trust the grid** — Consistent alignment and rhythm
- **Visual silence** — Strategic use of whitespace

For more details, see [AESTHETIC.md](AESTHETIC.md).

## Development Scripts

- `npm start`: Start the Expo development server
- `npm run ios`: Run on iOS simulator
- `npm run android`: Run on Android simulator
- `npm run web`: Run in web browser
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Fix linting issues
- `npm run format`: Format code with Prettier
- `npm run format:check`: Check code formatting

## License

[MIT](LICENSE)