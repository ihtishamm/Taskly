# Taskly Project

## Description

Taskly is a comprehensive task management application designed to help users efficiently manage their daily tasks and shopping lists. It is a React Native application built using Expo Go, providing a user-friendly interface for organizing tasks, setting time segments, and managing shopping items.

## Features

- **Task Management**: Create, update, and delete tasks with ease.
- **Time Segments**: Organize your day by setting specific time segments for tasks.
- **Shopping List**: Manage your shopping items with a dedicated component.
- **Push Notifications**: Stay updated with task reminders and notifications.

## Technologies Used

- **React Native**: For building the mobile application.
- **Expo Go**: For developing and testing the application.
- **TypeScript**: For type-safe JavaScript development.
- **Expo**: For handling push notifications.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd taskly`
3. Install dependencies: `npm install`

## Usage

To start the project, run:

```
npm start
```

This will launch the application in development mode.

## Folder Structure

- **app/**: Contains the main application files.
  - `index.tsx`: Entry point of the application.
  - `_layout.tsx`: Layout configuration.
  - `idea.tsx`: Idea component.
- **components/**: Contains reusable components.
  - `TimeSegment.tsx`: Manages time segments.
  - `ShoppingListItem.tsx`: Manages shopping list items.
- **utils/**: Contains utility functions.
  - `registerForPushNotificationsAsync.ts`: Handles push notifications.
  - `storage.ts`: Manages local storage.

## Components and Utilities

- **TimeSegment.tsx**: A component for managing and displaying time segments.
- **ShoppingListItem.tsx**: A component for managing individual shopping list items.
- **registerForPushNotificationsAsync.ts**: A utility for registering push notifications.
- **storage.ts**: A utility for handling local storage operations.

## Screenshots

![Taskly Screenshot](path/to/screenshot.png)

## API Documentation

- **Push Notifications API**: Used for sending and receiving push notifications.

## FAQ

**Q: How do I reset my password?**
A: Go to the settings page and click on 'Reset Password'.

**Q: How can I contribute to the project?**
A: Follow the contributing guidelines below.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
