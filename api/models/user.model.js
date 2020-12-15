const db = require("../config/db");

class UserModel {
  static findAll(callback) {
    db.query(
      "SELECT id, username, firstname, lastname, email, building_id FROM user ORDER BY username ASC",
      callback
    );
  }

  static findAllWithoutOne(where, callback) {
    db.query(
      "SELECT id, username, firstname, lastname, email, building_id FROM user WHERE id <> ? ORDER BY username ASC",
      [where, where],
      callback
    );
  }

  static findOneWithBuilding(where, callback) {
    db.query(
      "SELECT U.id, U.username, U.firstname, U.lastname, U.email, U.building_id, B.id, B.adress, B.zip_code, B.city FROM user AS U LEFT OUTER JOIN building AS B ON U.building_id=B.id WHERE U.id = ?",
      [where],
      callback
    );
  }

  static findBy(where, callback) {
    db.query(
      "SELECT id, username, firstname, lastname, email, building_id FROM user WHERE username = ? OR email = ?",
      where,
      callback
    );
  }

  static findById(where, callback) {
    db.query(
      "SELECT id, username, firstname, lastname, email, building_id FROM user WHERE ?",
      where,
      callback
    );
  }

  static findAllInBuilding(where, callback) {
    db.query(
      "SELECT id, username, firstname, lastname, email, building_id FROM user WHERE ? ORDER BY lastname ASC",
      where,
      callback
    );
  }

  static findByLogin(body, callback) {
    db.query(
      "SELECT id, username, firstname, lastname, email, building_id FROM user WHERE email = ? AND password = ?",
      body,
      callback
    );
  }

  static create(data, callback) {
    db.query("INSERT INTO user SET ?", data, callback);
  }

  static updateBy(data, where, callback) {
    db.query("UPDATE user SET ? WHERE ?", [data, where], callback);
  }

  static deleteBy(where, callback) {
    db.query("DELETE FROM user WHERE ?", where, callback);
  }
}

module.exports = UserModel;
