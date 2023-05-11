  const express = require('express')
  const mongoose = require('mongoose')
  const bodyparser = require('body-parser')
  const cloudinary = require('cloudinary').v2;
  const fileUpload = require('express-fileupload')
  const path = require('path')
  const app = express()
  app.use(express.json())

//======================ALL Models imported=================================================
 
  app.use(express.static(path.join(__dirname,'public')))
  app.use(express.static('public'));
  app.use(bodyparser.urlencoded({extended:true}));
  
  app.use("/api/auth", require("./Auth/route"))

  app.set('views', './views')
  app.set('view engine', 'ejs')
  

  //=====================Connection to mongodb==================================================

  mongoose.connect("mongodb+srv://Gauravd:gauravd@cluster0.hbhwc24.mongodb.net/?retryWrites=true&w=majority",{
    useNewurlParser:true,
    useUnifiedtopology:true
  }).then(()=>{
    console.log("Connected With MongoDB");
}).catch((err)=>{
  console.log(`error is ${err}`);
})

const imageSchema = new mongoose.Schema({
  url: String,
});
const Image = mongoose.model('Image', imageSchema);


  app.use(express.json());

  //======================Connection to Cloudinary=================================================

  cloudinary.config({
    cloud_name:'ds197oik9',
    api_key:'592329952254324',
    api_secret:'R_qJLiZmZzCoC3m4j3X66UJbZyo',
  });

  app.use(fileUpload({
    useTempFiles: true,
    limits: { fileSize: 100 * 1024 * 1024 }  }));

  
  //======================Posting the Image into cloudinary and url into DB API=================================================

  app.post('/action', async (req, res) => {
    console.log(req.body);
    const file = req.files.image;
    try {
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      console.log(result);
      const image = new Image({
        url: result.url
      });
      await image.save();
      // res.sendFile(__dirname + '/views/index.ejs');
    const images = await Image.find();
    const imageUrls = images.map(image => image.url);
      res.render('index',{imageUrls});
    } catch (err) {
      console.error(err);
      res.status(500).send('Error saving image');
    }
  });

  //======================Fetching the Image url from DB API=================================================

  app.get('/action/:id', async (req, res) => {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).send('Image not found');
    }
    const imageUrl = image.url;
    res.render('index', { imageUrl });
  });

  //=====================Main EJS File==================================================
  
  app.get('/home', async (req, res) => {
    const images = await Image.find();
    const imageUrls = images.map(image => image.url);
    res.render('index', { imageUrls });
  });
  
  
  //=====================Uploading Image==================================================

  app.get('/getupload', (req, res) => {
    res.sendFile(__dirname + "/upload.html");
  })

  //=======================================================================

    app.get('/view', (req, res) => {
      res.sendFile(__dirname + "/views/index.ejs");
  
    });
   
  //=======================================================================

    app.get("/story1", (req, res) => {
      res.sendFile(__dirname + "/upload.html");
  })

  //=======================================================================

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html");
    
})

app.get("/login2", (req, res) => {
  res.sendFile(__dirname + "/login2.html");
})
 
   
//=========================SERVER-CONNECTION========================================
  
const PORT = process.env.PORT || 3000
const server = app.listen(PORT, ()=>
    console.log(`server is connected to port ${PORT}`)
)


//=========================SOCKET=============================

const io = require('socket.io')(server)

function onConnected(socket){
  // console.log(socket.id);

  socket.on('message',(data)=>{
    // console.log(data)
    socket.broadcast.emit('chat-message',data)
  })
}

io.on('connection',onConnected)





