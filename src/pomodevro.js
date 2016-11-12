const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.json()); // for parsing application/json
app.use(express.static(__dirname + '/public/js'));

app.set('port', process.env.PORT || 8080);

const pomodorosStats = {
  pomodoros: {
    collected: 0,
    eaten: 0
  }
}


app.get('/pomodoro/collect', (req, res) => {
  console.log('/pomodoro/collect received with json:', req.body)
  pomodorosStats.pomodoros.collected += 1
  res.json(pomodorosStats)
});

app.post('/pomodoro/eat', (req, res) => {
  console.log('/pomodoro/eat received with json:', req.body)
  pomodorosStats.pomodoros.collected -= req.body.eaten
  res.json(pomodorosStats)
});



app.get('/', (req, res) => {
  res.render('home')
})

app.use((req, res) => {
  res.status(404)
  res.send('404 - Not found')
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500)
  res.send('500 - Server error.\n' + err.stack)
})

http.listen(app.get('port'), () => console.log('Pomodevro is running on', app.get('port'), 'port.\n', 'Press Ctrl+C to terminate'))


app.reset = () => {
  pomodorosStats.pomodoros = {
    collected: 0,
    eaten: 0
  }

  console.log('Reset test data')
}

module.exports = app