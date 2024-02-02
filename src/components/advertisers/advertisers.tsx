import MessageProfiles from "./messageProfiles";
import SearchBar from "./search-bar";

export default function Advertisers({ className }: { className?: string }) {
  return (
    <div className={`h-screen w-1/3 flex-col bg-white ${className}`}>
      <h2 className="ml-4 mt-4 font-mono text-xl font-extrabold">
        Advertisers
      </h2>
      <div className="mx-4">
        <SearchBar />
      </div>
      <MessageProfiles />
    </div>
  );
}
