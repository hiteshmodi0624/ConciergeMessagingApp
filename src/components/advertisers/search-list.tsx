import { type FC } from "react";
import HiddenMenuItem from "../ui/hidden-menu/hidden-menu-item";
import HiddenMenu from "../ui/hidden-menu/hidden-menu";
import {useAppSelector} from "~/store/index"
import SearchItem from "./search-item";
const SearchList: FC<{ search: string }> = ({ search }) => {
  let profiles = useAppSelector((state) => state.user);
  profiles = profiles.filter((p) =>
    (p.first_name + " " + p.last_name)
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  return (
    <HiddenMenu
      pos={{ x: -10, y: 65 }}
      className="!absolute !bg-gray-200 -mt-4 hidden max-h-80 w-full overflow-scroll group-focus-within:block"
    >
      {profiles.map((profile) => (
        <HiddenMenuItem key={profile.id} to={`/messages/${profile.id}`}>
          <SearchItem profile={profile}/>
        </HiddenMenuItem>
      ))}
    </HiddenMenu>
  );
};

export default SearchList;
