const SearchBox = () => {
  return (
    <div className="mx-auto mb-4 flex items-center justify-center">
      <div className="flex flex-row border border-gray-400 w-full rounded-md overflow-hidden">
        <input
          type="text"
          className="p-2 pr-0 grow border-none outline-none"
          placeholder="Search employees..."
        />
        <button
          type="button"
          className="p-2 cursor-pointer bg-gray-100 hover:bg-gray-300"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
