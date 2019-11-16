let express = require('express')
var bodyParser = require('body-parser')
let app = express()
let url = require('url')
let port = process.env.PORT || 3000
// app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.json()); //here
app.use(bodyParser.urlencoded({ extended: true }));
let timesHelloed = 0;
app.get('/hello', (req, res) => {
    timesHelloed++;
    res.send("you are in Hello page")
})
app.get('/timesHelloed', (req, res) => {
    res.render('timesHelloed',{timesHelloed:timesHelloed})
})
app.get('/resetTimesHelloed', (req, res) => {
    timesHelloed = 0
    res.render('timesHelloed',{timesHelloed:timesHelloed})
})

// POST method route
app.post('/', function (req, res) {
  res.send('POST req to the homepage\n')
})

app.listen(port, () => console.log('Example app listening on port: '+port))
