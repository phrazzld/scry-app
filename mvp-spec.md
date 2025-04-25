# Scry App - Frontend Engineering Plan & MVP Specifications

**Repository:** `scry-app` (React Native Frontend)
**Version:** 1.0-MVP
**Date:** 2025-04-13
**Status:** Final MVP Plan

## 1. Overview / Introduction

### 1.1. Vision & Goal

To create the most effortless and effective mobile interface for users to remember the things they care about. (MVP Focus: Implement the core review loop UI, Memo input, and interaction with the Scry backend API).

### 1.2. Problem Statement

Existing SRS mobile apps often have clunky UIs and high interaction friction.

### 1.3. Solution Overview (MVP Frontend)

The Scry React Native app provides a mobile-first interface focused on a continuous stream of **Cards** for review. It allows users to input **Memos**, handles user interactions during review (answering, editing, deleting, postponing Cards), and communicates with the Scry Go backend API for data persistence, AI processing triggers, and fetching review content.

### 1.4. Core Principles (MVP Frontend Focus)

- **Minimal Friction:** Streamlined navigation, immediate core loop engagement.
- **Smooth UX:** Fluid transitions, responsive interactions, polished animations.
- **Simple UI:** Clean presentation of Cards, unobtrusive access to actions.
- **Mobile-First:** Design and implementation optimized for iOS and Android.
- **Responsiveness:** Maintain UI responsiveness even during background API activity.

## 2. Target Audience (MVP Focus)

- Early adopters testing the core mobile SRS experience.
- Users prioritizing a clean, simple mobile interface for learning.

## 3. Key Terminology (MVP)

- **Scry:** The overall application brand.
- **Memo:** User-provided text input describing what to remember. Captured via the app interface.
- **Card:** A single learning unit (MVP: Multiple Choice) displayed for review. Fetched from the API.
- **Review / Flow:** The primary screen/activity displaying a continuous stream of Cards.

## 4. Core User Experience & Flows (MVP Frontend)

### 4.1. App Launch & Continuous Review Flow

1.  User opens app. App checks auth state. If logged out, show Login/Register screen. If logged in, proceed.
2.  App immediately navigates to `ReviewScreen` and requests the next Card from the API (`GET /cards/next`).
3.  `ReviewScreen` displays the received Card content using `CardView`.
4.  User interacts with `CardView` (e.g., taps MC answer).
5.  App sends answer to API (`POST /cards/{id}/answer`).
6.  `CardView` provides immediate visual feedback based on anticipated outcome or waits for API confirmation if necessary.
7.  Upon confirmation/completion, app requests the next Card (`GET /cards/next`) and smoothly transitions the `CardView` presentation (e.g., slide/fade animation).
8.  This loop is the default state of the `ReviewScreen`.

### 4.2. Memo Capture Flow (MVP)

1.  User taps "Add Memo" button (persistently visible but unobtrusive on `ReviewScreen`).
2.  `MemoInputModal` appears (overlay/modal screen). Contains multi-line text input and "Submit" button.
3.  User types Memo, taps "Submit".
4.  App POSTs Memo text to API (`POST /memos`). Input field disabled/loading state shown.
5.  Upon receiving successful API response (e.g., 202 Accepted), display transient success message (e.g., "Memo added! Generating cards...").
6.  Dismiss `MemoInputModal` and return user to the `ReviewScreen`.

### 4.3. Review Interaction Flow (UI/Actions - MVP)

1.  On `CardView` within `ReviewScreen`:
    - **Answering (MC):** Tap detection on answer choices. Visual state change for selected/correct/incorrect states. Trigger API call `POST /cards/{id}/answer`.
    - **Editing:** Tap "Edit" icon. Present `EditCardModal` pre-filled with current Card text content. Allow text changes. On Save, call `PUT /cards/{id}` with updated content. Update local Card view or refetch. Dismiss modal.
    - **Deleting:** Tap "Delete" icon. Show confirmation dialog. If confirmed, call `DELETE /cards/{id}`. Remove Card from local view/queue. Fetch next card.
    - **Postponing:** Tap "Postpone" icon. Call `POST /cards/{id}/postpone`. Trigger transition to next card immediately.

## 5. Functional Requirements (MVP Frontend)

