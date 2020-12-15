const db = require("../config/db");

class EventModel {
  static findAll(callback) {
    db.query(
      "SELECT id, admin_id, datetime, building_id, nb_places, recycling_center_id, is_active FROM events WHERE is_active = true ORDER BY datetime ASC",
      callback
    );
  }

  static findById(where, callback) {
    db.query(
      "SELECT id, admin_id, datetime, building_id, nb_places, recycling_center_id, is_active FROM events WHERE id = ?",
      where,
      callback
    );
  }

  static findByBuildingId(where, callback) {
    db.query(
      "SELECT E.id AS eventId, E.admin_id, E.datetime, E.building_id, E.nb_places, E.recycling_center_id, E.is_active, U.firstname, U.lastname, U.id AS userId, B.adress, B.zip_code, B.city FROM events AS E LEFT OUTER JOIN user AS U ON E.building_id = ? AND U.id=E.admin_id LEFT OUTER JOIN building AS B ON E.building_id = B.id ORDER BY E.datetime ASC",
      where,
      callback
    );
  }

  static create(data, callback) {
    db.query("INSERT INTO events SET ?", data, callback);
  }

  static updateBy(data, where, callback) {
    db.query("UPDATE events SET ? WHERE ?", [data, where], callback);
  }

  static deleteBy(where, callback) {
    db.query("DELETE FROM events WHERE ?", where, callback);
  }
}

module.exports = EventModel;
