//var mysql = require('mysql');
var express = require('express');
var app = express();
// var fs = require('fs');
var gm = require('gm');

var data = require('./words.json')
console.log(JSON.stringify(data,null,1));
process.exit(1)
// Add headers
app.use(function(req, res, next) {
	"use strict";
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	//res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});
app.use(function(err, req, res) {
	"use strict";
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

app.listen(3002);

//routes

// var debug = true;

function paddy(n, p, c) {
    "use strict";
    var pad_char = typeof c !== 'undefined' ? c : '0';
    var pad = new Array(1 + p).join(pad_char);
    return (pad + n).slice(-pad.length);
}
var myapp = {
	requests : {
		getWord : function(request, res) {
			"use strict";
			var symbols = ['\uFB51','\uFB52','\uFB53','\uFB54','\uFB55','\uFB56','\uFB57','\uFB58','\uFB59','\uFB5A','\uFB5B','\uFB5C','\uFB5D','\uFB5E','\uFB5F','\uFB60','\uFB61','\uFB62','\uFB63','\uFB64','\uFB65','\uFB66','\uFB67','\uFB68','\uFB69','\uFB6A','\uFB6B','\uFB6C','\uFB6D','\uFB6E','\uFB6F','\uFB70','\uFB71','\uFB72','\uFB73','\uFB74','\uFB75','\uFB76','\uFB77','\uFB78','\uFB79','\uFB7A','\uFB7B','\uFB7C','\uFB7D','\uFB7E','\uFB7F','\uFB80','\uFB81','\uFB82','\uFB83','\uFB84','\uFB85','\uFB86','\uFB87','\uFB88','\uFB89','\uFB8A','\uFB8B','\uFB8C','\uFB8D','\uFB8E','\uFB8F','\uFB90','\uFB91','\uFB92','\uFB93','\uFB94','\uFB95','\uFB96','\uFB97','\uFB98','\uFB99','\uFB9A','\uFB9B','\uFB9C','\uFB9D','\uFB9E','\uFB9F','\uFBA0','\uFBA1','\uFBA2','\uFBA3','\uFBA4','\uFBA5','\uFBA6','\uFBA7','\uFBA8','\uFBA9','\uFBAA','\uFBAB','\uFBAC','\uFBAD','\uFBAE','\uFBAF','\uFBB0','\uFBB1','\uFBD3','\uFBD4','\uFBD5','\uFBD6','\uFBD7','\uFBD8','\uFBD9','\uFBDA','\uFBDB','\uFBDC','\uFBDD','\uFBDE','\uFBDF','\uFBE0','\uFBE1','\uFBE2','\uFBE3','\uFBE4','\uFBE5','\uFBE6','\uFBE7','\uFBE8','\uFBE9','\uFBEA','\uFBEB','\uFBEC','\uFBED','\uFBEE','\uFBEF','\uFBF0','\uFBF1','\uFBF2','\uFBF3','\uFBF4','\uFBF5','\uFBF6','\uFBF7','\uFBF8','\uFBF9','\uFBFA','\uFBFB','\uFBFC','\uFBFD','\uFBFE','\uFBFF','\uFC00','\uFC01','\uFC02','\uFC03','\uFC04','\uFC05','\uFC06','\uFC07','\uFC08','\uFC09','\uFC0A','\uFC0B','\uFC0C','\uFC0D','\uFC0E','\uFC0F','\uFC10','\uFC11','\uFC12','\uFC13','\uFC14','\uFC15','\uFC16','\uFC17','\uFC18','\uFC19','\uFC1A','\uFC1B','\uFC1C','\uFC1D','\uFC1E','\uFC1F','\uFC20','\uFC21','\uFC22','\uFC23','\uFC24','\uFC25','\uFC26','\uFC27','\uFC28','\uFC29','\uFC2A','\uFC2B','\uFC2C','\uFC2D','\uFC2E','\uFC2F','\uFC30','\uFC31','\uFC32','\uFC33','\uFC34','\uFC35','\uFC36','\uFC37','\uFC38','\uFC39','\uFC3A','\uFC3B','\uFC3C','\uFC3D','\uFC3E','\uFC3F','\uFC40','\uFC41','\uFC42','\uFC43','\uFC44','\uFC45','\uFC46','\uFC47','\uFC48','\uFC49','\uFC4A','\uFC4B','\uFC4C','\uFC4D','\uFC4E','\uFC4F','\uFC50','\uFC51','\uFC52','\uFC53','\uFC54','\uFC55','\uFC56','\uFC57','\uFC58','\uFC59','\uFC5A','\uFC5B','\uFC5C','\uFC5D','\uFC5E','\uFC5F','\uFC60','\uFC61','\uFC62','\uFC63','\uFC64','\uFC65','\uFC66','\uFC67','\uFC68','\uFC69','\uFC6A','\uFC6B','\uFC6C','\uFC6D','\uFC6E','\uFC6F','\uFC70','\uFC71','\uFC72','\uFC73','\uFC74','\uFC75','\uFC76','\uFC77','\uFC78','\uFC79'];
			var locals = request.query;
			var size = !locals.height ? "200" : locals.height;
			if(!locals.page)
				return res.send({ok:false,error:"no page param"});
			var page = paddy(locals.page,3);

			if(!locals.order)
				return res.send({ok:false,error:"no order param"});
			var order = locals.order;
			var width = 2000;
			var text = "";
			if(order.indexOf("-")>0){
				var ind = order.indexOf("-");
				var from = parseInt(order.slice(0,ind));
				// console.log(from);
				var to = parseInt(order.slice(ind+1));
				// console.log(to);
				width *= to - from;
				for(var i=from;i<=to;i++){
					text=symbols[i]+text;
				}
			}
			else
				text = symbols[order];
			
			gm(width, 800, "transparent").font("fonts/QCF_P"+page+".TTF", 300).drawText(200, 200, text, "Center").trim().resize(null,size).toBuffer('PNG', function(err, buffer) {
				if (err)
					return console.log(err);
				//console.log(stdout);
				res.contentType("image/png");
				res.end(buffer);
			});
		}
	},
};

//views
app.get('/word/', myapp.requests.getWord);
