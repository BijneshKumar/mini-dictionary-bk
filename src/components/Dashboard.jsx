import React, { useState, useEffect } from "react";
import axios from "axios";
import { data } from "./words";
import "../App.css";

function Dashboard() {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [meaning, setMeaning] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const updateSuggestions = (value) => {
    setSuggestions(
      value
        ? data.words
            .filter((word) => word.startsWith(value))
            .slice(0, 5)
        : []
    );
    setShowSuggestions(true);
  };

  useEffect(() => {
    updateSuggestions(searchText);
    if (!searchText) {
      setMeaning(""); 
      setShowSuggestions(false); 
    }
  }, [searchText]);

  const getWordMeaning = async (word) => {
    setShowSuggestions(false);
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      setMeaning(response.data[0].meanings[0].definitions[0].definition);
    } catch (error) {
      setMeaning("Error: Could not fetch the meaning of the word.");
    }
    setLoading(false);
    setShowSuggestions(false); 

  };

  const handleSuggestionClick = (word) => {
    setSearchText(word); 
    getWordMeaning(word); 

  };

  return (
    <div className="main-container">
    <div className="container">
      <h1>Mini Dictionary</h1>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value.toLowerCase())}
        onKeyUp={(e) => {
          if (e.key === "Enter" && suggestions.length) {
            getWordMeaning(suggestions[0]);
          }
        }}
        placeholder="Type a word..."
        className="search-box"
      />
      {loading && <div className="loading">Loading.....</div>}
      {showSuggestions && (
        <ul className="suggestions">
          {suggestions.map((word, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(word) }
              className="suggestion-item"
            >
              {word}
            </li>
          ))}
        </ul>
      )}
      {!loading && meaning && (
        <div className="meaning">
          <strong>Meaning:</strong> {meaning}
        </div>
      )}
    </div>
    </div>
  );
}

export default Dashboard;
