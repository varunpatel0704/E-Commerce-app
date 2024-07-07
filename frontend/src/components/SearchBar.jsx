import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({onSearch}) {
  const [query, setQuery] = useState("");

  function handleSearch(){
    if(query.length){
      onSearch();
      // setQuery('');
    } 
  }

  return (
    <div className="flex justify-center items-center py-1 px-2 w-[95%] gap-1">
      <input
        className="border w-9/12 border-gray-300 flex-shrink flex-grow rounded-md outline-none py-1.5 px-2.5 shadow-sm"
        id="searchBar"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
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
