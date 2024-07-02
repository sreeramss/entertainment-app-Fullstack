# Movie App Backend

This is the backend for the movie app project, which uses MongoDB for data storage. It manages user authentication, bookmarks, and data storage, utilizing Express.js and JWT tokens for secure user sessions.

## Features

- **User Authentication:** Handles user login and signup with JWT token creation.
- **Bookmarks Management:** Allows users to add and view bookmarks.
- **Data Storage:** Uses MongoDB to store user and bookmark data.

## Technologies Used

- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing user and bookmark data.
- **Mongoose:** MongoDB object modeling for Node.js.
- **JWT:** JSON Web Tokens for secure authentication.

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/sreeramss/movie-app-backend.git
    cd movie-app-backend
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Create a `.env` file in the root directory and add your environment variables:**
    ```env
    PORT=your_port
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. **Start the development server:**
    ```sh
    npm start
    ```

5. **API Endpoints:**
    ## User Management

### Register a New User

- **POST** `/signup`

**Request Body:**

```json
{
  "email": "testing03@gmail.com",
  "password": "testing03"
}
```

**Response:**

- **Status:** 201 Created

```json
{
  "message": "User Registered successfully.",
}
```

### User Login

- **POST** `/login`

**Request Body:**

```json
{
  "email": "testing03@gmail.com",
  "password": "testing03"
}
```

**Response:**

- **Status:** 200 OK

```json
{
  "token": "Bearer token"
}
```

### Get bookmarks

- **GET** `/api/bookmarks`


**Response:**

- **Status:** 200 OK

```json
{
  []
}
```

### Add bookmarks

- **POST** `/api/bookmarks`

**Request Body:**

```json
{
"movieId":"786892",
"title":"Furiosa: A Mad Max Saga",
"backdropPath":"/wNAhuOZ3Zf84jCIlrcI6JhgmY5q.jpg",
"releaseYear":"2024"
}
```

**Response:**

- **Status:** 201 Created

```json
{
    "userId": "6671bf8a203592d61b19bc0e",
    "movieId": "786892",
    "title": "Furiosa: A Mad Max Saga",
    "backdropPath": "/wNAhuOZ3Zf84jCIlrcI6JhgmY5q.jpg",
    "releaseYear": "2024",
    "_id": "667c4bae59ab65927ac6f940",
    "__v": 0
}
```


### Delete bookmarks by ID

- **DELETE** `/api/bookmarks/667c4bae59ab65927ac6f940`

**Response:**

- **Status:** 200 OK

```json
{
    "message": "Bookmark deleted"
}
```

### Delete bookmarks by Movie ID

- **DELETE** `/api/bookmarks/786892`

**Response:**

- **Status:** 200 OK

```json
{
    "message": "Bookmark deleted"
}
```


## Project Structure

```plaintext
movie-app-backend/
│
├── models/
├── routes/
├── server.js
└── .env
├── .gitignore
├── package.json
└── README.md
