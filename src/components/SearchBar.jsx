import { useState } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim() !== "") {
      onSearch(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Enter city..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
