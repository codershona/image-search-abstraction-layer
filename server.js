// Get Requirements and instatiate some of the :

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');

const mongoose = require('mongoose');

const Bing = require('node-bing-api')({accKey: 'cdf83e1981944b19b8b2c6b533e8475f'});

const searchTerm = require('./models/searchTerm');


app.use(bodyParser.json());

app.use(cors());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/searchTerms')

// (2ND API FOLLOW THIS) Get all search terms from the databases:

app.get('/api/recentsearchs', (req, res, next) => {

	searchTerm.find({}, (err, data) => {
     
     res.json(data);


	});



});



// ====  API ===== 







// (1st Api) Get call with required and not required params to do a search for an image:

app.get('/api/imagesearch/:searchVal*', (req, res, next) => {

	var { searchVal } = req.params;

	var {offset} = req.query;


var data = new searchTerm({
   
   searchVal,
   searchDate: new Date()


});

// Save to searchTerm collection:


 data.save(err => {
	if(err) {
		res.send('Error Saving to database');

	}

	 // res.json(data);
	// res.json({works: 'works'});

});

// var searchOffset;


 // Bing data 2:

 // Bing.images 2: Does offset exist

 // if(offset) {

 // 	if(offset==1) {

 // 		offset=0;

 // 		searchOffset = 1;

 // 	}

 // 	else if(offset>1) {
 // 		searchOffset = offset +1;


 // 	}
 // }



 Bing.images(searchVal, {
 	top:10

 	//top:(10 * searchOffset),
 	// skip: (10 * offset)


 }, function(error, rez, body) {

 	// res.json(body);

 	var bingData=[];

 	for(var i=0; i<10;i++) {
 		bingData.push({

 			url: body.value[i].webSearchUrl,

 			snippet: body.value[i].name,
 			thumbnail: body.value[i].thumbnailUrl,

 			context: body.value[i].hostPageDisplayUrl


 		});
 	}
  
  res.json(bingData);


 });

 // working on second part:

	// console.log(searchVal);

	// console.log(offset);

	// return res.json({

	// 	searchVal,
	// 	offset


	// });
    



});





app.listen(process.env.PORT || 3000, () => {

	console.log('Server is Running');

});
