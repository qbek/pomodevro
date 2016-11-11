const express = require('express');
const app = express();
const http = require('http').Server(app);
const fetch = require('node-fetch');
const handlebars = require('express-handlebars').create({defaultLayout: 'main'});

const githubParser = require('./modules/githubParser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public/js'));

app.set('port', process.env.PORT || 8080);






app.get('/', function(req, res){
  res.render('home');
});

app.get('/fetchCommits', function (req, res){
  fetch('https://api.github.com/users/qbek/events')
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      res.json(githubParser.parse(json));
    })
});



app.use((req, res) => {
  res.status(404);
  res.send('404 - Not found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  res.send('500 - Server error.\n' + err.stack);
});

http.listen(app.get('port'), () => console.log('Dart is running on', app.get('port'), 'port.\n', 'Press Ctrl+C to terminate'));