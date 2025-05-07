# Feature Voting Application

A real-time feature voting platform built with React, TypeScript, and Tailwind CSS. Users can submit feature requests and vote on them, with automatic closing of voting periods.

## Features

- 🔐 **User Authentication**
  - Email-based registration with verification
  - Secure login/logout functionality
  - Mock authentication system for testing

- 📝 **Feature Management**
  - Create new feature requests
  - Real-time vote tracking
  - Automatic closing of voting periods (1 hour)
  - Sort features by vote count

- 🎨 **Modern UI**
  - Clean, responsive design
  - Real-time updates
  - Status indicators for open/closed features
  - Remaining time display

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Testing the Application

### Test Accounts

The following mock accounts are available for testing:

```
Email: john@example.com
Password: password123

Email: jane@example.com
Password: password123

Email: bob@example.com
Password: password123
```

### Testing Registration Flow

1. Click "Sign Up" in the header
2. Enter your email and password
3. Submit the form
4. Check the browser console for the confirmation code
5. Enter the code in the verification form
6. You'll be automatically logged in upon successful verification

### Testing Features

1. Log in using one of the test accounts
2. Create a new feature request using the form at the top
3. Vote on existing features using the "Vote" button
4. Watch the countdown timer for each feature
5. Features automatically close after 1 hour
6. Features are sorted by vote count

## Project Structure

```
src/
├── components/         # React components
│   ├── menu/          # Authentication menu components
│   └── ui/            # Reusable UI components
├── context/           # React context providers
├── hooks/             # Custom React hooks
└── types/             # TypeScript type definitions
```

## Technical Details

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **UI Components**: Headless UI
- **Icons**: Lucide React

## Development Notes

- The authentication system is mocked for demonstration purposes
- Voting data is stored in memory and resets on page refresh
- Feature status updates are checked every second
- All dates and times are handled in ISO format
