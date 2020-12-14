const db = require("../config/db");

class BuildingModel {
  static findAll(callback) {
    db.query("SELECT id, adress, zip_code, city FROM building", callback);
  }

  static findById(where, callback) {
    db.query(
      "SELECT id, adress, zip_code, city FROM building WHERE id = ?",
      where,
      callback
    );
  }

  static findByZipCode(where, callback) {
    db.query(
      "SELECT id, adress, zip_code, city FROM building WHERE zip_code = ?",
      where,
      callback
    );
  }

  static create(data, callback) {
    db.query("INSERT INTO building SET ?", data, callback);
  }

  static updateBy(data, where, callback) {
    db.query("UPDATE building SET ? WHERE ?", [data, where], callback);
  }

  static deleteBy(where, callback) {
    db.query("DELETE FROM building WHERE ?", where, callback);
  }
}

module.exports = BuildingModel;
