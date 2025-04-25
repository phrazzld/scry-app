# Scry App - MVP Frontend Backlog

This backlog outlines the major work items required to build the Minimum Viable Product (MVP) for the Scry React Native mobile application. Items should generally be tackled in order, with each item potentially breaking down into a more detailed plan and subsequent tasks.

- **1. Project Setup:**

  - Initialize React Native project using Expo (with TypeScript template).
  - Set up basic project structure (`screens`, `components`, `services`, `store`, `navigation`, etc.).
  - Configure linting/formatting tools (ESLint, Prettier).

- **2. Navigation Setup:**

  - Install and configure React Navigation.
  - Define stack navigators for Authentication flow (Login, Register) and Main App flow (ReviewScreen).
  - Implement logic to switch between navigators based on authentication status.

- **3. State Management Setup:**

  - Install and configure state management library (e.g., Zustand).
  - Define initial stores/slices for Authentication state (token, user status) and potentially core Review state (e.g., loading status).

- **4. API Client Setup:**

  - Install API client library (e.g., Axios).
  - Implement `ApiClient` service wrapper.
  - Configure base URL and default headers.
  - Implement logic to automatically attach Auth token (JWT) to relevant requests.
  - Implement basic error handling/mapping for API responses.

- **5. Authentication UI & Logic:**

  - Implement `LoginScreen` UI components (email/password inputs, submit button, link to register).
  - Implement `RegisterScreen` UI components.
  - Integrate `LoginScreen` with `POST /auth/login` API call via `ApiClient`. Handle success (store token, update auth state, navigate to Main App) and errors (display messages).
  - Integrate `RegisterScreen` with `POST /auth/register` API call. Handle success/errors.
  - Implement secure storage for the authentication token on the device (e.g., `expo-secure-store`).
  - Implement logic on app startup to check for stored token and validate auth status.

- **6. Core Review Screen & Card Fetching:**

  - Implement basic layout for `ReviewScreen`.
  - Integrate with `GET /cards/next` API call to fetch the first/next Card on screen load/previous card completion.
  - Handle loading state while fetching.
  - Handle empty state when API returns 204 No Content (display appropriate message).
  - Integrate fetched Card data with the `CardView` component.

- **7. Card Component Implementation (`CardView` - MC):**

  - Create `CardView` component.
  - Implement rendering logic for Multiple Choice card content (question text, list of choices).
  - Implement tap handling for selecting an answer choice.
  - Implement immediate visual feedback for selection.
  - Integrate with `POST /cards/{id}/answer` API call upon answer selection.
  - Implement visual feedback for correctness based on API response or predicted outcome.
  - Trigger fetching of the next card after interaction completes.

- **8. Card Action Implementations:**

  - Add unobtrusive UI elements (Icons/Buttons) to `ReviewScreen`/`CardView` for Edit, Delete, Postpone actions.
  - **Edit Flow:**
    - Implement `EditCardModal` UI (inputs pre-filled with card data).
    - Integrate Edit button tap to show the modal.
    - Integrate modal's Save action with `PUT /cards/{id}` API call. Update UI optimistically or on success.
  - **Delete Flow:**
    - Implement confirmation dialog component.
    - Integrate Delete button tap to show confirmation.
    - Integrate confirmation with `DELETE /cards/{id}` API call. Trigger fetching next card on success.
  - **Postpone Flow:**
    - Integrate Postpone button tap with `POST /cards/{id}/postpone` API call. Trigger fetching next card on success.

- **9. Memo Input Implementation:**

  - Implement persistent "Add Memo" button/entry point on `ReviewScreen`.
  - Implement `MemoInputModal` UI (multi-line text input, submit button).
  - Integrate modal's Submit action with `POST /memos` API call.
  - Implement UI feedback for submission (loading indicator, success/error message via toast/indicator).
  - Ensure modal dismissal returns user seamlessly to `ReviewScreen`.

- **10. UI Polish & Core Animations:**

  - Install and configure `Reanimated`.
  - Implement smooth transition animation between Cards on the `ReviewScreen`.
  - Ensure consistent styling and basic visual theme.
  - Refine layout and interactions for intuitiveness ("Simple UI").

- **11. Basic Testing:**

  - Set up testing environment (e.g., Jest, React Native Testing Library).
  - Write basic tests for key components and utility functions.

- **12. Build & Distribution Setup (Initial):**
  - Configure build process using Expo Application Services (EAS Build).
  - Set up internal distribution builds for testing (TestFlight, Android Internal Testing).
