import "./App.css";
import Cards from "./components/Cards.jsx";
import Nav from "./components/Nav.jsx";
import { useState, useEffect } from "react"; // importamos el hook useState
import axios from "axios";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import About from "./components/About.jsx";
import Detail from "./components/Detail.jsx";
import Form from "./components/Form.jsx";
import Favorites from "./components/Favorites.jsx";

function App() {
  const navigate = useNavigate();
  const [access, setAccess] = useState(false); // la inicializamos con false

  const location = useLocation();

  let [characters, setCharacters] = useState([]); // creamos el estado LOCAL llamado characters
  // setCharacters va a ser el que modifique a character y el valor inicial que tiene ese character es un array vacio

  // const onSearch = () => {                     // creamos la funcion onSearch , cada vez que se lo llame agrega un nuevo personaje
  //    setCharacters([...characters , example])    // spread operator : copia todo lo que tenga [character] y le concatena (le agrega)
  //                                            // el personaje que tiene en ese caso example
  //    // console.log(characters);
  // }

  const onSearch = async (id) => {
    try {
      const { data } = await axios(
        `http://localhost:3001/rickandmorty/character/${id}`
      );

      if (data.name) {
        setCharacters((oldChars) => [...oldChars, data]);
      }
    } catch (error) {
      alert("No hay personajes con este");
    }
  };

  const onClose = (id) => {
    const characterFiltered = characters.filter(
      (character) => character.id !== Number(id)
    );
    setCharacters(characterFiltered);
  };

  const login = async (userData) => {
    try {
      const { email, password } = userData;
      const URL = "http://localhost:3001/rickandmorty/login/";
      const { data } = await axios(
        URL + `?email=${email}&password=${password}`
      );
      const { access } = data;
      setAccess(access);
      access && navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    !access && navigate("/");
  }, [access, navigate]); // array de dependecia .. estamos diciendo que useEffect se quede pendiendte de access
  // si acces se modifica se va a ejecutar lo que tenga dentro useEffect
  // lo que estoy diciendo dentro de esta funcion es que mientras acces este inicialiazdo en false siempre navigate me va a redirigir a "/" , caso contrario access tiene valor true navigate no se ejecuta y pasa a ejecutarse el return osea me va a mostart lo que tenga dentro y me va a llevar a "/home"

  function randomHandler() {
    let memoria = [];

    let randomId = (Math.random() * 826).toFixed();

    randomId = Number(randomId);

    if (!memoria.includes(randomId)) {
      memoria.push(randomId);
      onSearch(randomId);
    } else {
      alert("Ese personaje ya fue agregado");
      return;
    }
  }

  return (
    <div className="App">
      {location.pathname !== "/" && (
        <Nav
          onSearch={onSearch}
          setAccess={setAccess}
          randomize={randomHandler}
        />
      )}
      {/* si el usuario no esta parado en "/" recien ahi te voy a mostar la barra de navegacion , de esta maner al ingresar por primera vez en la pagina siempre se le va a mostar el login sin la nav */}
      <Routes>
        <Route path="/" element={<Form login={login} />} />
        {/* le pasamos la funcion login por parametro a el componente form, de esta manera y asi poder trabajarla desde ahi */}
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={onClose} />}
        ></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;

// location() = nos dice donde esta parado el usuario (ruta) de este manera vamos a saber que devolverle , nos desvolvia un objeto donde nos interesa saber de sus propiedades es el "pathname"

// useNavigate(); = lo usamos como una especie de link para que el usuario navegue de una pagina a la otra

// const[access, setAccess] = useState(false) = simulamos una base de datos donde tengamos guardado un email y passwordd, de esta forma solo si la informacion del usuario coincide podra ingresar a la aplicaion
