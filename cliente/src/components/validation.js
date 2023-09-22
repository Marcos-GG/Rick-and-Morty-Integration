
const validation = (userData) => {   // userData es el parametro enviado desde el componente form por medio de handleChange

    const errors = {}
    if(!/\S+@\S+\.\S+/.test(userData.email)){  // .test es un metodo ¿quien quiero saber si es un email ? => EMAIL
        errors.email = "El email es incorrecto"     // si no es ! un email se tira un mensaje de error 
                                                    // erros.email crea una pripiedad llamada email dentro del objeto "errors" que creamos 
    }
    if(!userData.email){                         // valida si esta vacio o no 
        errors.email = "El imput esta vacio"
    }
    if(userData.email.length > 35){          // valida que no sea mayor a 35 
        errors.email = "el numero de caracteres es demasiado"
    }

    if(!/.*\d+.*/.test(userData.password)){         // lo mismo que hace en email en cuanto a la estructura solicitada pero controla que password contena al menos un numero 
        errors.password = "La contraseña debe tener al menos un numero"
    }

    if(userData.password.length < 7 || userData.password.length > 10){  // valida si es menor a siete o mayor a 10 caracteres
        errors.password = "La contraseña no debe ser menor a 6 y no mayor a 10 caracteres"
    }


    return errors; // retornamos errors , de esta manera en form "setErros(validation({}))" su  valor va a ser este objeto que estamos retornando porque siempre el valor que tenga la funcion va a ser SU VALOR DE RETORNO y en este caso la funcion validation esta retornando un objeto llamado errors
}

export default validation;

// las funciones tambien se pueden exportar 
// hacemos validaciones tanto para email y password