import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import Layout from "../components/Layout";
import { fetchBookmarks, addBookmark, deleteBookmarkByMovieId } from "../api";
import { toast } from 'react-toastify';

export default function Series() {
  const [movies, setMovies] = useState([]); // State for storing series data
  const [hoveredBookmark, setHoveredBookmark] = useState(null); // State to track hovered bookmark icon
  const [bookmarks, setBookmarks] = useState([]); // State for storing user bookmarks
  const navigate = useNavigate(); // Navigation hook for redirection

  // Fetch series data from API on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`
        },
      };

      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
          options
        );
        if (!response.ok) {
          throw new Error("Failed to fetch series");
        }
        const data = await response.json();

        // Modify data structure if needed
        const modifiedMovies = data.results.map((series) => ({
          ...series,
          release_year1: series.first_air_date ? series.first_air_date.substr(0, 4) : "",
          release_year: series.release_date ? series.release_date.substr(0, 4) : "",
        }));

        setMovies(modifiedMovies); // Update state with fetched series data
      } catch (error) {
        console.error("Error fetching series:", error);
      }
    };

    fetchMovies(); // Call fetchMovies function on component mount
  }, []);

  // Fetch user bookmarks on component mount or when bookmarks state changes
  useEffect(() => {
    const getBookmarks = async () => {
      try {
        const { data } = await fetchBookmarks(); // Fetch user bookmarks from API
        setBookmarks(data); // Update state with fetched bookmarks
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    getBookmarks(); // Call getBookmarks function on component mount or bookmarks state change
  }, [bookmarks]);

  // Handle mouse enter event on bookmark icon
  const handleBookmarkEnter = (index) => {
    setHoveredBookmark(index); // Set hoveredBookmark state to the index of the hovered bookmark
  };

  // Handle mouse leave event on bookmark icon
  const handleBookmarkLeave = () => {
    setHoveredBookmark(null); // Reset hoveredBookmark state to null
  };

  // Handle click on series item
  const handleMovieClick = (id) => {
    navigate(`/tvseries/${id}`); // Navigate to series details page
  };

  // Handle adding a bookmark
  const handleBookmark = async (event, series) => {
    event.stopPropagation(); // Prevent event bubbling

    const bookmark = {
      movieId: series.id,
      title: series.original_name,
      backdropPath: series.backdrop_path,
      releaseYear: series.release_year || series.release_year1,
    };

    try {
      const { data } = await addBookmark(bookmark); // Add bookmark via API
      setBookmarks([...bookmarks, data]); // Update bookmarks state with new bookmark
      toast.success("Bookmark Added"); // Display success toast
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  // Handle removing a bookmark
  const handleRemoveBookmark = async (event, id) => {
    event.stopPropagation(); // Prevent event bubbling

    try {
      await deleteBookmarkByMovieId(id); // Delete bookmark via API
      setBookmarks(bookmarks.filter(bookmark => bookmark._id !== id)); // Update bookmarks state after removal
      toast.success("Bookmark Removed"); // Display success toast
    } catch (error) {
      console.error("Error removing bookmark:", error);
      // Display a user-friendly error message
      alert("An error occurred while removing the bookmark. Please try again later.");
    }
  };

  // Check if a movie is bookmarked
  const isBookmarked = (movieId) => {
    return bookmarks.some(bookmark => bookmark.movieId == movieId);
  };

  return (
    <div>
      <Layout placeholder="Search for TvSeries..." type="tv" /> {/* Render search bar and filter by tv series */}
      <h1 className="lg:text-3xl text-2xl m-6 -mt-10 md:ml-12 lg:m-3 lg:mb-6 lg:ml-28 font-extralight">
        Series
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
              alt={movie.original_name}
            />
            <div className="px-1 py-3">
              <div className="flex">
                <p className="text-xs md:text-sm pr-3 opacity-70">
                  {movie.release_year || movie.release_year1}
                </p>
                <AiOutlinePlayCircle className="opacity-70 md:text-lg" />
                <p className="pb-2 pl-1 text-xs md:text-sm opacity-70">Series</p>
              </div>
              <div className="text-xs lg:text-lg lg:mb-2 md:text-sm">
                {movie.original_name}
              </div>
            </div>
            <div
              id={movie._id}
              className="absolute top-0 right-0 mr-2 mt-2 lg:mr-6 lg:mt-4"
            >
              {/* Render bookmark icon based on bookmark status */}
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
