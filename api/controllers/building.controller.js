const BuildingModel = require("../models/building.model");

class BuildingController {
  static getAll(req, res) {
    BuildingModel.findAll((err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static getById(req, res) {
    BuildingModel.findById({ id: parseInt(req.params.id) }, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static getAllByZip(req, res) {
    BuildingModel.findByZipCode([req.params.zip_code], (err, result) => {
      if (err) {
        res.status(500).send(JSON.stringify({ err }));
      } else {
        res.status(200).send(result);
      }
    });
  }

  static createOne(req, res) {
    BuildingModel.create(req.body, (err, results) => {
      if (err) {
        res.status(500).send(JSON.stringify({ err }));
      }
      res.status(201).json(results);
    });
  }

  static updateOne(req, res) {
    BuildingModel.updateBy(req.body, { id: req.params.id }, (err, results) => {
      if (err) {
        res.status(500).send(JSON.stringify({ err }));
      }
      res.status(202).json(results);
    });
  }

  static deleteOne(req, res) {
    BuildingModel.deleteBy({ id: req.params.id }, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(202).send(`This building is delete : ${req.params.id}`);
    });
  }
}

module.exports = BuildingController;
