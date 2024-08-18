import { Search } from "lucide-react";

const SearchBar = () => {
    return <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 text-gray-400" />
        <input
            type="text"
            placeholder="Search Song, Artist"
            className="w-full bg-gray-800 rounded-full py-2 px-4 pl-10 text-white"
        />
    </div>
};

export default SearchBar;