const express = require('express')
const app = express()
const cors = require("cors")
const { parse } = require('path');
const PORT = process.env.PORT || 4000 ;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(cors())
app.use(express.json())


app.post('/user', async (req , res)=>{
    try{
      const user = await prisma.user.create({

        data: {
          name: req.body.name,
          email : req.body.email
  
        }
     });
        res.json(user);
    }
    catch(err)
    {
      res.send(err);
    }
})
app.get('/user', async(req, res) => {
  try{
    const users1 = await prisma.user.findMany();
    res.json(users1);
  }
  catch(err){
    res.send(err);
  }
}); 
// app.get('/user/:id', async (req,res)=>{
// try{
//     const user = await prisma.user.findFirst({
//       where :{id:req.params.id}

//     })
//     res.json(user) 

// }catch(err){
//   res.send(err);
// }

// });

app.delete('/user/:id',async(req,res) => {
  const id = parseInt(req.params.id);
  
  
  const user1 = await prisma.user.delete({
   where: {id},
  })
  res.json('is deleted');
})

app.patch('/user/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { email, name } = req.body;
  
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          email,
          name,
        },
      });
  
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Error updating user' });
    }
  });
  
// app.patch('/user/:id', async(req,res)=>{
//   const id = parseInt(req.params.id);
//   console.log(req.body)
//   const {email, name} = req.body; 


//   const user2 = await prisma.user.update({
//     where: {id},
//     data:{email: email, name: name}
//   })
//   res.send(user2)
// })
// post curd operation 
app.post('/Post', async (req , res)=>{
  try{
    const post1 = await prisma.post.create({

      data: {
        title: req.body.title,
        content : req.body.content,
        authorId :req.body.autherid

      }
   });
      res.json(post1);
  }
  catch(err)
  {
    res.send(err);
  }
})

app.get('/Post', async(req, res) => {
  try{
    const post2 = await prisma.Post.findMany();
    res.json(post2);
  }
  catch(err){
    res.send(err);
  }
}); 

app.delete('/Post/:id',async(req,res) => {
  const id = parseInt(req.params.id);
  
  
  const post3 = await prisma.Post.delete({
   where: {id},
  })
  res.json('is deleted');
})

app.patch('/Post/:id', async(req,res)=>{
  const id = parseInt(req.params.id);
  console.log(req.body)
  const {title, content} = req.body; 


  const post4 = await prisma.Post.update({
    where: {id},
    data:{
      title: title,    
      content: content}
  })
  res.send(post4)
})

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));