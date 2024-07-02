# API Documentation

## Overview

This document provides detailed information on the API endpoints for a movie, TV show , Adding Bookmark , Deleting Bookmark By ID , Deleting bookmark by Movie ID 

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
