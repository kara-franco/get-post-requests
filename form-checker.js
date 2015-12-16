/* Author: Kara Franco 
CS 290 Web Development 
Due Date: November 8, 2015
Assignment- GET and POST Checker
Description- This assignment illustrates the use of express.js, handlebars and node.js in working with submitted data. This single webpage application can recieve all incoming GET and POST requests and then show the user the data they requested.
*/

// make a variable and set it to use the express module
var express = require('express');
// call the express function, it will return an express application
var app = express();
// make a variable and set it to use the handlebars module, create main html
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
// // make a variable and set it to use the body-parser module
var bodyParser = require('body-parser');
// add middleware that will identify which method the form is encoded
// the bodyParser will be able to parse URL encoded forms and JSON data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// register a handlebars view engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
// set the port that we will be using (global)
app.set('port', 3003);


app.get('/',function(req,res){
  // make an array of objects (in the format of {name:[userInput], value:[userInput]}
  var objectArray = [];
  // as the user inputs data, store the key:value pairs in the object array
    // retrieve the data from user input using .query to access the URL
    for (var i in req.query){
        // use push() to append the data to the array
        objectArray.push({'name':i,'value':req.query[i]})
    }
  // set the context for the page h1 header the request type of GET 
  var context = {requestType: "GET"};
  // set the context of the page's queryList to the object array 
  // this will pass the object array to the html <ul> to be shown on page
  context.queryList = objectArray;
  // send all of this data to the checker-layout.handlebars to render the HTML 
  // http://expressjs.com/api.html#app.render
  res.render('checker-layout', context);
});

app.post('/', function(req,res){
  // make an array of objects (in the format of {name:[userInput], value:[userInput]}
  var objectArray = [];
  var URLArray = [];
   // retrieve the data from the URL using .query to access the HTML body
    // retrieve the data from user input using .body to access the HTML body
    for (var k in req.query){
        // use push() to append the data to the array
        URLArray.push({'name':k, 'value':req.query[k]})
      }
    for (var i in req.body){
         // use push() to append the data to the array
        objectArray.push({'name':i,'value':req.body[i]})
    }
  // set the context for the page h1 header the request type of POST
  var context = {requestType: "POST"};
  // set the context of the page's postList to the object array 
  // set the context of the page's queryList to the URL array
  // this will pass the object array to the html <ul> to be shown on page
  context.postList = objectArray;
  context.queryList = URLArray;
  // send all of this data to the checker-layout.handlebars to render the HTML
  // http://expressjs.com/api.html#app.render
  res.render('checker-layout', context);
});


// call use to mount (middleware) path to send 404 Error
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

// call use to mount (middleware) path to send 500 Error
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

// use app's get method to retrieve port value  
// function creates callback for when the server has started
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
