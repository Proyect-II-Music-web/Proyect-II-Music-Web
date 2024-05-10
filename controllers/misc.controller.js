const Post = require("../models/Post.model");
module.exports.getHome = (req, res, next) => {
  // Obtener la fecha actual y la fecha un mes después
  const currentDate = new Date();
  const oneMonthLater = new Date(currentDate);
  oneMonthLater.setMonth(oneMonthLater.getMonth() + 6);

  // Realizar la consulta para encontrar eventos entre la fecha actual y un mes después
  Post.find({
    date: {
      $gte: currentDate,
      $lte: oneMonthLater,
    },
    isClosed: true
  })
    .then((posts) => {
      res.render("home", { posts });
    })
    .catch((err) => next(err));
};
