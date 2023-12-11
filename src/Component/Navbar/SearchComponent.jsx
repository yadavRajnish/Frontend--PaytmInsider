import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchQuery) {
      // If the search query is empty, do nothing
      return;
    }

    try {
      const response = await searchEvents(searchQuery);

      const results = response;
    //   console.log(results);

      if (results.length === 0) {
        // If there are no search results
        setNoResults(true);
        setSearchResults([]);
      } else {
        // If there are search results
        setNoResults(false);
        setSearchResults(results);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const searchEvents = async (query) => {
    try {
      const response = await axios.get("http://localhost:8282/get-events", {
        params: {
          query: query,
        },
      });

    //   console.log("Response:", response.data.data);

      if (response.data && response.data.data) {
        const results = response.data.data;

        // Calculate similarity score for each result and sort them
        const sortedResults = results.sort((a, b) => {
          const similarityA = calculateSimilarity(a.title, query);
          const similarityB = calculateSimilarity(b.title, query);

          // Sort in descending order based on similarity score
          return similarityB - similarityA;
        });

        return sortedResults;
      } else {
        console.error("Unexpected response format:", response);
        return [];
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      throw error;
    }
  };

  // Function to calculate Levenshtein distance for similarity
  const calculateSimilarity = (str1, str2) => {
    if (!str1 || !str2) {
      return 0; // Return 0 if either string is undefined or null
    }

    const a = str1.toLowerCase();
    const b = str2.toLowerCase();

    const maxLength = Math.max(a.length, b.length);
    const distance = new Array(maxLength);

    for (let i = 0; i <= maxLength; i++) {
      distance[i] = [i];
    }
    for (let j = 0; j <= maxLength; j++) {
      distance[0][j] = j;
    }

    for (let i = 1; i <= maxLength; i++) {
      for (let j = 1; j <= maxLength; j++) {
        const cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        distance[i][j] = Math.min(
          distance[i - 1][j] + 1,
          distance[i][j - 1] + 1,
          distance[i - 1][j - 1] + cost
        );
      }
    }

    return 1 - distance[maxLength][maxLength] / maxLength;
  };

  const handleInputChange = async (event) => {
    setSearchQuery(event.target.value);

    if (event.target.value.trim() === "") {
      // Clear recommendations if input is empty
      setSearchResults([]);
      setNoResults(false);
      return;
    }

    try {
      const response = await searchEvents(event.target.value);
      const results = response;

      if (results.length === 0) {
        // If there are no search results
        setNoResults(true);
        setSearchResults([]);
      } else {
        // If there are search results
        setNoResults(false);
        setSearchResults(results);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <div className="search-container mt-24">
          <form
            onSubmit={handleSearch}
            className="flex flex-col items-center text-center"
          >
            <TextField
              variant="outlined"
              value={searchQuery}
              onChange={handleInputChange}
              className="mr-1"
              style={{ height: "60px", width: "500px" }}
              placeholder="Search Events here..."
            />
            <Button variant="contained" type="submit">
              Search
            </Button>
          </form>

          {noResults && <p>No results found.</p>}

          <div
            style={{
              display: "flex",
              textAlign: "start",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <ul className="autocomplete-list">
              {searchResults.map((event) => (
                <li key={event._id} style={{margin:'10px'}} className="hover:text-blue-600">
                  <Link to={`/product/details/${event._id}`}>
                    {event.tittle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchComponent;
