// var fs = require('fs');
var restler = require('restler');
// var request = require('request');
var crypto = require('crypto');
var async = require('async');
var capitalone = require('../services/capitalone-levelmoney/lib/levelmoney');
var plotly = require('../services/plotly/lib/plotly');

module.exports = function (app) {

// =============================================================================
// HOME ROUTES =================================================================
// =============================================================================

    app.get('/', function (req, res) {
          res.render('index');
    });

    app.get('/hi', function(req, res) {
          res.json({ message: 'hooray! welcome to our api!'});
    });

    app.get('/goals', function(req, res) {

        var goals = [];

        var goal1 = {};
        var goal2 = {};
        var goal3 = {};


        var transactions1 =  [
            {
              "transaction-id": "1425679320000",
              "account-id": "nonce:42069000-96459775",
              "raw-merchant": "SERVICE FEE",
              "merchant": "Service Fee",
              "is-pending": false,
              "transaction-time": "02.25.15",
              "amount": 48000,
              "saved": 480,
              "categorization": "Unknown"
            },
            {
              "transaction-id": "1425452880000",
              "account-id": "nonce:42069000-96459775",
              "raw-merchant": "CHECK",
              "merchant": "Check",
              "is-pending": false,
              "transaction-time": "02.25.15",
              "amount": 13642900,
              "saved": 136429,
              "categorization": "Unknown"
            },
            {
              "transaction-id": "1425442800000",
              "account-id": "nonce:42069000-96459775",
              "raw-merchant": "CC PAYMENT",
              "merchant": "CC Payment",
              "is-pending": false,
              "transaction-time": "02.25.15",
              "amount": 5194500,
              "saved": 51945,
              "categorization": "Unknown"
            }
        ];

        var transactions2 =  [];

        var transactions3 =  [];

        //GOAL 1

        goal1.id = "1";
        goal1.name = "College";
        goal1.date = "03.07.2015"
        goal1.targetAmount = "50000000";
        goal1.transactions = transactions1;
        goal1.spent = "40000000";
        goal1.saved = "30000000";
        goal1.daysNeeded = "1000";


        //GOAL 2

        goal2.id = "2";
        goal2.name = "Travel";
        goal2.date = "03.07.2015"
        goal2.targetAmount = "5000000";
        goal2.transactions = transactions2;
        goal2.spent = "0000";
        goal2.saved = "0000";
        goal2.daysNeeded = "400";

        //GOAL 3

        goal3.id = "3";
        goal3.name = "Car";
        goal3.date = "03.07.2015"
        goal3.targetAmount = "2000000";
        goal3.transactions = transactions3;
        goal3.spent = "0000";
        goal3.saved = "0000";
        goal3.daysNeeded = "300";

        goals[0] = goal1;
        goals[1] = goal2;
        goals[2] = goal3;

        res.json(goals);

    });


    app.get('/c1month', function(req, res) {
        capitalone.getTransactionsMonth(function(data){ res.json(data) }) ;
    });


    app.get('/c1all', function(req, res) {
        capitalone.getTransactionsAll(function(data){ res.json(data) }) ;
    });

    app.get('/plot', function(req, res) {

      getPlotData( function(data){

        plotly.plotData( data, function(plot){ res.render('plot'); });

      });

    });


};


function getPlotData(callback){

  var data = {"x":[], "y":[]};

  capitalone.getTransactionsAll(function(trans){

    async.reduce(trans.transactions, data, function(data, tran, callback){
        process.nextTick(function(){
          data.x.push(tran['transaction-time']);
          data.y.push(tran['amount']);
            callback(null, data );
        });
    }, function(err, result){
        callback(data);
    });

  });

};


function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
};


function getDateMMDDYYYY() {
    var date = new Date();

    var m = (date.getMonth() + 1).toString();
    var d = date.getDate().toString();
    var y = date.getFullYear().toString();

    return m + "-" + d + "-" + y;
}


function generateToken() {
    var tokenLength = 10;
    var buf = crypto.randomBytes(Math.ceil(tokenLength * 3 / 4));
    var token = buf.toString('base64').slice(0, tokenLength).replace(/\+/g, '0').replace(/\//g, '0');
    return token;
}
