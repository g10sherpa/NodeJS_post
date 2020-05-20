//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "COVID-19 भाइरसले संक्रमित धेरै व्यक्तिहरूले हल्का देखि मध्यम श्वास रोगको अनुभव गर्नेछन् र विशेष उपचारको आवश्यकता बिना नै स्वास्थ्यलाभ हुन्छन्। पाको उमेरका व्यक्तिहरू, र हृदय रोग, मधुमेह, दीर्घकालीन श्वास रोग, र क्यान्सर जस्ता अन्तर्निहित मेडिकल समस्याहरूको साथ गम्भीर बिरामी हुने बढी सम्भावना हुन्छ। ";
const contactContent = "";
aboutContent = "About Corona Virus";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(300, function() {
  console.log("Server started on port 300");
});
