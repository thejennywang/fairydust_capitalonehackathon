var restler = require('restler');

var nexmoKey = process.env.NEXMO_KEY;
var nexmoSecret = process.env.NEXMO_SECRET;
var nexmoUserNumber = process.env.NEXMO_USER_NUMBER;

module.exports = {

  sendSms: function(number, callback){
    var url = 'https://rest.nexmo.com/sms/json?api_key=' + nexmoKey + '&api_secret=' + nexmoSecret + '&from=' + nexmoUserNumber + '&to=' + number + '&text=Welcome to Genius Fund!';
    restler.post(url, {
      }).on('complete', function(response) {

      callback(response);

      });
    }
};
