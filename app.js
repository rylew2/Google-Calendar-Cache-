var express = require('express');
var app = express();
var google = require('googleapis');
var bodyParser = require('body-parser');
var GoogleAuth = require('google-auth-library');
//var api = require('./quickstart');

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/calendar-events', function(req,res) {
    res.sendFile(__dirname + '/public/quickstart.html');
});
// app.get('/calendar-events',express.static('public'));


app.post('/calendar-events', function(req,res) {
    var CLIENT_ID = req.body.idtoken;
    var auth = new GoogleAuth;
    var client = new auth.OAuth2(CLIENT_ID, '', '');
    var userid;
    client.verifyIdToken(
        token,
        CLIENT_ID,
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
        function(e, login) {
            var payload = login.getPayload();
            userid = payload['sub'];
            // If request specified a G Suite domain:
            //var domain = payload['hd'];
        });
    console.log(userid);

});


app.listen(3007, function () {
    console.log('Example app listening on port 3007!');
    console.log('http://localhost:3007/');
});

