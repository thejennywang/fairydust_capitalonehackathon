var restler = require('restler');
var async = require('async');

var c1Uid = "1110568334";
var c1TOken = "B4E3BC07BE0E891000224A50B5A3DF4E";

module.exports = {

  getTransactionsMonth: function(callback){
  restler.post('https://api.levelmoney.com/api/v2/hackathon/projected-transactions-for-month', {
    data   : '{"args": {"uid": 1110568334, "token": "B4E3BC07BE0E891000224A50B5A3DF4E", "api-token": "HackathonApiToken"}, "year": 2015, "month": 3}',
    headers : { "Accept": "application/json", "Content-Type": "application/json" }
    }).on('complete', function(response) {

    callback(response);

    });
  },

  getTransactionsAll: function(callback){
  restler.post('https://api.levelmoney.com/api/v2/hackathon/get-all-transactions', {
    data   : '{"args": {"uid": 1110568334, "token": "B4E3BC07BE0E891000224A50B5A3DF4E", "api-token": "HackathonApiToken"}, "year": 2015, "month": 3}',
    headers : { "Accept": "application/json", "Content-Type": "application/json" }
    }).on('complete', function(response) {

      callback(response);


      });
    },



  getTransactionsNew: function(callback){
  restler.post('https://api.levelmoney.com/api/v2/hackathon/get-all-transactions', {
    data   : '{"args": {"uid": 1110568334, "token": "B4E3BC07BE0E891000224A50B5A3DF4E", "api-token": "HackathonApiToken"}, "year": 2015, "month": 3}',
    headers : { "Accept": "application/json", "Content-Type": "application/json" }
    }).on('complete', function(response) {

       var resultData = {"transactions":[], "totalsaved":0};


    async.reduce(response.transactions, resultData, function(resultData, transaction, callback){
        process.nextTick(function(){

        var newTransaction = {};

        var date = new Date(transaction['transaction-time']);
        var curr_date = date.getDate();
        var curr_month = date.getMonth() + 1; //Months are zero based
        var curr_year = date.getFullYear();

        newTransaction['transaction-time'] =  curr_month + "." +  curr_date+ "." + curr_year;

        newTransaction['amount'] =  Math.abs(transaction['amount']);

        newTransaction['merchant'] = transaction['merchant'];

        newTransaction['transaction-id'] = transaction['transaction-id'];
        newTransaction['account-id'] = transaction['account-id'];
        newTransaction['raw-merchant'] = transaction['raw-merchant']; 
        newTransaction['categorization'] = transaction['categorization'];

        newTransaction['saved'] =  Math.round(Math.abs(transaction['amount']) * 0.05);

        resultData.totalsaved += newTransaction['saved'];

        resultData.transactions.push(newTransaction);

            callback(null, resultData );
        });
    }, function(err, result){
        callback(resultData);
    });



      // response.transactions.forEach(function(v, i) {

      //   var transaction = v;
      //   var date = new Date(transaction['transaction-time']);
      //   var curr_date = date.getDate();
      //   var curr_month = date.getMonth() + 1; //Months are zero based
      //   var curr_year = date.getFullYear();

      //   transaction['transaction-time'] =  curr_month + "." +  curr_date+ "." + curr_year;


      //   transaction['amount'] =  Math.abs(transaction['amount']);

      //   transaction['saved'] =  Math.round(Math.abs(transaction['amount']) * 0.05);
      //   totalsaved += transaction['saved'];
      //  // console.log(transaction);
       
      //  json_transaction.push(transaction);

      //  // obj['theTeam'].push({"teamId":"4","status":"pending"});
      //  // jsonStr = JSON.stringify(obj);
      //   //console.log(date);
      // });

      // callback(json_transaction);





    });
  },


  getTotalSaved: function(callback){
    callback(totalsaved);
    return totalsaved;
  },
};
