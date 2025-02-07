import { ChangeEventHandler } from "react";

interface SearchBoxProps {
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
}

const SearchBox = ({ onChange }: SearchBoxProps) => {
  return (
    <div className="sticky top-0 z-10 py-2 bg-white mx-auto mb-4 flex items-center justify-center">
      <div className="flex flex-row border border-gray-400 w-full rounded-md overflow-hidden">
        <input
          type="text"
          className="p-2 pr-0 grow border-none outline-none"
          placeholder="Search employees here..."
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default SearchBox;
