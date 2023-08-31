import { useState } from "react";




export default function SearchBar({onSearch}) {

   const [ id , setId] = useState("");

   const handleChange = (event) => {  // recibo el event que sale de onChange //(event.target.value) es la manera que yo tenia 
                                       // para tener el valor que el usuario metia en el imput  
      setId( event.target.value );    // de esta manera cambiamos el estado y accedemos al valor ingresado ene el imput es event.target.value
   };

   return (
      <div>
         <input onChange={handleChange} type='search' value={id}/>  {/* value={id} siginifica que siempre tiene que ser el mismo valor del estado local con el imput que esta escribiendo el usurio entonces nos aseguramos de que el valor del value ingresado por el imput sea el igual al estado id useState  */}
         <button onClick={() => {onSearch (id); setId ("")}}>Agregar</button>  {/* a onSearch le pasamos como argumento el valor de id para que de este manera cuando se ejecute onSearch (lo que hace es agregar el nuevo personaje al array y mostrarlo en pnatalla) muestre al personaje con el id correspondiente .
         ademas creamos un arrow function para que se ejecute luego de hacer click porque sino siepre se estaria invocando 
         por ultimo el set("") lo que hace es borrar el numero ingresado en el imput para que queda mas estetico */}
      </div>
   );
}


// onChange es como decir (estate atento a eso y si hay un cambio ejecuta lo siquiente) addeventlistener 