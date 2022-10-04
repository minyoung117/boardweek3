const express = require('express');
const connect = require('./schemas/index.js')
const app = express();
const port = 8080
const postsRouter = require('./routes/posts.js')
const commentsRouter = require('./routes/comments')
//const commentsRouter = require('./routes/comments')
connect();

app.use(express.json());
app.use('/api', [postsRouter, commentsRouter]);
app.get('/', (req, res) => {
  res.send('테스트테스트')
})

app.listen(port, () => {
  console.log(port, '포트로 서버가 켜졌어요!!')
})