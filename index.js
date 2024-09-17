import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

class blogPost {
    constructor(postDate, postAuthor, postTitle, postContent) {
        this.postDate = postDate
        this.postAuthor = postAuthor
        this.postTitle = postTitle
        this.postContent = postContent
    }
}

let postList = []
let today = new Date();
postList.push(new blogPost(today.toDateString(), "Evan", "First Post", "This is a post."))
postList.unshift(new blogPost(today.toDateString(), "Aaron", "Second Post", "This is also a post."))
postList.unshift(new blogPost(today.toDateString(), "Ryan", "What defines a post?", "Conceptually, what really defines a blog post?"))
postList.unshift(new blogPost(today.toDateString(), "William", "Fourth Post", "Your mom is a blog post."))

app.get("/", (req, res) =>
    {
     res.render("index.ejs",
        {
         blogs: postList
        });
    });

app.get("/index.ejs", (req, res) =>
    {
     res.render("index.ejs",
        {
         blogs: postList
        });
    });

app.post("/submit", (req, res, next) =>
    {
     postList.unshift(new blogPost(today.toDateString(), req.body["userName"], req.body["userTitle"], req.body["userContent"]));
     res.redirect("/");
    });

app.get("/edit", (req, res) =>
    {
     const postId = req.query.postId;
     const post = postList[postId];
     res.render("edit.ejs", { post: post, postId: postId });
    });

app.post("/update", (req, res) => {
        const postId = req.body.postId;
        postList[postId].postAuthor = req.body.userName;
        postList[postId].postTitle = req.body.userTitle;
        postList[postId].postContent = req.body.userContent;
        postList[postId].postDate = new Date().toDateString();
    
        res.redirect("/");
    });

app.get("/delete", (req, res, next) =>
        {
         const postId = parseInt(req.query.postId, 10);
         if (postId >= 0 && postId < postList.length) {
             postList.splice(postId, 1);
            }
         res.redirect("/");
        });

app.listen(port, () =>
    {
     console.log(`Server listening on port: ${port}`);
    });