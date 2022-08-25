import React, { useState } from "react";
import "./styles.css";

const Search = ({ onSearch, onClear }) => {
  const [query, setQuery] = useState('');

  const handleClear = () => { 
    setQuery('');
    onSearch('');
  };

  return (
    <div className="search">
      <input 
        type="search" 
        name="query" 
        id="query" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => onSearch(query)}>Procurar</button>
      <button onClick={handleClear}>Limpar</button>
    </div>
  );
};

export default Search;
