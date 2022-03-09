const Model = require("../models/recipe");
const multer = require("multer");

class Controller {
  getAll(req, res, next) {
    Model.find({}, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }

  get(req, res, next) {
    let { id } = req.params;
    Model.findOne({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }

  getByTitle(req, res, next) {
    let body = req.params.id;
    Model.find({ title: { $regex: body , $options:"i"} }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }

  getByCategory(req, res, next) {
    let { id } = req.params;
    Model.find({ category: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }

  post(req, res, next) {
    let body = req.body;
    let recipe = new Model(body);
    console.log(recipe);
    recipe.save((err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }

  put(req, res, next) {
    let body = req.body;
    let { id } = req.params;
    Model.updateOne(
      { _id: id },
      {
        $set: body,
      },
      (err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
      }
    );
  }

  delete(req, res, next) {
    let { id } = req.params;
    Model.findByIdAndDelete({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }

}

const controller = new Controller();
module.exports = controller;

