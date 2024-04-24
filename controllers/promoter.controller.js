const mongoose = require("mongoose");
const Promoter = require("../models/Promoter.model");

module.exports.promoterProfile = (req, res, next) => {
    res.render("promoter/profile");
};