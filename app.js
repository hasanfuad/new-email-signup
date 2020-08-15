const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req, res){

    const fname = req.body.input1;
    const lname = req.body.input2;
    const email = req.body.input3;
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: fname,
                LNAME: lname
            }
        }]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/9cda31e64a";
    const options = {
        method: "POST",
        auth: "Fuad:s2b15c638486b79b3b0514446c4b8cff7-us17"
    };

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else
        {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
            
        });

    });

    request.write(jsonData);
    request.end();



});

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("server is running!");
})



//API Key
// 2b15c638486b79b3b0514446c4b8cff7-us17

// List ID
// 9cda31e64a