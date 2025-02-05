# Kriyanighantu - A Sanskrit Thesaurus

**Kriyanighantu** is a portal designed for managing verbs, lookups, and root entries. It allows users to view entries related to Sanskrit verb conjugations, dictionary lookups, and root words. This project is built with **React** for the frontend and connects to a **backend** server for storing and retrieving the data.

## Features

- **Verb Entries:** Manage verbs, their forms, and associated meanings.
- **Lookup Entries:** Manage dictionary lookup entries.
- **Root Entries:** Manage Sanskrit root words.
- **Responsive Design:** A mobile-friendly interface for managing entries on the go.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (or your chosen database), Neo4j

## Installation

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/VK-ARJUN/kriyanighantu.git
   cd kriyanighantu

   ```
2. Install dependencies:

- Install dependencies for the client (React app):
  Navigate to the frontend directory and run the following commands:

  ```bash
  cd frontend
  npm install

  ```

- Install dependencies for the server (backend):
  Now, navigate to the backend directory and run:
  ```bash
  cd ../backend
  npm install

  ```

3. Start the client:

- Navigate to the frontend folder (if not already there):
  ```bash
  cd frontend
  ```
- Start React app:

  ```bash
  npm run dev

  ```

- The frontend will be running on http://localhost:5001.

4. Run the backend server:

- Navigate to the backend folder (if not already there):
  ```bash
  cd backend
  ```
- Start the server:
  ```bash
  npm start
  ```
- The backend will be running on http://localhost:3001.

## Usage

1. Once both the frontend and backend servers are running, visit http://localhost:5001 in your browser.

2. Use the portal to:
   - Search verb entries & synonyms
   - Search lookup entries
   - Search root entries

## Contribution

If you'd like to contribute to the development of Kriyanighantu, feel free to fork the repository and make pull requests. Ensure that your changes are well-documented and tested.
