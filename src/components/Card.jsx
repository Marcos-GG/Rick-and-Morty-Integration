import { NavLink } from "react-router-dom";
import { addFav, removeFav } from "../redux/actions";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

export function Card({
  id,
  name,
  species,
  gender,
  image,
  onClose,
  addFav,
  myFavorites,
  removeFav,
}) {
  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
    if (isFav) {
      setIsFav(false);
      removeFav(id);
    } else {
      setIsFav(true);
      addFav({ id, name, species, gender, image });
    }
  };

  useEffect(() => {
    myFavorites.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [myFavorites, id]);

  return (
    <div>
      <button onClick={handleFavorite}>{isFav ? "❤️" : "🤍"}</button>
      <button onClick={() => onClose(id)}>X</button>{" "}
      {/* card recibe el id de function onClose , el id es el numero que ingresa el usuarios a traves del input  */}
      <NavLink to={`/detail/${id}`}>
        <h2 className="card-name">{name}</h2>
      </NavLink>
      <h2>{species}</h2>
      <h2>{gender}</h2>
      <img src={image} alt="" />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFav: (character) => dispatch(addFav(character)),
    removeFav: (id) => dispatch(removeFav(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
