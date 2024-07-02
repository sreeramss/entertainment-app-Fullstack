import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdLocalMovies } from "react-icons/md";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import Layout from "../components/Layout";
import { fetchBookmarks, addBookmark, deleteBookmarkByMovieId } from "../api";
import { toast } from 'react-toastify';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [hoveredBookmark, setHoveredBookmark] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const navigate = useNavigate();

  //to fetch movies 
  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
              `Bearer ${process.env.REACT_APP_AUTH_TOKEN}` },
      };

      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
          options
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();

        const modifiedMovies = data.results.map((movie) => ({
          ...movie,
          release_year1: movie.first_air_date
            ? movie.first_air_date.substr(0, 4)
            : "",
          release_year: movie.release_date
            ? movie.release_date.substr(0, 4)
            : "",
        }));

        setMovies(modifiedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  //To fetch Bookmarks 
  useEffect(() => {
    const getBookmarks = async () => {
      try {
        const { data } = await fetchBookmarks();
        setBookmarks(data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    getBookmarks();
  }, [bookmarks]);

  const handleBookmarkEnter = (index) => {
    setHoveredBookmark(index);
  };

  const handleBookmarkLeave = () => {
    setHoveredBookmark(null);
  };

  //To handle Click function
  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };
//To add Bookmark 
    const handleBookmark = async (event, movie) => {
        event.stopPropagation();

        const bookmark = {
            movieId: movie.id,
            title: movie.title,
            backdropPath: movie.backdrop_path,
            releaseYear: movie.release_year || movie.release_year1,
        };

        try {
            const {data} = await addBookmark(bookmark);
            setBookmarks([...bookmarks, data]);
            toast.success("Bookmark Added");
            } catch (error) {
            console.error("Error adding bookmark:", error);
        }
    };
//To remove Bookmark
    const handleRemoveBookmark = async (event, id) => {
        event.stopPropagation();
        try {
            await deleteBookmarkByMovieId(id);
            setBookmarks(bookmarks.filter(bookmark => bookmark._id !== id));
            toast.success(" Bookmarked  removed");

        } catch (error) {
            console.error("Error removing bookmark:", error);
            // Display a user-friendly error message
            alert("An error occurred while removing the bookmark. Please try again later.");
        }
    };
    const isBookmarked = (movieId) => {
        return bookmarks.some(bookmark => bookmark.movieId == movieId);
    };

  return (
    <div>
      <Layout placeholder="Search for Movies..." type="movie" />
      <h1 className="lg:text-3xl text-2xl m-6 -mt-10 md:ml-12 md:-mt-10 lg:m-3 lg:mb-6 lg:ml-28 font-extralight">
        Movies
      </h1>
      <div className="m-4 mr-1 md:ml-12 md:-mr-10 lg:ml-28 lg:mr-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="relative cursor-pointer"
            onClick={() => handleMovieClick(movie.id)}
          >
            <img
              className="rounded-xl w-full opacity-80 hover:opacity-50 transition-opacity duration-300"
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
            />
            <div className="px-1 py-3">
              <div className="flex">
                <p className="text-xs md:text-sm pr-3 opacity-70">
                  {movie.release_year || movie.release_year1}
                </p>
                <MdLocalMovies className="opacity-70 md:text-lg" />
                <p className="pb-2 pl-1 text-xs md:text-sm opacity-70">Movie</p>
              </div>
              <div className="text-xs lg:text-lg lg:mb-2 md:text-sm">
                {movie.title}
              </div>
            </div>
            <div
              id={movie._id}
              className="absolute top-0 right-0 mr-2 mt-2 lg:mr-6 lg:mt-4"
            >
              {isBookmarked(movie.id) ? (
                <FaBookmark
                  className="bookmark-icon cursor-pointer transition-transform duration-300 transform hover:scale-100"
                  onClick={(event) => handleRemoveBookmark(event, movie.id)}
                  onMouseEnter={() => handleBookmarkEnter(index)}
                  onMouseLeave={handleBookmarkLeave}
                />
              ) : (
                <div className={"bookmark-container"}>
                  <div className={"bookmark-icon-un-filled"}>
                    <FaRegBookmark
                      onClick={(event) => handleRemoveBookmark(event, movie.id)}
                    />
                  </div>
                  <div className={"bookmark-icon-filled "}>
                    <FaBookmark
                      onClick={(event) => handleBookmark(event, movie)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

