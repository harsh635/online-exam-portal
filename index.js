const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const express = require("express");
// const upload = multer({ dest: "uploads/" });
// const fileupload = require("express-fileupload");
const mongoose = require('mongoose')
const user=require("./controller/user");
const discuss=require("./controller/discuss");
const app = express();
const files=require("./controller/files")



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/uploads')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const uniqueSuffix = Date.now();
    cb(null, file.originalname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

/*Routes */

app.use(express.static(__dirname + "/e-exam/New folder"));
app.use("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "e-exam/New folder/index.html"));
});

app.use(express.static(__dirname + "/e-exam/New folder/login"));
app.use("/reg", (req, res) => {
  res.sendFile(path.join(__dirname, "e-exam/New folder/reg/reg.html"));
});

app.use(express.static(__dirname + "/e-exam/New folder/reg"));
app.use("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "e-exam/New folder/login/login.html"));
});
app.use(express.static(__dirname + "/e-exam/New folder/ques"));
app.use("/quiz", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/e-exam/New folder/ques/q1.html"));
});
app.get("/exam", (req, res) => {
  res.sendFile(path.join(__dirname, "e-exam/New folder/exam/home.html"));
});
app.use(express.static(__dirname + "/e-exam/New folder/open forum"));
app.use("/forum", (req, res) => {
  res.sendFile(path.join(__dirname, "e-exam/New folder/open forum/index.html"));
});
app.use(express.static(__dirname + "/e-exam/New folder/e-repo"));
app.use("/repo", (req, res) => {
  res.sendFile(path.join(__dirname, "e-exam/New folder/e-repo/index.html"));
});
app.use(express.static(__dirname + "/e-exam/New folder/my-wal"));
app.use("/mywall", (req, res) => {
  res.sendFile(path.join(__dirname, "e-exam/New folder/my-wal/mywall.html"));
});
app.use("/edit", (req, res) => {
  res.sendFile(path.join(__dirname, "e-exam/New folder/my-wal/edit.html"));
});
app.use(express.static(__dirname + "/e-exam/New folder/vault"));
app.use("/vault", (req, res) => {
  res.sendFile(path.join(__dirname, "e-exam/New folder/vault/index.html"));
});

/*APis*/

app.post("/api/login",user.login);
app.post("/api/reg",user.signup);


app.post("/api/file",upload.single('filess') ,files.create);  

app.post("/api/mywall",user.getUserById)
app.patch("/api/score",user.updateScore);
app.post("/api/discuss",discuss.create);
app.get("/api/getdis",discuss.getdis);
app.patch("/api/edit",user.edit);
app.patch("/api/reply",discuss.reply);
app.get("/api/getfile",files.getfile);
app.get("/api/file/:filename",(req,res,next)=>{
    const filepath=__dirname+'/uploads/'+req.params.filename;
    res.download(filepath);
})


mongoose
  .connect(
    `mongodb+srv://aniket:chotu@cluster0.x6e7vlw.mongodb.net/exam?retryWrites=true&w=majority`,
  )
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });

