const express = require ("express");
const server = express();
const path = require("path");
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');


server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(methodOverride("_method"));
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));


let comments = [
    {
        id: uuid(),
        username: "Alex",
        text: "o pai ta bullet"
    },
    {   
        id: uuid(),
        username: "João",
        text: "é o cricket"
    },
    {   
        id: uuid(),
        username: "Math",
        text: "waaaaaaaaaaah"
    }
]

//comments REST example;
server.get("/comments", (req, res) => {
    res.render("comments/index", { comments });
});

server.get("/comments/new", (req, res) => {
    res.render("comments/new")
});

server.post("/comments", (req, res) => {
    const { username, text } = req.body;
    comments.push( {username, text, id: uuid() } )
    res.redirect("/comments");
})

server.get("/comments/:id", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(comment => comment.id === id);
    // mesmo jeito de escrever a linha acima:
    // const comment = comments.find(function comment(c) {
    //     return c.id === parseInt(id);
    // })
    res.render("comments/show", { comment });
})

server.patch("/comments/:id", (req, res) => {
    const { id } = req.params;
    const newComment = req.body.text;
    const commentChange = comments.find(comment => comment.id === id);
    commentChange.text = newComment;
    res.redirect("/comments");
})

server.get("/comments/:id/edit", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(comment => comment.id === id);
    res.render("comments/edit", { comment })
})

server.delete("/comments/:id", (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id)
    res.redirect("/comments")
})

//

server.get("/tacos", (req, res) => {
    res.send("GET /tacos request")
});

server.post("/tacos", (req, res) => {
    //extraindo informações do corpo do body request;
    const { meat, qty } = req.body;
    res.send(`Here are your ${qty} ${meat} taco(s)`)
});

server.listen(3000, () => {
    console.log("listening")
});