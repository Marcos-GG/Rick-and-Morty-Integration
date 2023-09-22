import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";

const Nav = ({ onSearch, setAccess, randomize }) => {
  const handleLogOut = () => {
    setAccess(false);
  };

  return (
    <nav>
      <SearchBar onSearch={onSearch} />

      <button>
        <NavLink to={"/about"}>About</NavLink>
      </button>
      <button>
        <NavLink to={"/home"}>Home</NavLink>
      </button>

      <button>
        <NavLink to={"/favorites"}>Favorites</NavLink>
      </button>

      <button onClick={handleLogOut}>Log out</button>
      <button onClick={randomize}>ADD RANDOM</button>
      {/* <NavLink to={"/"}>Log out</NavLink>  funciona pero solo porque tenemos seteado 
                                                         {location.pathname !== "/" && <Nav onSearch={onSearch} />}
                                                    sino no funcionaria ... lo  ideal es trabajar directamente con el estado*/}
    </nav>
  );
};

export default Nav;
