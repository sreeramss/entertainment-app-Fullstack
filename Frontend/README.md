# Entertainment App 


![Screenshot 2024-07-01 214454](https://github.com/sreeramss/movie-app-frontend/assets/89720320/7f47323e-946d-452e-8af9-636cb4040dfb)


This is a movie app project similar to IMDb, built using React.js, TailwindCSS, and React-Slick. The app fetches data from the TMDB API and includes various features such as authentication, bookmarking, and viewing movies and TV series.

## Features

- **Login Page:** Allows users to log in using their credentials.

![Screenshot 2024-07-01 214408](https://github.com/sreeramss/movie-app-frontend/assets/89720320/5e156493-2320-4adc-a761-a7483f263319)


- **Signup Page:** Enables new users to create an account.

![Screenshot 2024-07-01 214424](https://github.com/sreeramss/movie-app-frontend/assets/89720320/2cece3fc-4414-4451-8224-2c1497b58bff)

  
- **Home Page:** Displays a list of trending movies and TV series.

![Screenshot 2024-07-01 214454](https://github.com/sreeramss/movie-app-frontend/assets/89720320/f6c05a0e-7fc6-48b7-ada5-084b5a1ac935)

  
- **Movies Page:** Shows a comprehensive list of movies.
- **TV Series Page:** Lists various TV series.
- **Bookmarks Page:** Users can add movies and TV series to their bookmarks and view them on this page.
- **JWT Authentication:** Utilizes JWT tokens for user authentication.

## Technologies Used

- **React.js:** JavaScript library for building user interfaces.
- **TailwindCSS:** Utility-first CSS framework for styling.
- **React-Slick:** Carousel component for React.
- **TMDB API:** Source of movie and TV series data.

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/sreeramss/movie-app-frontend.git
    cd movie-app-frontend
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Create a `.env` file in the root directory and add your TMDB API key:**
    ```env
    REACT_APP_AUTH_TOKEN=="YOUR_AUTH_TOKEN"
    REACT_APP_API_KEY="YOUR_API_KEY"
    ```

4. **Start the development server:**
    ```sh
    npm start
    ```

5. **Open your browser and navigate to:**
    ```sh
    http://localhost:3000
    ```

## Project Structure

```plaintext
movie-app-frontend/
│
├── public/
│   ├── index.html
│   └── ...
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   ├── index.js
│   └── ...
│
├── .env
├── .gitignore
├── package.json
└── README.md
