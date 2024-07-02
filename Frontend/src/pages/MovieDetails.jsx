import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MovieDetails() {
  const { id } = useParams(); // Get movie ID from URL params
  const [movie, setMovie] = useState(null); // State to hold movie details
  const [credits, setCredits] = useState(null); // State to hold movie credits

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`, // Authorization header with token
        },
      };

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`, // API endpoint for fetching movie details
          options
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details"); // Throw error if fetching fails
        }
        const data = await response.json(); // Parse response data
        setMovie(data); // Set movie details in state
      } catch (error) {
        toast.error("Error fetching movie details"); // Display toast on error
        console.error("Error fetching movie details:", error); // Log error to console
      }
    };

    const fetchMovieCredits = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}` // API endpoint for fetching movie credits
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie credits"); // Throw error if fetching fails
        }
        const data = await response.json(); // Parse response data
        setCredits(data); // Set movie credits in state
      } catch (error) {
        toast.error("Error fetching movie credits"); // Display toast on error
        console.error("Error fetching movie credits:", error); // Log error to console
      }
    };

    fetchMovieDetails(); // Call function to fetch movie details
    fetchMovieCredits(); // Call function to fetch movie credits
  }, [id]); // Dependency on movie ID from URL params

  if (!movie || !credits) {
    return <div>Loading...</div>; // Display loading message while movie details and credits are fetched
  }

  return (
    <div>
      <Layout placeholder="Search for Movies and TvSeries..." type="movie" />{" "}
      {/* Render layout component */}
      <div className="p-4 md:p-8 lg:p-12 max-w-6xl mx-auto bg-gradient-to-r  text-white rounded-lg">
        <div className="flex flex-col md:flex-row bg-opacity-80 rounded-lg overflow-hidden">
          <img
            className="w-full md:w-1/3 object-cover rounded-lg md:rounded-none"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />{" "}
          {/* Display movie poster */}
          <div className="md:ml-8 p-4 md:p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl lg:text-5xl font-bold">{movie.title}</h1>{" "}
              <p className="mt-3 text-lg opacity-70 italic">{movie.tagline}</p> {/* Display tagline */}
              <div className="md:flex mt-3 justify-between">
                <p className="mt-2"><strong>Length : </strong><span className=" opacity-60"> {movie.runtime} min</span> </p>
                <p className="mt-2"><strong>Language : </strong><span className=" opacity-60"> {movie.original_language}</span></p>
                <p className="mt-2">
                <strong>Rating:</strong>{" "}
                <span className=" opacity-60"> {movie.vote_average}</span>{" "}
              </p>
                <p className="mt-2"><strong>Status : </strong><span className=" opacity-60"> {movie.status}</span></p>
              </div>
              {/* Display movie title */}
              <p className="mt-6 overflow-hidden">
                <strong>Genres:</strong>{" "}
                <div className="flex gap-3 mt-2">
                  {" "}
                  {movie.genres.map((genre) => (
                    <div
                      key={genre.id}
                      className="rounded-lg bg-white text-black font-semibold p-1 "
                    >
                      {genre.name}
                    </div>
                  ))}
                </div>{" "}
              </p>{" "}
              {/* Display movie genres */}
              <h1 className="mt-6 text-xl font-bold">Synopsis:</h1>
              <p className="mt-1 text-sm md:text-lg opacity-65">
                {movie.overview}
              </p>{" "}
              {/* Display movie overview */}
            </div>
            <div className="mt-6 space-y-2">
              <p>
                <strong>Release Date:</strong>{" "}
                <span className=" opacity-60"> {movie.release_date}</span>
              </p>{" "}
              {/* Display movie release date */}
              {" "}
              {/* Display movie rating */}
              <p>
                <strong>Budget:</strong>{" "}
                <span className=" opacity-60"> ${movie.budget.toLocaleString()}</span>{" "}
              </p>{" "}
              {/* Display movie budget */}
              <p>
                <strong>Revenue:</strong>{" "}
                <span className=" opacity-60"> ${movie.revenue.toLocaleString()}</span>{" "}
              </p>{" "}
              {/* Display movie revenue */}
            </div>
          </div>
          
        </div>
        <div className="flex justify-center ">
        {movie.homepage && (
              <p className="m-4">
                
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black m-4"
                ><button className="bg-col-icons text-white p-2 rounded-lg">Website</button>
                </a>
              </p>
            )}
            {movie.imdb_id && (
              <p className="mt-4">
                <a
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black m-4"
                ><button className="bg-col-icons p-2 text-white rounded-lg">IMDB</button>
                </a>
              </p>
            )}
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Cast</h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {credits.cast.map((member) => (
              <div key={member.cast_id} className="w-1/2 md:w-1/4 lg:w-1/6">
                <img
                  className="w-full object-cover rounded-lg"
                  src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                  alt={member.name}
                />
                <p className="text-sm mt-2">{member.name}</p>
                <p className="text-xs opacity-60">{member.character}</p>
              </div>
            ))}
          </div>
        
        </div>
      </div>
    </div>
  );
}
