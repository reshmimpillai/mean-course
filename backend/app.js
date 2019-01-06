//import { request } from 'https';
const mongoose=require('mongoose');
const express = require('express');

const bodyParser=require('body-parser');

const Post=require('./models/post');
const app=express();
mongoose.connect('mongodb+srv://reshmi:opB20Uz3BcZVqLaC@cluster0-tg3zy.mongodb.net/test?retryWrites=true')
.then(()=>{
  console.log('connected successfully to mongdb');
})
.catch(()=>{
  console.log('connection failed');
});

app.use(bodyParser.json()); //parse json data

//app.use(bodyParser.urlencoded({request:false})); //parse urlencoded data

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");

  res.setHeader("Access-Control-Allow-Headers",
  "Origin,X-Requested-With,Content-Type,Accept");

  res.setHeader("Access-Control-Allow-Methods","GET,POSt,PATCH,DELETE,PUT,OPTIONS");

  next();
});

//post api
app.post('/api/posts',(req,res,next)=>{
  const post = new Post(
    {title: req.body.title,
    content: req.body.content}
  );
  //const post=req.body;

  console.log(post);
post.save();
  res.status(201).json({
    message:'Post added successfully'
  });
});

//Get api
app.use('/api/posts/',(req,res,next)=>{
  const posts=[
    {id:'jdlsldsdddj',title:'My first server side post',content:'first server side content'},
    {id:'fhjdsulkdnnms',title:'My second server side post',content:'second server side content'}
  ];
  return res.status(200).json({
    message:'Post fetched successfully',
    posts:posts
  });
});

module.exports=app;
