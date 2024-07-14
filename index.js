import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var post = {
    title : "", 
    content: ""
};
var posts = [];

var noOfPosts;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/newpost", (req, res) => {
    res.render("newpost.ejs");
});

app.post("/newpost/submit", (req, res) => {
    console.log("/newpost/submit");
    var title = req.body.bTitle;
    var content = req.body.bContent;
    post = {
        id: posts.length,
        title: title,
        content, content
    }
    console.log(post.title + " " + post.content);
    posts.push(post);
    res.redirect("/posts");
})

app.get("/editpost/:id", (req, res) => {
    console.log(req.params.id)
    res.render("newpost.ejs", {
        ePost :  post
    });
});

app.post("/editpost/:id/submit", (req, res) => {
    console.log("/editpost/"+req.params.id+"/submit");
    var title = req.body.bTitle;
    var content = req.body.bContent;
    posts = posts.filter((post) => post.id != req.params.id);
    posts.forEach(x => {
        console.log("currentPOst: "+ x.title + " " + x.id + " ");
    })
    post = {
        id: req.params.id,
        title, content
    }
    posts.push(post);
    res.redirect("/posts");
})

app.get("/posts", (req, res) => {
    res.render("posts.ejs", {
        userPosts : posts
    });
});

app.get("/posts/edit/:id", (req, res) => {
    var postId = req.params.id;
    post = posts.find((post) => post.id == postId);

    res.redirect("/editPost/"+postId);
})

app.get("/posts/delete/:id", (req, res) => {
    var postId = req.params.id;
    posts = posts.filter((post) => post.id != postId);

    res.redirect("/posts");
});

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})