# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Run Commands
- `npm start` or `expo start`: Start the development server
- `npm run ios`: Run on iOS simulator
- `npm run android`: Run on Android emulator
- `npm run web`: Run in web browser

## Code Style Guidelines
- **Types**: Use strict TypeScript typing, no `any` allowed
- **Imports**: Group and sort imports (React, third-party, local)
- **Naming**: Use PascalCase for components, camelCase for variables/functions
- **Error Handling**: Use explicit error handling with typed errors
- **Components**: Follow React Native best practices with functional components
- **Formatting**: Use consistent indentation (2 spaces) and line endings
- **Testing**: When implemented, use appropriate testing framework with proper mocking
- **Documentation**: Document components with JSDoc comments explaining purpose

## Development Philosophy
All code should follow the principles outlined in `docs/DEVELOPMENT_PHILOSOPHY.md`:
- Simplicity first
- Modular architecture
- Design for testability
- Explicit over implicit
- Self-documenting code