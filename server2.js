const express = require('express');
const app = express();

var port = 3001;

/*
  You can tell express where you are storing your static files.
  In this example, we are storing these files within the 'public'
  folder, and we are telling express to treat those files as if
  they are on the root level.
*/

app.use(express.static('public'));

/*
  Now we can create responses using HTML files we store in the public
  folder.
*/

app.get('/', function(request, response) {
  // You can use sendFile() to quickly serve an html file with your
  // response. Since we set up the server to serve static files from
  // our 'public' folder, we can simply give it the name of the file
  // within that folder.
  response.sendFile('index.html');
});

app.get('/myURI', function(request, response) {
  response.send('Responding to a GET request!');
});

app.post('/myURI', function(request, response) {
  response.send('Responding to a POST request!');
});

app.listen(port);
