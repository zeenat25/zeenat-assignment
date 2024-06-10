import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/search/name/${searchQuery}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name"
      />
      <button onClick={handleSearch}>Search</button>

      {searchResults.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          {searchResults.map((result, index) => (
            <div key={index}>
              <p>Name: {result.name}</p>
              <p>Phone Number: {result.phone_number}</p>
              <p>Spam Likelihood: {result.spam_likelihood}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
