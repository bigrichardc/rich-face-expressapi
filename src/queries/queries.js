const { Pool } = require('pg');
/*const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

*/
const pool = new Pool({
  user: 'richard',
  host: 'localhost',
  database: 'rich_face_api',
  password: 'password',
  port: 5432,
});

module.exports = {
  getPosts: function (req, res) {
    console.log('Getting posts...');
    pool.query('SELECT * FROM posts ORDER BY postId ASC', (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results.rows);
    });
  },
  getPostById: function (req, res) {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM posts WHERE postId = $1', [id], (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results.rows);
    });
  },
  getCommentsByPostId: function (req, res) {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM comments WHERE postId = $1', [id], (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results.rows);
    });
  },
  getComments: function (req, res) {
    console.log('Getting comments....');
    pool.query('SELECT * FROM comments', (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results.rows);
    });
  },
  insertPost: function (req, res) {
    console.log('Inserting blogpost...');
    console.log(req.body);
    const { posttitle, username, posttext, postimage } = req.body.blogpost;

    pool.query(
      'INSERT INTO posts (postTitle, username, postText, postImage, postdate) VALUES ($1, $2, $3, $4, current_date) returning postid',
      [posttitle, username, posttext, postimage],
      (err, results) => {
        const post_id = results.rows[0].postid;
        if (err) {
          throw err;
        }
        res.status(201).json({
          postid: post_id,
        });
        //res.status(201).send(`Post ${posttitle} added`);
      }
    );
  },
  updatePost: function (req, res) {
    const id = parseInt(req.params.id);
    console.log('Updating...');

    const { postTitle, username, postText, postImage } = req.body;
    pool.query(
      'UPDATE posts SET postTitle = $1, username = $2, postText = $3, postImage = $4 WHERE postId = $5',
      [postTitle, username, postText, postImage, id],
      (err, results) => {
        if (err) {
          throw err;
        }
        res.status(200).send(`Post ${postTitle} modified `);
      }
    );
  },
  deletePost: function (req, res) {
    const id = parseInt(req.params.id);
    console.log('Deleting...');
    console.log(`DELETE FROM posts WHERE postId = ${id}`);
    pool.query('DELETE FROM posts WHERE postId = $1', [id], (err, results) => {
      if (err) {
        throw err;
      }
      pool.query('DELETE FROM comments WHERE postId = $1', [id], (err, results) => {
        console.log('got here');
        if (err) {
          throw err;
        }
        res.status(200).send(`Post ${id} deleted`);
      });
    });
  },
  insertComment: function (req, res) {
    console.log('Inserting...');
    console.log(req.body);
    const { postid, commentauthor, commenttext, commentdate } = req.body.comment;

    pool.query(
      'INSERT INTO comments (postid, commentauthor, commenttext, commentdate) VALUES ($1, $2, $3, $4)',
      [postid, commentauthor, commenttext, commentdate],
      (err, results) => {
        if (err) {
          throw err;
        }
        res.status(201).send(`Comment for ${postid} added b ${commentauthor}`);
        console.log(`Comment for ${postid} added b ${commentauthor}`);
      }
    );
  },
};
