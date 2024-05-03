// Importa tus modelos y cualquier módulo necesario
const Post = require('../models/Post.model');
const User = require('../models/User.model');
const Application = require('../models/Application.model');

//Función para crear aplicaciones para cada usuario asociado al primer post
async function seedData() {
  try {
    // Encuentra todos los posts
    const posts = await Post.find();

    // Encuentra todos los usuarios
    const users = await User.find();

    // Mapea sobre cada usuario para crear aplicaciones
    const appsPromises = users.map(async (user) => {
      // Crea una aplicación para cada usuario asociado al primer post
      await Application.create({
        user: user._id,
        post: posts[0]._id
      });
    });

    // Espera a que se creen todas las aplicaciones
    const apps = await Promise.all(appsPromises);

    console.log(apps); // Log las aplicaciones creadas
  } catch (error) {
    console.error(error); // Maneja cualquier error
  }
}

// Exporta la función para que pueda ser llamada desde otro archivo si es necesario
module.exports = seedData;
