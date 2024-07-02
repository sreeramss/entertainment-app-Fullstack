import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdLocalMovies } from "react-icons/md";
import { fetchBookmarks, addBookmark, deleteBookmarkByMovieId } from "../api";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

const SearchResults = ({ type, query }) => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [bookmarks, setBookmarks] = useState([]);
  const [hoveredBookmark, setHoveredBookmark] = useState(null);
  const navigate = useNavigate();

  // Fetch search results based on query
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query.length > 2) { // Only fetch if query is sufficiently long
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`, // Include authorization token
          },
        };

        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/${type}?include_adult=false&language=en-US&page=1&query=${query}`,
            options
          );
          const data = await response.json();
          setResults(data.results);
          setTotalPages(data.total_pages);
        } catch (err) {
          console.error("Error fetching search results:", err);
        }
      } else {
        setResults([]);
      }
    };

    fetchSearchResults();
  }, [query, type]); // Depend on query and type changes

  // Fetch bookmarks on component mount and when bookmarks state changes
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
  }, []); // Depend on bookmarks state change

  // Fetch more results when pagination changes
  useEffect(() => {
    if (page > 1) {
      const fetchMoreResults = async () => {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`, // Include authorization token
          },
        };

        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/tv?include_adult=false&language=en-US&page=${page}&query=${query}`,
            options
          );
          const data = await response.json();
          setResults((prevResults) => [...prevResults, ...data.results]);
        } catch (err) {
          console.error("Error fetching more results:", err);
        }
      };

      fetchMoreResults();
    }
  }, [page, query]); // Depend on page and query changes

  // Load more results
  const loadMoreResults = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Handle item click, navigate to detail page based on media type
  const handleItemClick = (item) => {
    if (item.media_type === "movie") {
      navigate(`/movie/${item.id}`);
    } else if (item.media_type === "tv") {
      navigate(`/tvseries/${item.id}`);
    }
  };

  // Handle bookmark hover
  const handleBookmarkEnter = (index) => {
    setHoveredBookmark(index);
  };

  // Clear bookmark hover
  const handleBookmarkLeave = () => {
    setHoveredBookmark(null);
  };

  // Handle bookmark addition
  const handleBookmark = async (event, item) => {
    event.stopPropagation();
    const bookmark = {
      movieId: item.id,
      title: item.title || item.name,
      backdropPath: item.backdrop_path,
      releaseYear: item.release_date || item.first_air_date,
    };

    try {
      const { data } = await addBookmark(bookmark);
      setBookmarks([...bookmarks, data]);
      toast.success("Bookmark Added");
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  // Handle bookmark removal
  const handleRemoveBookmark = async (event, id) => {
    event.stopPropagation();
    try {
      await deleteBookmarkByMovieId(id);
      setBookmarks(bookmarks.filter((bookmark) => bookmark._id !== id));
      toast.success("Bookmark removed");
    } catch (error) {
      console.error("Error removing bookmark:", error);
      // Display a user-friendly error message
      alert(
        "An error occurred while removing the bookmark. Please try again later."
      );
    }
  };

  // Check if item is bookmarked
  const isBookmarked = (movieId) => {
    return bookmarks.some((bookmark) => bookmark.movieId == movieId);
  };

  // Render search results and bookmarks UI
  return (
    <div>
      <div className="m-4 mt-20 mr-1 md:ml-12 md:-mr-10 lg:ml-28 lg:mr-10 lg:mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {results.map((item, index) => (
          <div
            key={item.id}
            className="relative cursor-pointer"
            onClick={() => handleItemClick(item)}
          >
            <img
              className="lg:mt-10 rounded-xl w-full opacity-80 hover:opacity-50 transition-opacity duration-300"
              src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
              alt={item.name || item.title}
            />
            <div className="px-1 py-3">
              <div className="flex">
                <p className="text-xs md:text-sm pr-3 opacity-70">
                  {item.release_date ? item.release_date.substr(0, 4) : ""}
                  {item.first_air_date ? item.first_air_date.substr(0, 4) : ""}
                </p>
                <MdLocalMovies className="opacity-70 md:text-lg" />
                <p className="pb-2 pl-1 text-xs md:text-sm opacity-70">{type}</p>
              </div>
              <div className="text-xs lg:text-lg lg:mb-2 md:text-sm">
                {item.title || item.name}
              </div>
            </div>
            <div
              id={item._id}
              className="absolute top-0 lg:top-10 right-0 mr-2 mt-2 lg:mr-6 lg:mt-4"
            >
              {isBookmarked(item.id) ? (
                <FaBookmark
                  className="bookmark-icon cursor-pointer transition-transform duration-300 transform hover:scale-100"
                  onClick={(event) => handleRemoveBookmark(event, item.id)}
                  onMouseEnter={() => handleBookmarkEnter(index)}
                  onMouseLeave={handleBookmarkLeave}
                />
              ) : (
                <div className={"bookmark-container"}>
                  <div className={"bookmark-icon-un-filled"}>
                    <FaRegBookmark
                      onClick={(event) => handleRemoveBookmark(event, item.id)}
                    />
                  </div>
                  <div className={"bookmark-icon-filled "}>
                    <FaBookmark
                      onClick={(event) => handleBookmark(event, item)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Load more button */}
      {results.length > 0 && page < totalPages && (
        <button
          className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={loadMoreResults}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default SearchResults;
