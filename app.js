const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        }
      ]
    }
    //POST /lists/{list_id}
    const list_id = "b764cd5a29";
    const url = "https://us18.api.mailchimp.com/3.0/lists/b764cd5a29"
    const options = {
      method: "POST",
      auth: "cat:583c6ef5d1866066044e07baa890e3e9-us18"
    }
    const jsonData = JSON.stringify(data);
    const request = https.request(url, options, function(response) {
      response.on("data", function(data){
        var dataJSON = JSON.parse(data);
        console.log(dataJSON);
        if (response.statusCode === 200) {
          res.sendFile(__dirname + "/sucess.html")
        } else {
          res.sendFile(__dirname + "/failure.html")
        }
        /*
        if (dataJSON.error_count == 0) {
          res.write("success")
        } else {
          res.write("fail")
        }
        */
      })
    });
    request.write(jsonData);
    request.end();
});
app.post("/failure", function(req, res) {
  res.redirect("/")
});


// process.env.PORT is a dynamic port
const port = process.env.PORT || 9001;
// app.listen(port, function(){
//   console.log("Server running")
// });
app.listen(port, () => console.log(`Listening`))
//583c6ef5d1866066044e07baa890e3e9-us18
//Audience ID
//b764cd5a29
