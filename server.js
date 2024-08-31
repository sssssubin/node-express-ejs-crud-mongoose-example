const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const postRoutes = require("./routes/postRoutes");
dotenv.config();

// Express 애플리케이션 생성
const app = express();

// const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGODB_URL;

// MongoDB 연결 설정
mongoose.connect(MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// EJS 템플릿 엔진 설정
app.set("view engine", "ejs"); // 템플릿 엔진으로 EJS 사용
app.set("views", path.join(__dirname, "views")); // EJS 템플릿 파일이 위치한 디렉토리 설정

// 미들웨어 설정
app.use(expressLayouts); // EJS 레이아웃 사용
app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 제공
app.use(bodyParser.urlencoded({ extended: false }));

app.set("layout", "layout"); // 기본 레이아웃 설정

// 라우트 설정
app.use("/", postRoutes);

// app.listen(PORT, () => {
//   console.log(`서버연결 http://localhost:${PORT}`);
// });

module.exports = app; // Vercel에서 올바르게 서버를 인식하도록 app을 export합니다.