const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const path = require("path");
const auth = require("./src/helpers/auth");

const app = express();
const PORT = process.env.PORT || 8000;

const commentsRouter = require("./src/routes/commentsRouter");
const postsRouter = require("./src/routes/postsRouter");
const userAccountsRouter = require("./src/routes/userAccountsRouter");

dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/comments", auth, commentsRouter);
app.use("/api/posts", auth, postsRouter);
app.use("/api/user", userAccountsRouter);

app.use(express.static(path.resolve(__dirname, "./client")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client", "index.html"));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    })
  })
  

mongoose.connect(process.env.DBConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(app.listen(PORT, () =>
        console.log(`Server listening on PORT ${PORT}`)))
    .catch((err) => console.log(err));


