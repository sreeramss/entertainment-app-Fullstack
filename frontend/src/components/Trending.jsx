// src/pages/Trending.js
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdLocalMovies } from "react-icons/md";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchBookmarks, addBookmark, deleteBookmarkByMovieId } from "../api";
import { toast } from "react-toastify";

function Trending() {
  const [movies, setMovies] = useState([]);
  const [hoveredBookmark, setHoveredBookmark] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const navigate = useNavigate();


  //fetch api details
  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
          `Bearer ${process.env.REACT_APP_AUTH_TOKEN}` , },
      };

      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/all/day?language=en-US",
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

  //To get bookmarks 
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
  const settings = {
    infinite: true,
    speed: 900,
    slidesToShow: 4,
    slidesToScroll: 2,
    centerMode: false,
    initialSlide: 0,
    pauseOnHover: true,
    autoplay: true,
    autoplaySpeed: 2200,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          arrows: true,
          variableWidth: false,
          adaptiveHeight: true,
        },
      },
      {
        breakpoint: 1163,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          arrows: false,
          variableWidth: false,
          adaptiveHeight: true,
          
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
          arrows: false,
          variableWidth: false,
          adaptiveHeight: false,
        },
      },
      {
        breakpoint: 480,
      settings: {
        slidesToShow:0.9,
        slidesToScroll:1,
        centerMode:true,
        initialSlide: 0,
        arrows: false,
        variableWidth: false,
        adaptiveHeight: true,
        autoplaySpeed: 1300},
      },
    ],
  };

  const handleBookmarkEnter = (index) => {
    setHoveredBookmark(index);
  };

  const handleBookmarkLeave = () => {
    setHoveredBookmark(null);
  };

  //Handle the click function
  const handleItemClick = (item) => {
    if (item.media_type === "movie") {
      navigate(`/movie/${item.id}`);
    } else if (item.media_type === "tv") {
      navigate(`/tvseries/${item.id}`);
    }
  };

  //to add bookmark
  const handleBookmark = async (event, movie) => {
    event.stopPropagation();
    const bookmark = {
      movieId: movie.id,
      title: movie.title || movie.name,
      backdropPath: movie.backdrop_path,
      releaseYear: movie.release_year || movie.release_year1,
    };

    try {
      const { data } = await addBookmark(bookmark);
      setBookmarks([...bookmarks, data]);
      toast.success("Bookmark Added")
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };


  //to Remove bookmark
  const handleRemoveBookmark = async (event, id) => {
    event.stopPropagation();
    try {
      await deleteBookmarkByMovieId(id);
      setBookmarks(bookmarks.filter((bookmark) => bookmark._id !== id));
      toast.success("Bookmark removed")
    } catch (error) {
      console.error("Error removing bookmark:", error);
      // Display a user-friendly error message
      alert(
        "An error occurred while removing the bookmark. Please try again later."
      );
    }
  };
  const isBookmarked = (movieId) => {
    return bookmarks.some((bookmark) => bookmark.movieId == movieId);
  };

  return (
    <div className=" relative -mt-10 md:py-8  lg:pl-2 outline-none md:ml-20 lg:ml-36 lg:-mt-8">
      <h1 className="lg:text-3xl text-2xl m-6 lg:m-3 md:-ml-8 lg:mb-6 lg:-ml-9 font-extralight">
        Trending
      </h1>
      {movies.length > 0 ? (
        <div className="carousel-container mx-auto md:-ml-8">
          <Slider className="" {...settings}>
            {movies.map((movie, index) => (
              <div
                key={movie.id}
                className="px-2 relative"
                onClick={() => handleItemClick(movie)}
              >
                <a href="#">
                  <img
                    className="rounded-lg shadow-lg mx-auto opacity-70 hover:opacity-50 transition-opacity duration-300"
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={movie.title || movie.name}
                    style={{ maxWidth: "100%" }}
                  />
                  <div>
                    <p className="absolute bottom-0 left-0 text-xs p-4 pb-8 lg:p-8 lg:pb-11 opacity-80">
                      {movie.release_year}
                      {movie.release_year1}
                    </p>
                    <p className="absolute bottom-0 left-0 text-sm p-8 pl-12 lg:p-11 lg:pl-16 opacity-80 ">
                      {movie.media_type === "movie" ? (
                        <MdLocalMovies />
                      ) : (
                        <AiOutlinePlayCircle />
                      )}
                    </p>
                    <div
                      id={movie._id}
                      className="absolute top-0 right-2 mr-2 mt-2 lg:mr-6 lg:mt-4"
                    >
                      {isBookmarked(movie.id) ? (
                        <FaBookmark
                          className="bookmark-icon cursor-pointer transition-transform duration-300 transform hover:scale-100"
                          onClick={(event) =>
                            handleRemoveBookmark(event, movie.id)
                          }
                          onMouseEnter={() => handleBookmarkEnter(index)}
                          onMouseLeave={handleBookmarkLeave}
                        />
                      ) : (
                        <div className={"bookmark-container"}>
                          <div className={"bookmark-icon-un-filled"}>
                            <FaRegBookmark
                              onClick={(event) =>
                                handleRemoveBookmark(event, movie.id)
                              }
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
                  <p className="absolute bottom-0 left-0 w-full lg:text-lg p-2 pl-4 lg:p-4 lg:pl-8 ">
                    {movie.title || movie.name}
                  </p>
                </a>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
}

export default Trending;
