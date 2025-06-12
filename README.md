# CheckMate: A React.js and Tailwind CSS Task Manager

This is a responsive task manager application built with React.js and styled with Tailwind CSS. The project demonstrates a modern frontend architecture, including reusable components, state management with hooks, API integration, and a theme switcher for light/dark modes.

## Live Demo

[View Live Demo](https://cheery-arithmetic-cdc83d.netlify.app)

## Screenshots

### Home Page
![Home Page](/screenshots/homepage.jpg)

### Tasks Page
![Tasks Page](/screenshots/tasks.jpg)

### API Data Page
![API Data Page](/screenshots/apidata.jpg)



## Features

- **Component-Based Architecture**: The application is built with a clean, modular structure using reusable components like `Button`, `Card`, and `Layout`.
- **State Management with Hooks**: State is managed efficiently using React hooks, including `useState`, `useEffect`, and custom hooks for localStorage and API calls.
- **Task Management**: A full-featured task manager that allows users to add, toggle, delete, and filter tasks. All tasks are persisted in the browser's localStorage.
- **API Integration**: Fetches and displays user data from the JSONPlaceholder API, with states for loading and errors, plus search and pagination features.
- **Routing**: The application uses `react-router-dom` for seamless navigation between the Home, Tasks, and API Data pages.
- **Styling with Tailwind CSS**: The entire application is styled with Tailwind CSS, featuring a responsive design that works on all screen sizes.
- **Theme Switching**: A theme switcher allows users to toggle between light and dark modes, with the selected theme saved in localStorage.

## Tech Stack

- **React.js**: A JavaScript library for building user interfaces.
- **Vite**: A fast frontend build tool.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **React Router**: For declarative routing in React applications.

## Project Structure

```
src/
├── api/
│   └── users.js
├── components/
│   ├── ApiData.jsx
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Footer.jsx
│   ├── Layout.jsx
│   ├── Navbar.jsx
│   └── TaskManager.jsx
├── context/
│   └── ThemeContext.jsx
├── hooks/
│   ├── useLocalStorageTasks.js
│   └── useTheme.js
├── pages/
│   ├── ApiDataPage.jsx
│   ├── HomePage.jsx
│   └── TasksPage.jsx
└── App.jsx
```

## Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd <project-directory>
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
The application will be available at `http://localhost:5173`.

## Deployment

This application is deployed on Netlify.

**Live URL:** [https://cheery-arithmetic-cdc83d.netlify.app]

## Author

- **Chalonreay B. Kahindi**
- GitHub: [@vinci-plath](https://github.com/vinci-plath)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
 
