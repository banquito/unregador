var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
var portName = '/dev/ttyACM0';
var port = new SerialPort(portName, {
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false,
  parser: serialport.parsers.readline('\n')
});

var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
    consumerKey: 'd9dAZTJ5a8pTLwgmacQesw',
    consumerSecret: 'S1qZA1S3X4ZpNI70g01cvcrF0xUiEcFsgmvNmulVbQ'
});

var count = 0;
var msg;
var prevMsg;

port.open(function () {
  console.log('open');
  port.on('data', function(data) {
    console.log('data received: ' + data);
    var requestToken = 'klYf4fS9ILiXyWeKX8OokPmWsNsDtLJbzUsfhnfW1Y';
    var requestTokenSecret = 'NgR8KqsKYojjTf8BhRG4MaesD7nwEYk9PJYA0eNtd1k';
    var pin = '8819765';
    var accessToken = '2271004202-aldiHMaWj8H6VOinlnd83vfsb5ULC3aGf1kbmty';
    var accessTokenSecret = 'yqSlwGO7m0Kbl5v4vEt98BTaKw8wmJT7Qf1uRXVCW8Xt6';

    //twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
      //if (error) {
        //console.log("Error getting OAuth request token : " + error);
      //} else {
        //console.log(requestToken);
        //console.log(requestTokenSecret);
        //store token and tokenSecret somewhere, you'll need them later; redirect user
        
        
        //twitter.getAccessToken(requestToken, requestTokenSecret, pin, function(error, accessToken, accessTokenSecret, results) {
          //if (error) {
            //console.log(error);
          //} else {
            //console.log(accessToken);
            //console.log(accessTokenSecret);
            var timeStamp = new Date().getTime();
            msg = data + '(' + timeStamp + ')';
            //if (count == 0 && msg != prevMsg) {
            if (count == 0) {
              prevMsg = msg;
              twitter.statuses("update", {
                  status: msg
                },
                accessToken,
                accessTokenSecret,
                function(error, data, response) {
                  if (error) {
                      console.log(error);
                  } else {
                      // data contains the data sent by twitter
                      
                  }
                }
              );
            }
            
            count++;
            if (count == 60 * 5) count = 0;
          //}
        //});

      //}
    //});

  });
});