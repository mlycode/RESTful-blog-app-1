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





app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App has started");
})