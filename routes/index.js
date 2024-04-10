var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
const multer  = require('multer');
const path = require('path');
const { Upload } = require('@aws-sdk/lib-storage');
const { S3Client, ListObjectsV2Command, DeleteObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

// var admin = require("firebase-admin");
// var serviceAccount = require(process.env.FIREBASE_KEY);

// const app = admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const fileName = req.body.fName || file.originalname;
//     cb(null, fileName);
//   }
// });

// const upload = multer({ storage: storage });

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const s3Client = new S3Client({
  credentials : {
    accessKeyId : process.env.ACCESS_KEY,
    secretAccessKey : process.env.ACCESS_KEY_SECRET
  },
  region : "us-east-1"
})

router.post("/upload", upload.single('file'), function (req, res, next) {

  if(!req.body.fName?.trim()){
    res.send({
      success : false,
      error : "Invalid file Name"
    })
  }

  if(!req.file || !req.file.buffer){
    res.send({
      success : false,
      error : "Invalid File"
    })
  }

  new Upload({
    client: s3Client,
    params : {
      Bucket : "mybucket-2108",
      Key : `${req.body.fName}`,
      Body : req.file.buffer,
      ContentType : req.file.mimetype
    }
  })
  .done()
  .then(data => {
    res.send({
      success: true,
      ...data
    })
  })
  .catch(err => {
    res.send({
      success : false,
      err
    })
  })

  // res.send({
  //   success : true,
  //   path : req.file.path
  // });
});

router.get('/listfiles', async (req, res) => {
  const client = s3Client;
  const input = { 
    Bucket: "mybucket-2108"
  };
  const command = new ListObjectsV2Command(input);
  const response = await client.send(command);
  res.send(response);
})

router.delete('/deleteFile/:key', async (req, res) => {
  const input = { 
    Bucket: "mybucket-2108",
    Key : req.params.key
  };
  const command = new DeleteObjectCommand(input);
  const response = await s3Client.send(command);
  res.send(response);
})



const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pranshu2108@gmail.com",
    pass: process.env.PASS,
  },
});

async function main() {
  
  // const info = await transporter.sendMail({
  //   from: 'pranshu2108@gmail.com', // sender address
  //   to: "pa283@snu.edu.in", // list of receivers
  //   subject: "Hello ✔", // Subject line
  //   text: "Hello world?", // plain text body
  //   html: "<b>Hello world?</b>", // html body
  // });

  // console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs');
});

router.post('/sendNotification', (req, res) => {
  const {data, token} = req.body;
  console.log("here")
  app.messaging().send({
    data,
    token
  }).then(response => {
    res.json(response)
  }).catch(err => {
    console.log(err)
  })
})

module.exports = router;