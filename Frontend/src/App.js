import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import Home from './pages/Home';
import Tvseries from './pages/Tvseries';
import Movies from './pages/Movies';
import Bookmark from './pages/Bookmark';
import MovieDetails from './pages/MovieDetails';
import TvSeriesDetails from './pages/Tvseriesdetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tvseries" element={<Tvseries />} />
        <Route path="/tvseries/:id" element={<TvSeriesDetails />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/bookmark" element={<Bookmark />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
