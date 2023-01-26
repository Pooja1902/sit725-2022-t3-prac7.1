var express = require("express")
var app = express()
var cors = require('cors')
let projectCollection;
let dbConnect = require("./dbConnect");
let projectRoutes = require("./routes/projectRoutes")
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use('/api/projects',projectRoutes)

app.get('/addTwoNumbers/:firstNumber/:secondNumber', function(req,res,next){

    var firstNumber = parseInt(req.params.firstNumber) 
    var secondNumber = parseInt(req.params.secondNumber)
    var result = firstNumber + secondNumber || null
    if(result == null) {  
      res.json({result: result, statusCode: 400}).status(400)
      }
      else { res.json({result: result, statusCode: 200}).status(200)} 
  })

  
  io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {

    console.log('user disconnected');
  });
  setInterval(()=>{

    socket.emit('number', parseInt(Math.random()*10));

  }, 1000);

});
//Mongodb connection ...
// const MongoClient = require('mongodb').MongoClient;

// const uri = 'mongodb+srv://Hjarewal:jarewal@cluster0.0psjper.mongodb.net/?retryWrites=true&w=majority'
// const client = new MongoClient(uri, {useNewUrlParser: true})

// const createColllection = (collectionName) => { 
//      client.connect((err,db) => { 
//      projectCollection = client.db().collection(collectionName); 
//         if(!err) { 
//              console.log('MongoDB Connected') 
//          } 
//          else { 
//              console.log("DB Error: ", err); 
//              process.exit(1); 
//          } 
//      }) 
// }
// insert project....

// 

var port = process.env.port || 3000;

http.listen(port,()=>{
  console.log("Listening on: "+port)
    //createColllection('Pets')
})