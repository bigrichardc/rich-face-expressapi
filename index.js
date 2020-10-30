const express = require('express');
var cors = require('cors');
import bodyParser from 'body-parser';
import {
  getPosts,
  getPostById,
  insertPost,
  updatePost,
  deletePost,
  getComments,
  getCommentsByPostId,
  insertComment,
} from './src/queries/queries';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({ info: 'Server is alive on 4000' });
});

app.route('/posts').get(getPosts);
app.route('/posts/:id').get(getPostById);
app.route('/posts/:id/comments').get(getCommentsByPostId);
app.route('/comments').get(getComments);
app.route('/posts').post(insertPost);
app.route('/posts/:id').put(updatePost);
app.route('/posts/:id').delete(deletePost);
app.route('/comments').post(insertComment);

app.listen(PORT, () => console.log('Server running on ' + PORT));
