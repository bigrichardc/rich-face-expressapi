const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  getPosts: function (req, res) {
    console.log('Getting...');
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
  insertPost: function (req, res) {
    console.log('Inserting...');
    const { postTitle, username, postText, postImage } = req.body;

    pool.query(
      'INSERT INTO posts (postTitle, username, postText, postImage) VALUES ($1, $2, $3, $4)',
      [postTitle, username, postText, postImage],
      (err, results) => {
        if (err) {
          throw err;
        }
        res.status(201).send(`Post ${postTitle} added`);
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

    pool.query('DELETE FROM posts WHERE postId = $1', [id], (err, results) => {
      if (err) {
        throw errl;
      }
      res.status(200).send(`Post ${id} deleted`);
    });
  },
};
