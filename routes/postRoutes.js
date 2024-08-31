const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");

// 모든 게시물 가져오기
router.get("/", postController.getAllPosts);

// 단일 게시물 가져오기
router.get("/post/:id", postController.getPostById);

// 새 게시물 폼 페이지
router.get("/new", postController.newPostForm);

// 새 게시물 저장
router.post("/new", postController.createPost);

// 게시물 수정 폼 페이지
router.get("/edit/:id", postController.editPostForm);

// 게시물 수정
router.post("/edit/:id", postController.updatePost);

// 게시물 삭제
router.post("/delete/:id", postController.deletePost);

module.exports = router;
