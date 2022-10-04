const express = require('express');
const Posts = require('../schemas/post');
const router = express.Router();




//게시글 조회
router.get('/posts', async (req, res) => {
  const postAll = await Posts.find().sort({ date: -1 })
  const [...posts] = postAll.map((post) => {
    return {
      _id: post._id,
      title: post.title,
      user: post.user,
      ceratedAt: post.createdAt
    }
  })
  res.json(posts)
});
//게시글 작성
router.post('/posts', async (req, res) => {
  const { title, user, password, content } = req.body;
  await Posts.create({ title: title, user: user, password: password, content: content })
  res.send({ message: "게시글 작성 완료" })
})
//게시글 상세조회
router.get('/posts/:_id', async (req, res) => {
  const { _id } = req.params;
  const post = await Posts.findOne({ _id }).select("_id title user date content ");
  res.json(post)

  // res.json({
  //   title: post.title,
  //   user: post.user,
  //   createdAt: post.createdAt,
  //   content: post.content
  // })

})
//게시글 수정 PUT
router.put("/posts/:_id", async (req, res) => {
  const { _id } = req.params;
  const { password, title, content } = req.body;
  const existsPosts = await Posts.find({ _id: _id })
  // console.log(existsposts[0].password)
  // console.log(Posts.password)
  if (password === existsPosts[0].password) {
    await Posts.updateOne({ _id: _id }, { $set: { title, content } });
    return res.json({ message: "게시글을 수정하였습니다." })

  }


  res.json({ message: "입력하신 정보가 일치하지 않습니다." })
})

//게시글삭제 

router.delete('/posts/:_id', async (req, res) => {
  const { _id } = req.params;
  const { password } = req.body;
  const existsPosts = await Posts.find({ _id });
  if (password === existsPosts[0].password) {
    await Posts.deleteOne({ _id });
    return res.json({ message: "게시글을 삭제했습니다." })
  }

  res.json({ message: "입력하신 정보가 일치하지 않습니다." });
});



module.exports = router