const UserModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const { generatePassword } = require("../lib/utils");
const { JWTGenerate } = require("../lib/JWT");

class UserController {
  static getAll(req, res) {
    UserModel.findAll((err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static getAllWithoutOne(req, res) {
    UserModel.findAllWithoutOne([req.query.userId], (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static getAllInBuilding(req, res) {
    UserModel.findAllInBuilding(
      { building_id: req.params.building_id },
      (err, results) => {
        if (err) {
          res.status(500).send(err);
        }
        res.send(results);
      }
    );
  }

  static findallbyUserId(req, res) {
    UserModel.findAllBy([req.query.userId], (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static getOne(req, res) {
    UserModel.findById({ id: parseInt(req.params.id) }, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static login(req, res) {
    UserModel.findByLogin(
      [req.body.email, generatePassword(req.body.password)],
      (err, results) => {
        if (err) {
          res.status(500).send(err);
        } else {
          if (results[0] !== undefined) {
            const id = results[0].id;
            const username = results[0].username;
            const email = results[0].email;
            let token = JWTGenerate(
              req,
              JSON.parse(JSON.stringify(results[0])),
              60
            );
            res
              .status(200)
              .send({ token, id: id, email: email, username: username });
          } else {
            res.sendStatus(401);
          }
        }
      }
    );
  }

  static findAllBy(req, res) {
    UserModel.findBy([req.body.username, req.body.email], (err, result) => {
      if (err) {
        res.status(500).send(JSON.stringify({ err }));
      } else {
        res.status(200).send(result);
      }
    });
  }

  static createOne(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors });
    } else {
      UserModel.findBy([req.body.username, req.body.email], (err, result) => {
        if (err) {
          res.status(500).send(JSON.stringify({ err }));
        } else {
          console.log("Result in findBy : ", result);
          if (result[0] === undefined) {
            req.body.password = generatePassword(req.body.password);
            UserModel.create(req.body, (err, results) => {
              if (err) {
                res.status(500).send(JSON.stringify({ err }));
              }
              res.status(201).json(`User added`);
            });
          } else {
            res
              .status(409)
              .send(
                JSON.stringify({ duplicate: "username or email already exist" })
              );
          }
        }
      });
    }
  }

  static updateOne(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      req.body.password = generatePassword(req.body.password);
      UserModel.updateBy(req.body, { id: req.params.id }, (err, results) => {
        if (err) {
          res.status(500).send(JSON.stringify({ err }));
        }
        res.status(202).json(results);
      });
    }
  }

  static deleteOne(req, res) {
    UserModel.deleteBy({ id: req.params.id }, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(202).send(`This user is delete : ${req.params.id}`);
    });
  }
}

module.exports = UserController;
