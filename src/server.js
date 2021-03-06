const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
 
const app = express();

//define quem pode acessar nosso server 
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on("connection", socket => {
    socket.on('connectRoom', box =>{
        socket.join(box);
    });
});


mongoose.connect('mongodb+srv://curso:curso@cluster0-ari4i.mongodb.net/curso?retryWrites=true', {
    useNewUrlParser: true
});

//Define mid que seta a global io para o req
app.use((req, res, next) =>{

    req.io = io;

    return next();
});


app.use(express.json());
//permite envio de arquivos na requisição
app.use(express.urlencoded({extended: true})); 
app.use('/files', express.static(path.resolve(__dirname, '..','tmp')));


app.use(require('./routes'));

//Para aplicação ouvir requisição sockets quanto requisição http
//Verificando variavel de ambiente do heroku
server.listen(process.env.PORT || 3333);

//parei no 1:02:46 ia instalar o socket i/o para ficar realtime