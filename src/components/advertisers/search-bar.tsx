import { AiFillCloseCircle, AiOutlineSearch } from "react-icons/ai";
import Input from "../ui/inputs/input";
import { type ChangeEvent, type FormEvent, useState } from "react";
import SearchList from "./search-list";

export default function SearchBar () {
  const [value, setValue] = useState<string>("");
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const onClose = (event: FormEvent) => {
    event.preventDefault();
    setValue("");
  };
  return (
    <div
      className={`group relative mt-4 w-full
      rounded-full border-2 border-gray-100 bg-white text-black`}
    >
      <form className="relative z-30">
        <label
          className="group-focus-within:text-primary absolute left-7 top-2 z-10 text-xl sm:top-3"
          htmlFor="search-bar"
        >
          <AiOutlineSearch />
        </label>
        <Input
          id="search-bar"
          type="text"
          className={`bg-gray z-50 border-gray-100 !pl-14 !pr-12 text-sm placeholder:text-black sm:rounded-full`}
          placeholder="Search for advertisers..."
          onChangeHandler={onInputChange}
          value={value}
          outerClass={`sm:rounded-full border-0 !my-0`}
        />

        {value.length > 0 && (
          <>
            <button
              className="group-focus-within:text-primary absolute right-4 top-2 z-10 text-xl sm:top-3"
              onClick={onClose}
            >
              <AiFillCloseCircle />
            </button>
            <SearchList search={value} />
          </>
        )}
      </form>
    </div>
  );
}