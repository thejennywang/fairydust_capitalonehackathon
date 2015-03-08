// var fs = require('fs');
var restler = require('restler');
// var request = require('request');
var crypto = require('crypto');
var capitalone = require('../services/capitalone-levelmoney/lib/levelmoney');

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
              "categorization": "Unknown"
            }
        ];

        var transactions2 =  [
            {
              "transaction-id": "1425274080000",
              "account-id": "nonce:42069000-96459775",
              "raw-merchant": "ATM WITHDRAWAL",
              "merchant": "ATM Withdrawal",
              "is-pending": false,
              "transaction-time": "02.28.15",
              "amount": 820000,
              "categorization": "Unknown"
            },
            {
              "transaction-id": "1425254340000",
              "account-id": "nonce:42069000-96459775",
              "raw-merchant": "FUEL CITY",
              "merchant": "Fuel City",
              "is-pending": false,
              "transaction-time": "03.01.15",
              "amount": 737757,
              "categorization": "Gas & Fuel"
            },
            {
              "transaction-id": "1425218520000",
              "account-id": "nonce:42069000-96459775",
              "raw-merchant": "CHECK 1111",
              "merchant": "Check 1111",
              "is-pending": false,
              "transaction-time": "03.01.15",
              "amount": 23379709,
              "categorization": "Check"
            }
        ];

        var transactions3 =  [
            {
              "transaction-id": "1425274080000",
              "account-id": "nonce:42069000-96459775",
              "raw-merchant": "ATM WITHDRAWAL",
              "merchant": "ATM Withdrawal",
              "is-pending": false,
              "transaction-time": "02.18.15",
              "amount": 820000,
              "categorization": "Unknown"
            },
            {
              "transaction-id": "1425254340000",
              "account-id": "nonce:42069000-96459775",
              "raw-merchant": "FUEL CITY",
              "merchant": "Fuel City",
              "is-pending": false,
              "transaction-time": "03.01.15",
              "amount": 737757,
              "categorization": "Gas & Fuel"
            },
            {
              "transaction-id": "1425218520000",
              "account-id": "nonce:42069000-96459775",
              "raw-merchant": "CHECK 1111",
              "merchant": "Check 1111",
              "is-pending": false,
              "transaction-time": "03.01.15",
              "amount": 23379709,
              "categorization": "Check"
            }
        ];

        //GOAL 1

        goal1.id = "1";
        goal1.name = "College";
        goal1.date = "03.07.2015"
        goal1.targetAmount = "50000000";
        goal1.transactions = transactions1;
        goal1.spent = "20000000";
        goal1.saved = "5000000";


        //GOAL 2

        goal2.id = "2";
        goal2.name = "Travel";
        goal2.date = "03.07.2015"
        goal2.targetAmount = "5000000";
        goal2.transactions = transactions2;
        goal2.spent = "0000";
        goal2.saved = "0000";

        //GOAL 3

        goal3.id = "3";
        goal3.name = "Car";
        goal3.date = "03.07.2015"
        goal3.targetAmount = "2000000";
        goal3.transactions = transactions3;
        goal3.spent = "0000";
        goal3.saved = "0000";

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


function generateToken(crypto) {
    var tokenLength = 10;
    var buf = crypto.randomBytes(Math.ceil(tokenLength * 3 / 4));
    var token = buf.toString('base64').slice(0, tokenLength).replace(/\+/g, '0').replace(/\//g, '0');
    return token;
}
