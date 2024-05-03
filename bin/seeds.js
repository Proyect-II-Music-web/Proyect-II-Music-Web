const mongoose = require('mongoose');
const User = require('../models/User.model');
const Band = require('../models/Band.model');

mongoose.connect('mongodb://localhost:27017/music-web', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Conexión a la base de datos establecida.');

  // Leer el archivo JSON con los datos de los usuarios y sus bandas
  const usuariosConBandas = require('../data/users.json');

  // Iterar sobre cada usuario con su banda
  for (const data of usuariosConBandas) {
    // Crear el usuario
    const usuario = await User.create(data.user);

    // Asignar al usuario como propietario de la banda
    data.band.owner = usuario._id;

    // Crear la banda
    await Band.create(data.band);
  }

  console.log('Seed completado');
  mongoose.connection.close(); // Cerrar la conexión después de que se complete el seed
}).catch(error => {
  console.error('Error durante el seed:', error);
  mongoose.connection.close(); // Cerrar la conexión en caso de error
});
