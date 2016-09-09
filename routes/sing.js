var express = require('express');
var router = express.Router();
var yahooFinance = require('yahoo-finance');
var jsonfile = require('jsonfile');
  
var _ = require('lodash');
var FIELDS = _.flatten([
  // Pricing
  ['a', 'b', 'b2', 'b3', 'p', 'o'],
  // Dividends
  ['y', 'd', 'r1', 'q'],
  // Date
  ['c1', 'c', 'c6', 'k2', 'p2', 'd1', 'd2', 't1'],
  // Averages
  ['c8', 'c3', 'g', 'h', 'k1', 'l', 'l1', 't8', 'm5', 'm6', 'm7', 'm8', 'm3', 'm4'],
  // Misc
  ['w1', 'w4', 'p1', 'm', 'm2', 'g1', 'g3', 'g4', 'g5', 'g6'],
  // 52 Week Pricing
  ['k', 'j', 'j5', 'k4', 'j6', 'k5', 'w'],
  // System Info
  ['i', 'j1', 'j3', 'f6', 'n', 'n4', 's1', 'x', 'j2'],
  // Volume
  ['v', 'a5', 'b6', 'k3', 'a2'],
  // Ratio
  ['e', 'e7', 'e8', 'e9', 'b4', 'j4', 'p5', 'p6', 'r', 'r2', 'r5', 'r6', 'r7', 's7'],
  // Misc
  ['t7', 't6', 'i5', 'l2', 'l3', 'v1', 'v7', 's6', 'e1']
]);




/* GET sing listing. */
router.get('/', function(req, res, next) {
  res.send('this is sing page');
});

router.get('/xxx', function(req, res, next) {
  res.send('sing page respond with a resource xxx');
});

router.get('/test_req1/:userId/books/:bookId', function(req, res) {
  console.log("------ this is console log : " + req.params);
  console.log("------ userId : " + req.params.userId);
  console.log("------ bookId : " + req.params.bookId);
  res.send(req.params);
});

router.get('/test_req2/:userId', function(req, res) {
  console.log("------ this is console log : " + req.params.userId);
  res.send("this is string " + req.params.userId);
});

router.get('/yahoo_finance_test_1/:symbol/:from/:to', function(req, res) {
	console.log("this is finance test 1");
	var symbol = req.params.symbol;
	var from = req.params.from;
	var to = req.params.to;
	console.log("this is symbol : " + symbol);
	// apple : AAPL
	// from : '2012-01-01'
	// to 	: '2012-12-31'
	yahooFinance.historical({
	  symbol: symbol,
	  from: from,
	  to: to,
	  // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only) 
	}, function (err, quotes) {
		console.log("this is test");
		res.send("the result : " + JSON.stringify(quotes));
	});
});


router.get('/yahoo_finance_test_2/:symbol/:from/:to', function(req, res) {
	console.log("this is finance test 2");
	var symbol = req.params.symbol;
	var from = req.params.from;
	var to = req.params.to;
	console.log("this is symbol : " + symbol);
	yahooFinance.snapshot({
	  symbol: symbol,
	  fields: ['s', 'n', 'd1', 'l1', 'y', 'r'] 
	}, function (err, snapshot) {
		res.send("the result : " + JSON.stringify(snapshot));
	});
});


router.get('/yahoo_finance_test_3/:symbol/:from/:to', function(req, res) {
	console.log("this is finance test 2");
	var symbol = req.params.symbol;
	var from = req.params.from;
	var to = req.params.to;
	console.log("this is symbol : " + symbol);
	yahooFinance.snapshot({
	  symbol: symbol,
	  fields: FIELDS
	}, function (err, snapshot) {
		res.send("the result : " + JSON.stringify(snapshot));
	});
});


router.get('/yahoo_finance_test_4/:symbol/:from/:to', function(req, res) {
	console.log("this is finance test 1");
	var symbol = req.params.symbol;
	var from = req.params.from;
	var to = req.params.to;
	var file = 'data/'+symbol+'.json';
	console.log("this is symbol : " + symbol);
	// apple : AAPL
	// from : '2012-01-01'
	// to 	: '2012-12-31'
	yahooFinance.historical({
	  symbol: symbol,
	  from: from,
	  to: to,
	  // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only) 
	}, function (err, quotes) {
		console.log("this is test");
		
		//var file = 'data/data.json';
		var obj = quotes;
		 
		jsonfile.writeFile(file, obj, function (err) {
		  console.error(err);
		  //res.send("the result ");
		})
		
		res.send("the result : " + JSON.stringify(quotes));
	});
});

router.get('/test_wirte_json', function(req, res) {
	var file = 'data/data.json';
	var obj = {name: 'JP'};
	 
	jsonfile.writeFile(file, obj, function (err) {
	  console.error(err);
	  res.send("the result ");
	})
});



router.get('/test_res1', function(req, res) {
  //var jsonfile = require('jsonfile')
 
	var file = '/tmp/data.json';
	var obj = {name: 'JP'};
	 
	jsonfile.writeFile(file, obj, function (err) {
	  console.error(err)
	})
});




/*
yahooFinance.historical({
  symbol: 'AAPL',
  from: '2012-01-01',
  to: '2012-12-31',
  // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only) 
}, function (err, quotes) {
	console.log("this is yahoo finance -----" +  JSON.stringify(quotes)); 
	
	//JSON.stringify(quotes);
  //... 
});
*/
module.exports = router;
