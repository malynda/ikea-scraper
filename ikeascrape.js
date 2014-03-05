var email = require("emailjs/email")
var server = email.server.connect({
    user: "INSERT SENDER'S EMAIL ADDRESS",
    password:"SENDER'S PASSWORD",
    host: "SENDER'S MAIL SERVER",
    ssl: true
})

//TIME BETWEEN CHECKS
//var countTimer = 1500;
var countTimer = 43000000;


var cheerio = require('cheerio');
var request = require('request');

//Product URL to scrape
var url = 'http://www.ikea.com/us/en/catalog/products/PRODUCTNUMBER/'

function scrape(url){
request(url, function(err, resp, body) {
    if (err)
        throw err;
    $ = cheerio.load(body);
    //CHECK THE ITEM BUYABLE TAG
    trueorfalse = $('#itemBuyable').attr('value');
    torf = trueorfalse.toString();

    if (torf === 'true') {
      //IF THE ITEM IS BUYABLE, SEND AN EMAIL
        server.send({
            text: "ikea product is available!",
            from: "EMAIL SENDER ADDRESS",
            to: "EMAIL RECIPIENT ADDRESS",
            subject: "The Ikea product is AVAILABLE! "
        }, function(err, message) { console.log(err || message); });
        return;};

	//IF THE ITEM IS NOT AVAILABLE, WAIT AND TRY AGAIN
  setTimeout(function() {scrape(url)}, countTimer)
})
}

setTimeout(function() {scrape(url)}, countTimer)
