const ParticipeModel = require("../models/participe.model");

class ParticipeController {
  static getAll(req, res) {
    ParticipeModel.findAll((err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static getAllByEventsId(req, res) {
    ParticipeModel.findByEventsId(
      [parseInt(req.params.event_id)],
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
    ParticipeModel.create(req.body, (err, results) => {
      if (err) {
        res.status(500).send(JSON.stringify({ err }));
      }
      res.status(201).json(results);
    });
  }

  static deleteOne(req, res) {
    ParticipeModel.deleteBy(
      [req.query.user_id, req.query.event_id],
      (err, results) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(202).send(`Participation annulée`);
      }
    );
  }

  static deleteAllByEventId(req, res) {
    ParticipeModel.deleteByEventId(
      [parseInt(req.query.event_id)],
      (err, results) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(202).send(`Participations annulées`);
      }
    );
  }
}

module.exports = ParticipeController;
