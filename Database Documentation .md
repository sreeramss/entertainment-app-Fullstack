# Database Documentation

## Overview

This document describes the schema design for a MongoDB database that includes three main collections: `Users`, `Movies`, `TVShows` and `Bookmarks` . The design leverages Mongoose for schema definition and validation.

### User Schema

The `User` collection stores information about users, including their email, password, and a watchlist that can contain references to both movies and TV shows.

- **email**: String, Required, Unique
  - The user's email address. It must be unique to prevent duplicate accounts.
- **password**: String, Required
  - The hashed version of the user's password for security purposes.


### Bookmark Schema

The `Bookmark` collection contains detailed information about movieId, including titles, and other relevant metadata.

- **userId**: String, Required
  - The id of the user.

- **movieId**: String, Required
  - The Id of the movie.

- **title**: String, Required
  - The title of the movie.

- **backdrop_path**: String, Required
  - The backdrop_path of the movie.
 
- **releaseyear**: String, Required
  - The releaseyear of the movie.
 
