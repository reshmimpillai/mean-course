//import { request } from 'https';
const path=require('path');
const mongoose=require('mongoose');
const express = require('express');

const bodyParser=require('body-parser');

const Post=require('./models/post');

const multer=require('multer');

const MIME_TYPE_MAP={
  'image/png':'png',
  'image/jpeg':'jpg',
  'image/jpg':'jpg'
};

//Store the image file
var myfilename;
const storage= multer.diskStorage({

  destination:(req,file,cb)=>{
    const isValid=MIME_TYPE_MAP[file.mimetype];
    //console.log('image type'+isValid);
    const error=new Error('Invalid Mine type');
    // if(isValid){
    //   error:null;
    // }
    cb(null,'backend/images');
  },
  filename:(req,file,cb)=>{
    const name=file.originalname.toLowerCase().split(' ').join('-');
    const extention=MIME_TYPE_MAP[file.mimetype];
    console.log('file name ',name);
    //myfilename=name+'-'+Date.now()+'.'+extention;
    cb(null,name+'-'+Date.now()+'.'+extention);
  }
});
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
app.use('/images',express.static(path.join("backend/images")));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");

  res.setHeader("Access-Control-Allow-Headers",
  "Origin,X-Requested-With,Content-Type,Accept");

  res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,PUT,OPTIONS");

  next();
});

//post api
app.post('/api/posts',multer({storage:storage}).single('image'),(req,res,next)=>{
  const url=req.protocol+'://'+req.get('host');  //Get hostname form request url
  //console.log('fileName'+ req.body.file.fileName);
  console.log('my file name');
  console.log(req.file);
  //console.log(req.body);
  const post = new Post(
    {title: req.body.title,
    content: req.body.content,
    imagePath:url+'/images/'+ req.file.filename  //store this path in db
  }


  );
  //const post=req.body;

post.save().then((createdPost)=>{
  res.status(201).json({
    message:'Post added successfully',
    // postId:createdPost._id

    //Send whole object
    post:{
      id:createdPost._id,
      title:createdPost.title,
      content: createdPost.content,
      imagePath: createdPost.imagePath
    }
  });
});

});

//Get api
app.get('/api/posts',(req,res,next)=>{
 Post.find().then((documents)=>{
   //console.log(documents);
   res.status(200).json({
    message:'Post fetched successfully',
    posts:documents
  });
 });

});

//Delet api
app.delete('/api/posts/:id',(req,res,next)=>{
  //console.log('id passed');
//console.log(req.params.id);
 Post.deleteOne({_id:req.params.id})
 .then((result)=>{
 // console.log(result);
  res.status(200).json({
    message:'deleted post ...'
  });
 });
res.status(200).json({
  message:'Post deleted successfully'
});
})

module.exports=app;
