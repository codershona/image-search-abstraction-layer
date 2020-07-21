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




// Get call with required and not required params to do a search for an image:

app.get('/api/imagesearch/:searchVal*', (req, res, next) => {

	var { searchVal } = req.params;

	var {offset} = req.query;


var data = new searchTerm({
   
   searchVal,
   searchDate: new Date()


});

data.save(err => {
	if(err) {
		res.send('Error Saving to database');

	}
	res.json(data);
})

	// console.log(searchVal);

	// console.log(offset);

	return res.json({

		searchVal,
		offset


	});
    



});





app.listen(process.env.PORT || 3000, () => {

	console.log('Server is Running');

});
