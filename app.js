const express = require("express");
const bodyparser = require("body-parser");
var app= express();
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));

const mongoose = require ("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/todo");

const trySchema = new mongoose.Schema({
    name:String
});
const item = mongoose.model("task",trySchema);
const todo = new item({
    name: "create some videos"
});

const todo2 = new item({
    name: "Learn react"
});

const todo3 = new item({
    name: "Learn Dsa"
});

const todo4 = new item({
    name: "Take some rest"
});
app.get("/",function(req,res){
    item.find()
    .then(function (data) {
      res.render("list",{ejes : data});
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/",function(req,res){
    const itemName = req.body.ele1;
    const todo5 =new item({
        name:itemName
    });
    todo5.save();
    res.redirect("/");
})

app.post("/delete",function(req,res){
    const checked =req.body.checkbox1;
    item.findByIdAndRemove(checked)
    .then(function(){
        console.log("deleted");
        res.redirect("/");
    })
    .catch(function (err) {
        console.log(err);
      });
})

app.listen("4000",function(){
    console.log("server is running");
});