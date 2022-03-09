const user = require("../models/users");

class Controller {
  async AllUsers(req, res, next) {
    user.find({}, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }
  async Oneuser(req, res, next) {
    let { id } = req.params;
    user.findById(id, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }
  async InsertUser(req, res, next) {
    const mv = new user({
      username: req.body.username,
      password: req.body.password,
      phone: req.body.phone,
      email: req.body.email,
    });
    mv.save({}, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }
  async deleteUser(req, res, next) {
    let { id } = req.params;
    user.deleteOne({ _id: id }, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }
  async UpdateUser(req, res, next) {
    const newUser = {
      username: req.body.username,
      password: req.body.password,
      phone: req.body.phone,
      email: req.body.email,
    };
    let { id } = req.params;
    user.updateOne({ _id: id }, { $set: newUser }, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }
  async validationUser(req, res, next) {
    const userr = await user.findOne({ email: req.body.email });
    if (!userr) return res.send("email not exist");
    if (req.body.password !== userr.password)
      return res.send("invalid password");
    res.send("done");
  }
}
const controller = new Controller();
module.exports = controller;
