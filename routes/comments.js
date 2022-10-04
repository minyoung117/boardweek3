const express = require('express');
const Posts = require('../schemas/post.js');
const router = express.Router();
const Comment = require('../schemas/comments')

//댓글작성 
router.post('/comment/:_id', async (req, res) => {
  const { _id } = req.params
  const { user, password, content } = req.body;

  await Comment.create({ boardId: _id, user: user, password: password, content: content });
  res.send({ message: "댓글을 생성하였습니다." })
})
//댓글 조회
router.get('/comment/:_id', async (req, res) => {
  const { _id } = req.params
  const comment = await Comment.find({ boardId: _id }).select('_id user password content')
  res.json(comment)
})
//댓글 수정
router.put('/comment/:id', async (req, res) => {
  const { _id } = req.params;
  const { password, content } = req.body;
  console.log(password, content)
  const existsComments = await Comment.find({ boardId: _id })
  if (password === existsComments[0].password) {
    await Comment.updateOne({ boardId: _id }, { $set: { content } })
    res.json({ message: "댓글 수정 완료 " })
  }
  res.json({ message: "입력하신 정보가 일치하지 않습니다." })
})
//댓글 삭제 
router.delete('/comment/:_id', async (req, res) => {
  const { _id } = req.params;
  const { password } = req.body;

  const existsComments = await Comment.find({ _id: _id })
  if (password === existsComments[0].password) {
    await Comment.deleteOne({ _id: _id })
    res.json({ message: "댓글 삭제 완료!!" })
  }
  res.json({ message: "입력하신 정보가 일치하지 않습니다요." })
})

module.exports = router


