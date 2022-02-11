const express = require("express"); 
const commentsRouter = express.Router();
const ArticleInfo = require("../model/BlogDB")


commentsRouter.get("/:id", (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); -- CORS
    const articleId = req.params.id;
    ArticleInfo.findOne({ _id: articleId })
        .then((article) => {
            res.json(article);
        })
        .catch(() => {
            res.send({status: "Error"})
        });
});

//router to set upvotes
commentsRouter.post("/:id/upvotes", (req, res) => {
    const articleId = req.params.id;
    const username = req.body.username;
    const filter = { _id: articleId };
    const update = { $push: { upvoters: username} } ;
    ArticleInfo.findOneAndUpdate(filter, update, { new: true })
        .then((article) => {
            res.json(article);
        })
        .catch(() => {
            res.send({status: "Error"})
        });
});

//router to set comments
commentsRouter.post("/:id/comment", (req, res) => {
    const articleId = req.params.id;
    const { username, text } = req.body;
    const filter = { _id: articleId };
    const update = { $push: { comments: { username, text } } };
    ArticleInfo.findOneAndUpdate(filter, update, { new: true })
        .then( (article) => {
            res.json(article);
        })
        .catch(() => {
            res.send({status: "Error"})
        });
});

module.exports = commentsRouter;
