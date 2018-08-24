var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");
    

//APP CONFIG
mongoose.connect("mongodb://localhost:27017/blog_app_one", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extened: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

//MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date, 
        default: Date.now
    }
});
var Blog = mongoose.model("Blog", blogSchema);

//  Blog.create({
//      title: "Hello, this is the second blog post",
//      image: "https://images.unsplash.com/photo-1534971525317-ed179568e7f1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6dd556ab17513b790b54cb95761b4ce6&auto=format&fit=crop&w=634&q=80",
//      body: "Every highlight needs it's own personal shadow. This is a happy place, little squirrels live here and play. It's a very cold picture, I may have to go get my coat. It’s about to freeze me to death. That's a son of a gun of a cloud. See there how easy that is. You can do it."
//  });


//ROUTES

//INDEX
app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blog){
        if(err){
            console.log(err);
        } else {
            res.render("index", {blog: blog});
        }
    });
});

//NEW
app.get("/blogs/new", function(req, res){
    res.render("new");
});

//CREATE
app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log(err);
            res.render("back");
        } else {
            res.redirect("/blogs");
        }
    });
});





app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App has started");
})