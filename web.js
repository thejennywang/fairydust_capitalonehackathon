var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var morgan = require('morgan');


var app = express();
app.use(morgan('dev'));
app.set('port', 5000);

// configure express template engine ===========================================
app.use(express.static(__dirname + '/static'));
app.set('views', __dirname + '/views');
app.engine('.html', exphbs({defaultLayout: 'main', extname: '.html'}));
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes ======================================================================
// load our routes and pass in our app and fully configured passport
require('./routes')(app);

app.listen(app.get('port'));
console.log('Listening on ' + app.get('port'));
