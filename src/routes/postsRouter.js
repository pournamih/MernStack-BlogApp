const express = require("express"); 
const postsRouter = express.Router();
const ArticleInfo = require("../model/BlogDB")

//router to get all posts
postsRouter.get("/", (req, res) => {
    ArticleInfo.find({})
        .sort({ title: 1 })
        .then((posts) => {
            res.json(posts);
        })
});

//router to get specific post
postsRouter.get("/:id", (req, res) => {
    const articleId = req.params.id;
   
    ArticleInfo.findOne({ _id: articleId })
        .then((post) => {
            res.json(post);
        })
        .catch(() =>
            res.json({ status: "Error" }));
});

//router for posting blog post
postsRouter.post("/post", (req, res) => {
    var item = {
        title: req.body.title,
        description: req.body.description,
        name: req.body.name,
        upvoters: [],
        comments: []
    }
    const blogPost = new ArticleInfo(item);
    blogPost.save()
        .then(() => res.json({status: "Success"}))
        .catch((er) => {
            console.log(er)
            res.sendStatus(500).json({ status: "Error" });
        });
});

//Router to update blog post
postsRouter.post("/:id/update", (req, res) => {
    const postId = req.params.id;
    var updateItem = {
        title: req.body.title,
        description: req.body.description
    };
    ArticleInfo.findByIdAndUpdate(postId, updateItem)
        .then((post) => res.json(post))
        .catch((er) => {
            console.log(er)
            res.sendStatus(500).json({ status: "Error" });
        });
})

//Router to delete blog post
postsRouter.post("/:id/delete", (req, res) => {
    const postId = req.params.id;
    ArticleInfo.findByIdAndDelete(postId)
        .then(() =>  res.json({status: "Success"}))
        .catch((er) => {
            console.log(er)
            res.sendStatus(500).json({ status: "Error" });
        });
});

module.exports = postsRouter;




