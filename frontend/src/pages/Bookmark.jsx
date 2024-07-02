import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { fetchBookmarks, deleteBookmark } from '../api';
import { MdLocalMovies } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const navigate = useNavigate();

  // Function to fetch bookmarks on component mount
  useEffect(() => {
    const getBookmarks = async () => {
      try {
        const { data } = await fetchBookmarks(); 
        setBookmarks(data);
      } catch (error) {
        toast.error('Error fetching bookmarks');
        console.error('Error fetching bookmarks:', error);
      }
    };

    getBookmarks();
  }, []);

  // Handle clicking on a bookmarked movie
  const handleMovieClick = (bookmark) => {
    console.log(bookmark);
    navigate(`/movie/${bookmark.movieId}`);
  };

  // Handle deleting a bookmark
  const handleDelete = async (event, id) => {
    event.stopPropagation();

    try {
      await deleteBookmark(id);
      setBookmarks(bookmarks.filter(bookmark => bookmark._id !== id));
      toast.success('Bookmark deleted successfully');
    } catch (error) {
      toast.error("Error deleting bookmark");
      console.error("Error deleting bookmark:", error);
    }
  };

    // Render bookmarks UI
  return (
    <div>
      <Layout placeholder={"Search for Movies and TvSeries"} type="multi" />
      <h1 className="lg:text-3xl text-2xl m-6 md:ml-12 lg:m-3 lg:mb-6 lg:ml-28 font-extralight">
        Your Bookmarks
      </h1>
      <div className="m-4 mr-1 md:ml-12 md:-mr-10 lg:ml-28 lg:mr-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {bookmarks.map((bookmark) => (
          <div key={bookmark._id} className="relative" onClick={() => handleMovieClick(bookmark)}>
            <img
              className="rounded-xl w-full opacity-80 hover:opacity-50 transition-opacity duration-300"
              src={`https://image.tmdb.org/t/p/w500${bookmark.backdropPath}`}
              alt={bookmark.title}
            />
            <div className="px-1 py-3">
              <div className="flex">
                <p className="text-xs md:text-sm pr-3 opacity-70">
                  {bookmark.releaseYear}
                </p>
                <MdLocalMovies className="opacity-70 md:text-lg" />
                <p className="pb-2 pl-1 text-xs md:text-sm opacity-70">Movie</p>
              </div>
              <div className="text-xs lg:text-lg lg:mb-2 md:text-sm">{bookmark.title}</div>
            </div>
            <button
              className="absolute top-0 right-0 mt-2 mr-2 p-2 bg-red-500 rounded-full text-white"
              onClick={(event) => handleDelete(event, bookmark._id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmark;
