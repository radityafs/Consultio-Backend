const { v4: uuidv4 } = require("uuid");

const { db } = require("../config");

module.exports = {
  isPostAvailable: async (data) => {
    const { postId } = data;

    const query = `SELECT * FROM posts WHERE postId = '${postId}';`;

    return new Promise((resolve, reject) => {
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },
  getCountAllPost: async (data) => {
    const { search, user } = data;

    const query = `SELECT COUNT(*) AS count FROM posts 
    ${search || user ? "WHERE" : ""}

    ${search ? `posts.story LIKE '%${search}%'` : ""}

    ${search && user ? " AND " : ""}

    ${user ? `posts.userId = '${user}'` : ""}
    ;`;

    return new Promise((resolve, reject) => {
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result[0].count);
        }
      });
    });
  },

  getPost: async (data) => {
    const { offset, limit, search, user, userId } = data;

    const query = `SELECT posts.postId, 
      posts.userId, 
      users.fullname AS Author,
      users.photo AS profilePhoto,
      posts.story, 
      attachments.fileName AS attachment,
      (SELECT COUNT(commentId) FROM comments WHERE posts.postId = comments.postId) AS commentsCount,
      (SELECT COUNT(likeId) FROM likes WHERE posts.postId = likes.postId) AS likesCount,
      (SELECT COUNT(likeId) FROM likes WHERE posts.postId = likes.postId AND likes.userId = '${userId}') AS isLiked,
      posts.updatedAt,
      posts.createdAt,
      posts.isAnonymous

      FROM posts
      LEFT JOIN attachments ON posts.postId = attachments.postId 
      LEFT JOIN users ON posts.userId = users.userId
      
      
      ${search || user ? "WHERE" : ""}

      ${search ? `posts.story LIKE '%${search}%'` : ""}

      ${search && user ? " AND " : ""}

      ${user ? `posts.userId = '${user}'` : ""}

      
      ORDER BY createdAt DESC LIMIT ${limit} OFFSET ${offset};`;

    return new Promise((resolve, reject) => {
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },
  getPostById: async (data) => {
    const { id, userId } = data;
    const query = `SELECT posts.postId, 
    posts.userId, 
    users.fullname AS Author, 
    users.photo AS profilePhoto,
    posts.story, 
    attachments.fileName AS attachment,
    (SELECT COUNT(commentId) FROM comments WHERE posts.postId = comments.postId) AS commentsCount,
    (SELECT COUNT(likeId) FROM likes WHERE posts.postId = likes.postId) AS likesCount,
    (SELECT COUNT(likeId) FROM likes WHERE posts.postId = likes.postId AND likes.userId = '${userId}') AS isLiked,
    posts.updatedAt,
    posts.createdAt,
    posts.isAnonymous

    FROM posts
    LEFT JOIN attachments ON posts.postId = attachments.postId 
    LEFT JOIN users ON posts.userId = users.userId
    
    WHERE posts.postId = '${id}';`;

    return new Promise((resolve, reject) => {
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },

  CreatePost: async (data) => {
    let { attachment, story, userId, isAnonymous } = data;
    const postId = uuidv4();

    isAnonymous = isAnonymous ? (isAnonymous = 1) : (isAnonymous = 0);

    if (attachment) {
      const attachmentId = uuidv4();

      const insertAttachment = `INSERT INTO attachments (attachmentId, userId, postId, fileName) VALUES ('${attachmentId}', '${userId}', '${postId}', '${attachment}');`;

      await db.query(insertAttachment);

      const insertPost = `INSERT INTO posts(postId, userId, story, attachmentId,isAnonymous) VALUES ('${postId}', '${userId}', '${story}', '${attachmentId}', ${isAnonymous});`;

      return new Promise((resolve, reject) => {
        db.query(insertPost, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    }

    const insertPost = `INSERT INTO posts(postId, userId, story,isAnonymous) VALUES ('${postId}', '${userId}', '${story}','${isAnonymous}');`;

    return new Promise((resolve, reject) => {
      db.query(insertPost, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
};
