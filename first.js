var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var md5 = require('md5');
var path = require('path');
var port = 3000;

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        // console.log(file);
        callback(null, './uploads/user');
    },
    filename: function(req, file, callback) {
        // console.log(file);
        var fileUniqueName = md5(Date.now());
        callback(null,  fileUniqueName + path.extname(file.originalname));
    }
});


var upload = multer({ storage: storage });

app.post('/process_get', upload.any(), function(req, res) {
   console.log(req.files);
   // console.log(req,file);
});

app.use(express.static(path.join(__dirname, 'views')));
app.listen(port, function(){
   console.log("server chal rha hai");
});