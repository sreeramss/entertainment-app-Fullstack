# Full Stack Entertainment  App

![Screenshot 2024-07-01 214454](https://github.com/sreeramss/entertainment-app-Fullstack/assets/89720320/5c9f3757-1039-47f8-af78-c36b08b44963)

## Overview

This is a full-stack movie app project similar to IMDb, built using React.js, TailwindCSS, React-Slick, Express.js, MongoDB, and Mongoose. The app fetches data from the TMDB API and includes various features such as authentication, bookmarking, and viewing movies and TV series.

## Features

- **Login & Signup:** User authentication with JWT tokens.
- **Home Page:** Trending movies and TV series.
- **Movies & TV Series Pages:** Comprehensive lists.
- **Bookmarks:** Add and view bookmarks.
- **JWT Authentication:** Secure user sessions.

## Technologies Used

- **Frontend:** React.js, TailwindCSS, React-Slick, TMDB API.
- **Backend:** Express.js, MongoDB, Mongoose, JWT.

## Installation

1. **Clone the repositories:**
    ```sh
    git clone https://github.com/sreeramss/movie-app-frontend.git
    git clone https://github.com/sreeramss/movie-app-backend.git
    ```

2. **Frontend Setup:**
    ```sh
    cd movie-app-frontend
    npm install
    echo "REACT_APP_API_KEY=your_tmdb_api_key" > .env
    npm start
    ```

3. **Backend Setup:**
    ```sh
    cd ../movie-app-backend
    npm install
    echo "PORT=your_port
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret" > .env
    npm start
    ```

4. **Access the app:**
    Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

- **User Management:**
    - `POST /signup`: Register a new user.
    - `POST /login`: User login.

- **Bookmarks:**
    - `GET /api/bookmarks`: Get user bookmarks.
    - `POST /api/bookmarks`: Add a bookmark.
    - `DELETE /api/bookmarks/:id`: Delete a bookmark by ID.
    - `DELETE /api/bookmarks/movie/:movieId`: Delete a bookmark by Movie ID.

## Project Structure

### Frontend

```plaintext
movie-app-frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   ├── index.js
├── .env
├── package.json
└── README.md
```

### Backend

```plaintext
movie-app-backend/
├── models/
├── routes/
├── server.js
├── .env
├── package.json
└── README.md
```
