var restler = require('restler');

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


      //console.log(response);

      // response.transactions.forEach(function(v, i) {
      //
      //   var transaction = {'merchant': v['merchant']};
      //
      // });

      callback(response);

      });
    },


};
