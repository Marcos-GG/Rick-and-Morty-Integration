import { useState } from "react"; ///para crear estados
import validation from "./validation"; // nos traemos a la funcion validation para poder pasarle por props el estado local erros y ahi trabajar las validaciones de email y password

const Form = ({ login }) => {
  const [userData, setUserData] = useState({
    // creamos el estado local
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // creamos otro estado local // el obj que empezo inicializdo como obj vacio ahora pasa a tener el obj que esta retornando la funcion setErros (en este caso contiene la propiedad requerida con su respectivo mns de validacion)

  const handleChange = (event) => {
    // nos permite ver lo que esta escribiendo el usuario en tiempo real
    setUserData({
      // setUserData es el que puede modificar a userData , retornamos un nuevo obj porque estamos
      //pisando los valores que ya tiene email y password
      ...userData, // nos hacemos una copia de lo que tiene data (emil y password)
      [event.target.name]: event.target.value, // al usar [] hacemos que la funcion sea dinamica (variable), de esta manera siempre hacemos referencia al event.target.name(que puede ser email , password o otro el que se este modificando , englobamos todos)
      // : event.target.value
    });

    setErrors(
      validation({
        // ejecutamos la validacion dentro de handleChange porque nos permite saber lo que esta escribiendo el usuario , de esa manera podemos controlar en tiempo real y ejecutar las validaciones....(validation esta siendo ejecutada y lo de adentro es enviado por parametro)
        ...userData, // nos traemos la copia de el valor que tenga email y password (lo que vaya escribiendo)
        [event.target.name]: event.target.value, // lo mismo que arriba
      })
    ); // el valor de retornbo final es un objeto llamado errros que llega por el archivo "validation" por la ejecucion de la funcion "validation"
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // lo usamos para que cada vez que damos click en enviar no se me recargue la pagina
    login(userData); // ejecutamos login (userData)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="Email">Email</label>
      <input
        type="text"
        name="email"
        onChange={handleChange}
        value={userData.email}
      />
      {errors.email && <p>{errors.email}</p>}{" "}
      {/* hacemos una renderizado condicional donde preguntamos si "errors.email existe" osea si hay un error en el estado ERRORS que dba ser ejecutada  , si es asi osea si es true (&&....) se va a mostar */}
      <label htmlFor="Password">Password</label>
      <input
        type="text"
        name="password"
        onChange={handleChange}
        value={userData.password}
      />
      {errors.password && <p>{errors.password}</p>}
      <button>Submit</button>
    </form>
  );
};

export default Form;

// value={userData.email} : bindeamos el imput con el estado para controlar de que lo que escribe el usuario sea igual a mis imput de esta manera no hay desincroniazacion , "para almacenarlos" , "tomar su valor"

// const handleSubmit = (event) => terminamos de bindear el imput con el estado mediante el evento que envia "onChange" desde el imput. esta funcion se va a encargar de decirle que huvo un cambio

/////////////////////////
