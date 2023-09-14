import express from 'express';
import dotenv from 'dotenv'

import postsRouter from './routes/posts.js';

dotenv.config()

const app = express();
const PORT = process.env.port

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  return res.json({ message: "환영 합니당!@." })
})

app.get("/api", (req, res) => {
  return res.json({ message: "url 뒤에 /posts 를 넣어주세요~" })
})

app.use('/api', [postsRouter]);

app.listen(PORT, () => {
  console.log(`${PORT}포트 연결!`);
});

