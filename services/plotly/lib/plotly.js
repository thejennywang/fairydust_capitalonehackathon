
var plotlyUser = process.env.PLOTLY_USER;
var plotlyKey = process.env.PLOTLY_KEY;

var plotly = require('plotly')(plotlyUser,plotlyKey);


module.exports = {

  plotData: function( plotData,  callback){

    var data = [
      {
        x: plotData.x,
        y: plotData.y,
        type: "scatter"
      }
    ];

    var graphOptions = {filename: "date-axes", fileopt: "overwrite"};

    plotly.plot(data, graphOptions, function (err, msg) {

        if(err){
          console.log('Plotly error: ', err);
        }

        console.log(msg);
        callback(msg);

    });

  }

};
