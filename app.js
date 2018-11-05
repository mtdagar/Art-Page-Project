var bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    express     = require("express"),
    app         = express();
    


//APP CONFIG
mongoose.connect("mongodb://localhost/art_page_project", { useNewUrlParser: true });
app.set("view engine", "ejs");
//app.use(express.static("public"));
app.use('/static', express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));



//MONGOOSE/MODEL CONFIG
var postSchema = new mongoose.Schema({
    image: String,
    description: String,
    created: {type: Date, default: Date.now}
});

var Post = mongoose.model("Post", postSchema);

/**
Post.create({
    image: "https://images.unsplash.com/photo-1540057091285-cea1a54ecbc8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a3331b8e5f637b077435a047d79a2058&auto=format&fit=crop&w=500&q=60",
    description: "Hazy days"
});
**/


//RESTFUL ROUTES
app.get("/", function(req, res) {
   res.redirect("/posts"); 
});


//INDEX ROUTE
app.get("/posts", function(req, res){
    Post.find({}, function(err, posts){
        if(err){
            console.log("error!");
        }else{
            res.render("index", {posts: posts});
        }
    });
});


//NEW ROUTE
app.get("/posts/new", function(req, res){
   res.render("new"); 
});


//CREATE ROUTE
app.post("/posts", function(req, res){
    Post.create(req.body.post, function(err, newPost){
        if(err){
            res.render("new");
            //prompt("Error uploading your photo.\n" + err);
        }else{
            res.redirect("/posts");
        }
    });
});


//SHOW ROUTE
app.get("/posts/:id", function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
       if(err){
           res.redirect("/posts");
       } else{
           res.render("show", {post: foundPost});
       }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER STARTED!");
})
