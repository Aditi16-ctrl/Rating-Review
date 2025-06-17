# Ratings & Reviews Web Application

---

## Features

- Display a list of products with details and images
- Submit ratings (1-5 stars) and text reviews
- Show reviews on demand with filter by tags
- Animated UI using Framer Motion and styled-components
- Store reviews persistently in MySQL database via REST APIs

---

## Project Structure

- **rating/** — React frontend code
- **review/** — Express backend API
- **database/** — MySQL database schema and setup

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [MySQL](https://dev.mysql.com/downloads/) installed and running
- Git (for version control)

---

## Backend

-Navigate to the backend folder:
-cd review
-Install dependencies: npm install

---

## Database (MySQL)
-Configure your MySQL database connection in server.js or appropriate config file

-Create the MySQL database and tables using the provided SQL schema (if available), or run

-Start the backend server:
-node server.js
-By default, the backend listens on http://localhost:5000.

---

## Frontend

-Open a new terminal window/tab and navigate to the frontend folder:
-cd rating
-Install dependencies
-Start the React development server: npm start
-The frontend will open automatically in your browser at http://localhost:3000.

---

## Testing the Application
✅Use the React UI to submit ratings and reviews for products.

✅Click "Show Reviews" button to view stored reviews.

✅Confirm in the MySQL database that the reviews are being saved.

✅Check the terminal running the backend for any error messages.

✅The UI animations and transitions should respond on hover and click.

---

## ✅ **Frontend (React)** dependencies

These are typically installed via `npm install` inside your `rating/` folder:

| Package             | Purpose                          |
| ------------------- | -------------------------------- |
| `react`             | Core React library               |
| `react-dom`         | DOM bindings for React           |
| `styled-components` | Styling UI components            |
| `axios`             | HTTP rating to make API requests |
| `framer-motion`     | Animations and transitions       |
| `react-icons`       | Icon library (used for `FaStar`) |

📌 You can confirm by checking `rating/package.json` under `"dependencies"`.

---

## ✅ **Backend (Node.js + Express)** dependencies

Installed via `npm install` inside your `review/` folder:

| Package           | Purpose                                          |
| ----------------- | ------------------------------------------------ |
| `express`         | Backend web framework                            |
| `cors`            | Enables Cross-Origin Resource Sharing            |
| `mysql2`          | MySQL driver for Node.js (you used this for DB)  |
| `body-parser`     | Parses JSON body in requests                     |
| `nodemon` *(dev)* | Automatically restarts server during development |

📌 You can confirm by checking `review/package.json`.
