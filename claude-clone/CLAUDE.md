# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Claude chat clone built as a learning project for React + TypeScript + Vite. It demonstrates a basic chat interface with message history and simulated responses.

## Development Commands

```bash
# Start development server with hot module replacement
npm run dev

# Build for production (runs TypeScript compiler then Vite build)
npm run build

# Lint the codebase
npm run lint

# Preview production build locally
npm run preview
```

## Architecture

### Component Structure

The application follows a simple component hierarchy:

- **App.tsx** - Root component that renders the MessageList
- **MessageList.tsx** - Main container managing chat state, message display, and input handling
  - Maintains messages array with `useState`
  - Handles user input and simulates assistant responses (1s delay)
  - Contains the header, scrollable message area, and input controls
- **ChatMessage.tsx** - Presentational component for individual messages
  - Receives message data and isUser flag as props
  - Applies conditional styling based on message sender

### State Management

All state is managed locally in MessageList.tsx using React hooks:
- `messages`: Array of Message objects (`{id, content, isUser}`)
- `inputValue`: Current textarea content

### Styling

The project uses Tailwind CSS v4 via the Vite plugin (`@tailwindcss/vite`). Styles are utility-first with no custom CSS classes beyond component-scoped utilities.

### TypeScript Configuration

The project uses strict TypeScript with:
- Bundler module resolution
- `react-jsx` for JSX transform
- Strict linting enabled (`noUnusedLocals`, `noUnusedParameters`)
- Split configs: `tsconfig.app.json` for src code, `tsconfig.node.json` for Vite config

## Key Implementation Details

### Message Handling

New messages are added to the messages array when the user clicks Send or presses Enter (Shift+Enter for new line). The simulated assistant response uses `setTimeout` with a 1-second delay and appends to the previous state using the functional setState pattern.

### Auto-scroll Behavior

Currently not implemented - messages do not auto-scroll to bottom on new additions. This would need to be added using a ref and `scrollIntoView`.