- **FR1-Auth:** Implement screens for user Email/Password Registration and Login, interfacing with `POST /auth/register` and `POST /auth/login`. Securely store auth tokens (e.g., JWT) in device storage. Handle authenticated/unauthenticated states.
- **FR2-Memo Input UI:** Provide a modal/screen with a multi-line text input and submit button for creating Memos. Interface with `POST /memos`. Handle loading/success/error states.
- **FR3-Review Screen:** Implement the main screen displaying one Card at a time (`CardView`). Fetch next Card via `GET /cards/next`. Handle empty state (no cards to review).
- **FR4-Card View (MC):** Component to display MC Card content (question, choices). Handle answer selection input. Display immediate correctness feedback.
- **FR5-Card Actions UI:** Provide clear, accessible UI elements (e.g., icons) on/near the `CardView` to trigger Edit, Delete, and Postpone actions.
- **FR6-Edit Card UI:** Implement a modal/screen allowing text editing of Card fields. Interface with `PUT /cards/{id}`.
- **FR7-Delete Confirmation:** Implement a confirmation dialog before executing Card deletion via `DELETE /cards/{id}`.
- **FR8-API Integration:** Implement API client to communicate with the backend Go API (handle requests, responses, errors, authentication headers).
- **FR9-State Management:** Manage application state including user session, current Card data, review queue state (minimal), UI loading/error states.

## 6. Non-Functional Requirements (NFRs - MVP Frontend Focus)

- **NFR1: Performance:** App startup < 2s. Smooth Card transitions (60fps, < 300ms). Optimize rendering performance of `CardView`.
- **NFR2: Responsiveness:** UI must remain interactive during API calls (show loading indicators). No blocking operations on the main thread.
- **NFR3: Platform Consistency:** Provide a reasonably consistent look and feel on both iOS and Android, adhering to platform interaction guidelines where appropriate.
- **NFR4: Usability:** Interface must be highly intuitive, especially the core review loop and Memo input. Minimal onboarding needed for core functions.
- **NFR5: Accessibility:** Basic accessibility support (e.g., tappable areas, font scaling considerations).
- **NFR6: Error Handling:** Display user-friendly error messages for API failures or input validation issues. Graceful handling of network connectivity issues.
- **NFR7: Offline Support (Minimal MVP):** App should handle temporary network loss gracefully (e.g., indicate offline, potentially allow reviewing already fetched cards if queueing implemented - likely defer).

## 7. Frontend Architecture (React Native - MVP)

- **Language:** TypeScript
- **Core Libraries:** React Native (latest stable), Expo (for simplified development/build), React Navigation, State Management (Zustand recommended for simplicity, or Redux Toolkit), API Client (Axios or TanStack Query), Reanimated (for smooth animations).
- **Directory Structure:** Organize by features (`screens/`, `components/`, `store/`, `services/`, `hooks/`, `navigation/`, `theme/`, `assets/`).
- **Key Components:** `ReviewScreen`, `AuthScreen`, `CardView`, `MemoInputModal`, `EditCardModal`, `AppNavigator`, `ApiClient`.
- **State Management:** Global store for user auth, potentially minimal Card queue state. Local component state for UI interactions. TanStack Query can manage server state cache.
- **Navigation:** Stack navigator for Auth vs. Main App flow. Core review loop might not involve navigation changes, just state updates within `ReviewScreen`. Modals for input/editing.

## 8. API Interaction Points (Frontend Perspective)

The frontend will primarily interact with the following backend endpoints:

- `POST /auth/register`
- `POST /auth/login`
- `POST /memos`
- `GET /cards/next`
- `POST /cards/{id}/answer`
- `PUT /cards/{id}`
- `DELETE /cards/{id}`
- `POST /cards/{id}/postpone`

## 9. MVP Feature Specifications (Frontend - Examples)

- **Spec-FE-1: Display Next Card:** `ReviewScreen` fetches data from `GET /cards/next`. On success, updates state with Card data, triggering re-render of `CardView`. Handles loading state during fetch. Handles 204 No Content (displays empty state message).
- **Spec-FE-2: MC Answer Submission:** `CardView` detects tap on a choice. Updates UI state to show selection. Calls `apiClient.postAnswer(cardId, selectedIndex)`. On API success, shows correct/incorrect feedback. Triggers fetch for next card. Handles API errors.
- **Spec-FE-3: Memo Input Modal:** Button on `ReviewScreen` toggles modal visibility. Modal contains `TextInput` and `Button`. On Submit, calls `apiClient.postMemo(memoText)`. Disables button/shows spinner during API call. Shows toast/indicator on success. Closes modal. Handles errors.

## 10. Naming Conventions (Frontend)

- **Components:** PascalCase (`CardView.tsx`)
- **Variables/Functions:** camelCase
- **Types/Interfaces:** PascalCase
- **Files:** PascalCase for components, camelCase for hooks/services.

## 11. Success Metrics (Frontend Related)

- App Store Ratings & Reviews
- App Crash Rate (via monitoring service)
- Session Duration & Frequency
- UI Responsiveness / Performance metrics (if measured)
- User feedback on UI/UX simplicity and smoothness.
