import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import SearchResults from "./Searchresults";
import {useNavigate} from "react-router-dom";

function Layout({ placeholder, type }) {
    // State to store the search query
    const [query, setQuery] = useState("");
    // Hook to navigate programmatically
    const navigate = useNavigate();
    // Retrieve token from local storage
    const token = localStorage.getItem("token");

    // Effect to redirect to home if no token is found
    useEffect(() => {
        if (token === null) {
            navigate("/");
        }
    }, [navigate, token]);

    // Handle input change in the search bar
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div>
            <div className="flex flex-col">
                {/* Render Navbar component */}
                <Navbar/>
                {/* Render Searchbar component with props */}
                <Searchbar onInputChange={handleInputChange} placeholder={placeholder}/>
            </div>
            {/* Render SearchResults component with props */}
            <SearchResults type={type} query={query}/>
        </div>
    );
}

export default Layout;
