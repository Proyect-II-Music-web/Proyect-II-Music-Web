const Post = require("../models/Post.model");
module.exports.getHome = (req, res, next) => {
  const {page = 0} = req.query

  const ITEMS_PER_PAGE = 3

  const limit = page ? page * ITEMS_PER_PAGE + ITEMS_PER_PAGE : ITEMS_PER_PAGE

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
  .limit(limit)
    .then((posts) => {
      res.render("home", { posts, nextPage: posts.length < limit ? null : Number(page) + 1 });
    })
    .catch((err) => next(err));
};
