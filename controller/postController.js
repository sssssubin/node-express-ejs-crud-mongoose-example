const Post = require("../models/postModel");

// 모든 게시물 가져오기
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    // 클라이언트의 Accept 헤더를 확인합니다.
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      // 요청이 JSON 형식을 요구하는 경우
      res.json(posts);
    } else {
      // 요청이 HTML 형식을 요구하는 경우
      res.render("index", { posts });
    }
  } catch (error) {
    res.status(500).send("Error retrieving posts");
  }
};

// 단일 게시물 가져오기
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found");
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      res.json(post);
    } else {
      res.render("post", { post });
    }
  } catch (error) {
    res.status(500).send("Error retrieving post");
  }
};

// 새 게시물 폼 페이지
exports.newPostForm = (req, res) => {
  res.render("new");
};

// 새 게시물 저장
exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new Post({ title, content });
    await newPost.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error creating post");
  }
};

// 게시물 수정 폼 페이지
exports.editPostForm = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found");
    res.render("edit", { post });
  } catch (error) {
    res.status(500).send("Error retrieving post");
  }
};

// 게시물 수정
exports.updatePost = async (req, res) => {
  const { id, title, content } = req.body;
  try {
    await Post.findByIdAndUpdate(id, { title, content });
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error updating post");
  }
};

// 게시물 삭제
exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error deleting post");
  }
};
