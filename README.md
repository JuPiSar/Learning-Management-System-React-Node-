# Learning Management System - Client

This is the client-side application for the Learning Management System, built with React and Vite. It provides a platform for both students and educators to engage with online courses.

## ✨ Features

-   **Authentication:** Secure user sign-up and sign-in using Clerk.
-   **Dual Roles:** Separate interfaces and functionalities for Students and Educators.
-   **Course Management (for Educators):**
    -   Create, update, and publish courses.
    -   Upload course content, including video lectures.
    -   View a dashboard with analytics like total earnings, enrolled students, and course count.
-   **Course Discovery (for Students):**
    -   Browse and search for courses.
    -   View detailed course information, including curriculum, duration, and ratings.
    -   Preview free lectures before enrolling.
-   **Student Dashboard:**
    -   Access and manage all enrolled courses.

## 🛠️ Tech Stack

-   **Frontend:** React, Vite, Tailwind CSS
-   **Routing:** React Router
-   **Authentication:** Clerk
-   **State Management:** React Context API

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18.x or higher recommended)
-   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/Learning-Management-System-React-Node-.git
    ```

2.  **Navigate to the client directory:**
    ```bash
    cd Learning-Management-System-React-Node-/client
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    Create a `.env` file in the `client` directory and add the following variables. You can get your Clerk publishable key from your Clerk dashboard.

    ```env
    VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    VITE_CURRENCY=USD
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application should now be running on `http://localhost:5173` (or another port if 5173 is in use).

## 📂 Project Structure

The `src` folder is organized as follows:

```
src/
├── assets/         # Images, SVGs, and dummy data
├── components/     # Reusable React components (student, educator, shared)
├── context/        # React context for global state management
├── pages/          # Page components corresponding to routes
├── App.jsx         # Main application component with routing
├── index.css       # Global styles and Tailwind CSS imports
└── main.jsx        # Application entry point
```
