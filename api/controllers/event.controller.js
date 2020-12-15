const EventModel = require("../models/event.model");

class EventController {
  static getAll(req, res) {
    EventModel.findAll((err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static getById(req, res) {
    EventModel.findById({ id: parseInt(req.params.id) }, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static getAllByBuildingId(req, res) {
    EventModel.findByBuildingId(
      [parseInt(req.params.building_id)],
      (err, result) => {
        if (err) {
          res.status(500).send(JSON.stringify({ err }));
        } else {
          res.status(200).send(result);
        }
      }
    );
  }

  static createOne(req, res) {
    EventModel.create(req.body, (err, results) => {
      if (err) {
        res.status(500).send(JSON.stringify({ err }));
      }
      res.status(201).json(results);
    });
  }

  static updateOne(req, res) {
    EventModel.updateBy(req.body, { id: req.params.id }, (err, results) => {
      if (err) {
        res.status(500).send(JSON.stringify({ err }));
      }
      res.status(202).json(results);
    });
  }

  static deleteOne(req, res) {
    EventModel.deleteBy({ id: req.params.id }, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(202).send(`This event is delete : ${req.params.id}`);
    });
  }
}

module.exports = EventController;
