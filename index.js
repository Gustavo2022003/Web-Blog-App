import express from "express";
import {dirname, join} from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid';

// Variáveis de configuração
const PORT = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Variáveis
var posts = [];

// Middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        year: new Date().getFullYear(),
        posts: posts
    });
});

app.post("/post", (req, res) => {
    var postBody = req.body["post-body"];
    var minute = new Date().getMinutes();
    var username = req.body["username"];
    const id = uuidv4();

    if (minute < 10) {
        minute = "0" + minute;
    }

    const post = {
        username: username,
        message: postBody,
        hour: new Date().getHours(),
        minute: minute,
        id: id,
    };

    posts.unshift(post);
    res.redirect('/');
    console.log(posts);
});

app.post("/confirm", (req, res) => {
    var id = req.body["postID"];

    const data = {
        id: id,
        year: new Date().getFullYear()
    }

    res.render("confirm.ejs", data);
});

app.post("/deletepost", (req, res) => {
    var id = req.body["postID"];

    const index = posts.findIndex(post => post.id === id);

    if(index !== -1) {
        posts.splice(index, 1);
        console.log(`Post com ID ${id} removido.`);
    } else {
        console.log(`Post com ID ${id} não encontrado.`);
    }

    res.redirect("/");
});

app.get("/editpost", (req, res) => {
    var id = req.query.postID;

    var post = posts.find(post => post.id === id);

    if (!post) {
        return res.status(404).send("Post não encontrado");
    }

    const data = {
        username: post.username,
        message: post.message,
        id: post.id,
        year: new Date().getFullYear(),
    }

    console.log(`Nome: ${post.username}`);
    console.log(`Mensagem: ${post.message}`);

    res.render("editpost.ejs", data);
});

app.post("/save", (req, res) => {
    var id = req.body["id"];

    var post = posts.find(post => post.id === id);

    if (!post) {
        return res.status(404).send("Post não encontrado");
    }

    post.message = req.body["postMessage"];
    
    res.redirect("/");
});

app.post("/cancel", (req, res) => {
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
});