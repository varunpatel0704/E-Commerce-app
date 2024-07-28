import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({placeholder, onSearch}) {
  const [query, setQuery] = useState("");

  function handleSearch(){
    if(query.length){
      onSearch(query);
      // setQuery('');
    } 
  }

  return (
    <div className="flex justify-center items-center py-1 w-full gap-2">
      <input
        className="border w-9/12 border-gray-300 flex-shrink flex-grow rounded-md outline-none py-2 px-4 shadow-sm"
        id="searchBar"
        type="text"
        value={query}
        onChange={(e) => {
          if(!e.target.value)
            onSearch('');
          setQuery(e.target.value)
        }}
        placeholder={placeholder || "Search for categories..."}
        autoComplete="off"
      />
      <label htmlFor="searchBar" className="cursor-pointer text-xl">
        <button className="p-2" onClick={handleSearch}>
          <FaSearch />
        </button>
      </label>
    </div>
  );
}

export default SearchBar;
