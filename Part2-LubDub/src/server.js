let express = require('express')
var bodyParser = require('body-parser')
let app = express()
let url = require('url')
let port = process.env.PORT || 3001
// app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.json()); //here
app.use(bodyParser.urlencoded({ extended: true }));
var minimumHeartRate = 0;
var maximumHeartRate = 0;
var meanHeartRate = 0;
var medianHeartRate = 0;
var heartRates = []

const appendQuery = (req, res, next) => {
    let par = parseInt(req.query.heartRate,10)
    if(par != NaN){
        heartRates.push(par)
    }
    next();
}
app.get('/addData', appendQuery, express.query(), (req, res) => {
    console.log(heartRates)
    minimumHeartRate = Math.min(...heartRates);
    console.log(minimumHeartRate)
    maximumHeartRate = Math.max(...heartRates);
    let sum = 0;
    for(let i =0;i<heartRates.length;i++){
        sum += heartRates[i];
    }
    meanHeartRate = sum/heartRates.length;
    heartRates.sort(function (a, b) {
        return a - b;
    });

    var mid = Math.floor(heartRates.length / 2);

    if (heartRates.length % 2)
        medianHeartRate = heartRates[mid];

    medianHeartRate = (heartRates[mid - 1] + heartRates[mid]) / 2.0;
    res.send("get and appended");
    console.log(req.query);
})
app.get('/statistics', (req, res) => {
    res.render('statistics', { minimumHeartRate: minimumHeartRate, maximumHeartRate: maximumHeartRate, meanHeartRate: meanHeartRate, medianHeartRate: medianHeartRate })
})

// POST method route
app.post('/', function (req, res) {
    res.send('POST req to the homepage\n')
})

app.listen(port, () => console.log('Example app listening on port: ' + port))
