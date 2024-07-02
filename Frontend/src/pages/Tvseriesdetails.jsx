import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TvSeriesDetails() {
  const { id } = useParams(); // Get series ID from URL params
  const [series, setSeries] = useState(null); // State to hold series details
  const [credits, setCredits] = useState(null); // State to hold series credits

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`, // Authorization header with token
        },
      };

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?language=en-US`, // API endpoint for fetching series details
          options
        );
        if (!response.ok) {
          throw new Error("Failed to fetch series details"); // Throw error if fetching fails
        }
        const data = await response.json(); // Parse response data
        setSeries(data); // Set series details in state
      } catch (error) {
        toast.error("Error fetching series details"); // Display toast on error
        console.error("Error fetching series details:", error); // Log error to console
      }
    };

    const fetchSeriesCredits = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}` // API endpoint for fetching series credits
        );
        if (!response.ok) {
          throw new Error("Failed to fetch series credits"); // Throw error if fetching fails
        }
        const data = await response.json(); // Parse response data
        setCredits(data); // Set series credits in state
      } catch (error) {
        toast.error("Error fetching series credits"); // Display toast on error
        console.error("Error fetching series credits:", error); // Log error to console
      }
    };

    fetchSeriesDetails(); // Call function to fetch series details
    fetchSeriesCredits(); // Call function to fetch series credits
  }, [id]); // Dependency on series ID from URL params

  if (!series || !credits) {
    return <div>Loading...</div>; // Display loading message while series details and credits are fetched
  }

  return (
    <div>
      <Layout placeholder="Search for Movies and TvSeries..." type="tv" />{" "}
      {/* Render layout component */}
      <div className="p-4 mt-12 md:p-8 lg:p-12 max-w-6xl mx-auto bg-gradient-to-r  text-white rounded-lg">
        <div className="flex flex-col md:flex-row bg-opacity-80 rounded-lg overflow-hidden">
          <img
            className="w-full md:w-1/3 object-cover rounded-lg md:rounded-none"
            src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
            alt={series.original_name}
          />{" "}
          {/* Display series poster */}
          <div className="md:ml-8 p-4 md:p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl lg:text-5xl font-bold">
                {series.original_name}
              </h1>{" "}
              <p className="mt-3 text-lg opacity-70 italic">{series.tagline}</p>{" "}
              {/* Display tagline */}
              <div className="md:flex mt-3 justify-between">
                <p className="mt-2">
                  <strong>First Air Date: </strong>
                  <span className=" opacity-60"> {series.first_air_date}</span>
                </p>
                <p className="mt-2">
                  <strong>Language: </strong>
                  <span className=" opacity-60"> {series.original_language}</span>
                </p>
                <p className="mt-2">
                  <strong>Status: </strong>
                  <span className=" opacity-60"> {series.status}</span>
                </p>
              </div>
              {/* Display series title */}
              <p className="mt-6">
                <strong>Genres:</strong>{" "}
                <div className="flex gap-3 mt-2">
                  {" "}
                  {series.genres.map((genre) => (
                    <div
                      key={genre.id}
                      className="rounded-lg bg-white text-black font-semibold p-1 "
                    >
                      {genre.name}
                    </div>
                  ))}
                </div>{" "}
              </p>{" "}
              {/* Display series genres */}
              <h1 className="mt-6 text-xl font-bold">Synopsis:</h1>
              <p className="mt-1 text-sm md:text-lg opacity-65">
                {series.overview}
              </p>{" "}
              {/* Display series overview */}
            </div>
            <div className="mt-6 space-y-2">
              <p>
                <strong>Rating:</strong>{" "}
                <span className=" opacity-60"> {series.vote_average}</span>{" "}
              </p>{" "}
              {/* Display series rating */}
              <p>
                <strong>Number of Episodes:</strong>{" "}
                <span className=" opacity-60"> {series.number_of_episodes}</span>{" "}
              </p>{" "}
              {/* Display series number of episodes */}
              <p>
                <strong>Number of Seasons:</strong>{" "}
                <span className=" opacity-60"> {series.number_of_seasons}</span>{" "}
              </p>{" "}
              {/* Display series number of seasons */}
            </div>
          </div>
          
        </div>
        <div className="flex justify-center ">
        {series.homepage && (
              <p className="m-4">
                
                <a
                  href={series.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black m-4"
                ><button className="bg-col-icons text-white p-2 rounded-lg">Website</button>
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
