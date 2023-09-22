const URL = "https://rickandmortyapi.com/api/character/";
const axios = require("axios");

const getCharById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`${URL}${id}`);

    const character = {
      id: data.id,
      name: data.name,
      gender: data.gender,
      species: data.species,
      origin: data.origin,
      image: data.image,
      status: data.status,
    };
    return character.name
      ? res.status(200).json(character)
      : res.status(404).send("Not found");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getCharById,
};

// const axios = require("axios"); // axios para hacer peticiones asincronas a la api
// // axios o fetch las dos son promesas , por eso generan insertidumbre por eso hay que trabajar siempre con las dos opcions (caso de exito y caso de error)

// const getCharById = (res, id) => {
//   axios(`https://rickandmortyapi.com/api/character/${id}`)
//     .then((response) => response.data) //la info de axios viaja la respuesta del servidor (lo que consultemos)
//     // caso de existo success
//     .then(({ name, gender, species, origin, image, status }) => {
//       // hicimos destructuring de la respuesta (value) de la promesa
//       // then sigue recibiendo una promesa (caso de exito) / al ser exito estamos trabajando con un value
//       const character = {
//         id,
//         name,
//         gender,
//         species,
//         origin,
//         image,
//         status,
//       };
//       res.writeHead(200, { "Content-Type": "application/json" });
//       return res.end(JSON.stringify(character));
//     })
//     .catch((error) => {
//       return res
//         .writeHead(500, { "Content-Type": "text/plain" })
//         .end(error.message);
//     });
// };

// module.exports = {
//   getCharById,
// };

// la responsabilidad de las url es aceptar una request y dar una response
// lo then tambien son promesas , eso tambien genera un insertidumbre y puedo concatenarlos para pasar la informacion
