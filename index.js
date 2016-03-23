var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');
var logger = require('morgan');

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/chat', function(req,res){
  res.sendFile(process.cwd() + '/views/chat.html');
});

app.get('/event', function(req,res){
  res.sendFile(process.cwd() + '/views/event.html');
});

app.use('/images', express.static('assets/images'));
app.use('/css', express.static('assets/css'));
app.use('/js', express.static('assets/js'));
app.use(logger('dev'));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});