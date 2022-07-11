import db from "../common/connect.js";
import User from "../models/user.js";

const Post = function (post) {
  this.id = post.id;
  this.nameAuthor = post.nameAuthor;
  this.message = post.message;
  this.selectedFile = post.selectedFile;
  this.like = post.like;
  this.comment = post.comment;
};

Post.get_All = (result) => {
  db.query("SELECT * FROM posts", (error, res) => {
    if (error) {
      result("Cant get posts");
    } else result(res.reverse());
  });
};
Post.getById = (id, result) => {
  db.query(`SELECT * FROM posts WHERE id = ${id}`, (error, res) => {
    if (error || res.length == 0) {
      result(null);
    } else result(res[0]);
  });
};
Post.create = (newData, result) => {
  db.query("INSERT INTO posts SET ?", newData, (error, res) => {
    if (error) {
      result(null);
    } else result({ id: res.insertId, ...newData });
  });
};
Post.delete = (id, result) => {
  db.query(`DELETE FROM posts WHERE id = ${id}`, (error, res) => {
    if (error || res.length == 0) {
      result(null);
    } else result(`Delete Post success`);
  });
};
Post.update = (listData, result) => {
  db.query(
    "UPDATE posts SET message=?,selectedFile=? WHERE id=?",
    [listData.message, listData.selectedFile, listData.id],
    (error, res) => {
      if (error) {
        result(null);
      } else result(listData);
    }
  );
};
Post.liking = (dataLike, result) => {
  db.query("INSERT INTO likes SET ?", dataLike, (error, res) => {
    if (error) {
      result(null);
    } else {
      db.query(
        "UPDATE posts SET likes = likes + 1 WHERE id = ?",
        dataLike.postId,
        (error2, res2) => {
          result({ id: res.insertId, ...dataLike });
        }
      );
    }
  });
};
Post.dislike = (dataLike, result) => {
  db.query(
    "DELETE FROM likes WHERE postId= ?;",
    dataLike.postId,
    (error, res) => {
      if (error) {
        result(null);
      } else {
        db.query(
          "UPDATE posts SET likes = likes - 1 WHERE id = ?",
          dataLike.postId,
          (error2, res2) => {
            result({ id: res.insertId, ...dataLike });
          }
        );
      }
    }
  );
};
const newUserLike = async (dataLike) => {
  var newUser = {
    // id: dataLike.id,
    name: dataLike.name,
    email: dataLike.email,
  };
  await User.create(newUser, (respone) => {
    return respone;
  });
};
Post.like = (dataLike, result) => {
  if (Number.isInteger(dataLike.userId))
    db.query(
      `SELECT * FROM likes WHERE postId = ${dataLike.postId} AND userId = ${dataLike.userId}`,
      async (error, res) => {
        if (error) {
          console.log(error);
        } else {
          if (res[0] == null) {
            Post.liking(dataLike, (respone) => {
              result({ status: "Like", data: respone });
            });
          } else {
            Post.dislike(dataLike, (respone) => {
              result({ status: "DisLike", data: respone });
            });
          }
        }
      }
    );
  else {
    User.getByEmail(dataLike.email, async (respone) => {
      if (!respone) {
        var newUser = {
          // id: dataLike.id,
          name: dataLike.name,
          email: dataLike.email,
        };
        await User.create(newUser, async (respone) => {
          const newDataLike = {
            userLiking: dataLike.name,
            postId: dataLike.postId,
            userId: respone?.id,
          };
          Post.liking(newDataLike, (respone) => {
            result({ status: "Like", data: respone });
          });
        });
      } else {
        db.query(
          `SELECT * FROM likes WHERE postId = ${dataLike.postId} AND userId = ${respone.id}`,
          async (error, res) => {
            if (error) {
              console.log(error);
            } else {
              const newdataLike = {
                userLiking: dataLike.name,
                postId: dataLike.postId,
                userId: respone.id,
              };
              if (res[0] == null) {
                Post.liking(newdataLike, (respone) => {
                  result({ status: "Like", data: respone });
                });
              } else {
                Post.dislike(newdataLike, (respone) => {
                  result({ status: "DisLike", data: respone });
                });
              }
            }
          }
        );
      }
    });
  }
};
Post.getLikeById = (id, result) => {
  db.query(`SELECT postId FROM likes WHERE userId = ${id}`, (error, res) => {
    var ArrPostLike = [];
    for (var i = 0; i < res?.length; i++) {
      ArrPostLike.push(res[i]?.postId);
    }
    if (error) {
      result(null);
    } else result(ArrPostLike);
  });
};
Post.comment = (newData, result) => {
  db.query("INSERT INTO comments SET ?", newData, (error, res) => {
    if (error) {
      result(null);
    } else result({ id: res.insertId, ...newData });
  });
};

Post.getCommentByPostId = (arrPostId, result) => {
  db.query(
    `SELECT * FROM comments where postId in ${arrPostId}`,
    (error, res) => {
      if (error) {
        result(null);
      } else result(res);
    }
  );
};
Post.isAuthorByPostId = (postId, result) => {
  db.query(`SELECT * FROM posts where id = ${postId}`, (error, res) => {
    if (error) {
      result(null);
    } else result(res);
  });
};

export default Post;
