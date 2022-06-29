import db from "../common/connect.js";
import bcrypt from "bcryptjs";

const User = function (user) {
  this.id = user.id;
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
  this.selectedFile = user.selectedFile;
};

User.get_All = (result) => {
  db.query("SELECT * FROM users", (error, res) => {
    if (error) {
      result(null);
    } else result(res);
  });
};
User.getById = (id, result) => {
  db.query(`SELECT * FROM users WHERE id = ${id}`, (error, res) => {
    if (error || res.length == 0) {
      result(null);
    } else result(res[0]);
  });
};
User.getByEmail = (email, result) => {
  db.query(`SELECT * FROM users WHERE email = "${email}"`, (error, res) => {
    if (error) {
      result(null);
    } else result(res[0]);
  });
};
User.create = (newData, result) => {
  db.query("INSERT INTO users SET ?", newData, (error, res) => {
    if (error) {
      result(null);
    } else {
      result({ id: res.insertId, ...newData });
    }
  });
};
User.delete = (id, result) => {
  db.query(`DELETE FROM users WHERE id = ${id}`, (error, res) => {
    if (error || res.length == 0) {
      result(null);
    } else result(`Delete User id:${id} success`);
  });
};
User.update = (listData, result) => {
  db.query(
    "UPDATE users SET name=?,email=?,password=? WHERE id=?",
    [listData.name, listData.email, listData.password, listData.id],
    (error, res) => {
      if (error) {
        result(null);
      } else result(listData);
    }
  );
};
User.check_login = async (data, result) => {
  db.query(`SELECT * FROM users WHERE email=?`, [data.email], (error, res) => {
    if (error || res.length == 0) {
      result(null);
    } else {
      bcrypt.compare(data.password, res[0].password, function (err, respone) {
        if (err) result("Cant hash password");
        if (respone) {
          result({ name: res[0].name, email: res[0].email });
        }
      });
    }
  });
};
User.add_refresh_token = (newData, result) => {
  db.query("INSERT INTO refreshtokens SET ?", newData, (error, res) => {
    if (error) {
      result(null);
    } else {
      result({ id: res.insertId, ...newData });
    }
  });
};
User.get_refresh_token = async (user, result) => {
  db.query(
    `SELECT * FROM refreshtokens WHERE userEmail=?`,
    user,
    (error, res) => {
      if (error || res.length == 0) {
        result(null);
      } else {
        result(res);
      }
    }
  );
};

export default User;
