const db = require("../config/db");

class ParticipeModel {
  static findAll(callback) {
    db.query("SELECT event_id, user_id FROM participant", callback);
  }

  static findByEventsId(where, callback) {
    db.query(
      "SELECT P.event_id, P.user_id, U.firstname, U.lastname, U.id AS userId FROM participant AS P INNER JOIN user AS U ON P.event_id = ? AND U.id=P.user_id ORDER BY U.lastname ASC",
      where,
      callback
    );
  }

  static create(data, callback) {
    db.query("INSERT INTO participant SET ?", data, callback);
  }

  static deleteBy(where, callback) {
    db.query(
      "DELETE FROM participant WHERE user_id = ? AND event_id = ?",
      where,
      callback
    );
  }
}

module.exports = ParticipeModel;
