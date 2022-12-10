const sql = require("./db");

// constructor
const List = function (list) {
  this.title = list.title;
  this.description = list.description;
  this.published = list.published;
};

List.create = (newlist, result) => {
  sql.query("INSERT INTO lists SET ?", newlist, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created list: ", { id: res.insertId, ...newlist });
    result(null, { id: res.insertId, ...newlist });
  });
};

List.findById = (id, result) => {
  sql.query(`SELECT * FROM lists WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found list: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found list with the id
    result({ kind: "not_found" }, null);
  });
};

List.getAll = (title, result) => {
  let query = "SELECT * FROM lists";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("lists: ", res);
    result(null, res);
  });
};

List.getAllPublished = (result) => {
  sql.query("SELECT * FROM lists WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("lists: ", res);
    result(null, res);
  });
};

List.updateById = (id, list, result) => {
  sql.query(
    "UPDATE lists SET title = ?, description = ?, published = ? WHERE id = ?",
    [list.title, list.description, list.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found list with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated list: ", { id: id, ...list });
      result(null, { id: id, ...list });
    }
  );
};

List.remove = (id, result) => {
  sql.query("DELETE FROM lists WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found list with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted list with id: ", id);
    result(null, res);
  });
};

List.removeAll = (result) => {
  sql.query("DELETE FROM lists", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} lists`);
    result(null, res);
  });
};

module.exports = List;
