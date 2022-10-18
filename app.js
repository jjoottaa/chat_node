const saveRoutes = require('./routes/save')
const express = require('express');
const request = require("request");
const res = require('express/lib/response');
const app = express();
const path= require('path');

app.set('views' , path.join(__dirname,'views'));
app.set('views engine' , 'ejs');

saveRoutes(app);

const http= require("http");
const server = http.createServer(app);

const {Server} = require('socket.io');
const io = new Server(server);

io.on('connection', (socket)=>{
    //console.log('Un usuario se ha conectado');
    socket.on('chat', (msg)=>{
        // console.log('Mensaje : '+msg); 
        io.emit('chat',msg);
    }) 


       // Pasamos los datos que el usuario esta escribiendo en el chat 
   socket.on('escribiendo', (datos)=>{
   
    // Si el usuario esta escribiendo un mensaje 
    if(datos.escribiendo == true){
         //console.log(datos);
       io.emit('display', datos); 
    }else {
       io.emit('display', datos);
    }
 });
})


app.get('/', (req , res)=>{
   request('http://localhost:3000/save',(err,response,body)=>{
      if (!err){
            const users = JSON.parse(body); 
            res.render('usuario.ejs', {
               users:users
             });
        }
    }) 
 });
 

 app.get('/ingresar_chat', (req , res)=>{
    var usuario = req.query.usuario;
    console.log(usuario);
    //res.render('index.ejs',usuario);
    res.render('index.ejs', {
      data:usuario
    });
    
  });



server.listen(3000, ()=>{
    console.log('Server OK en Localhost:3000')
})  