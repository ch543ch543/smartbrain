const clarifai = require('clarifai');
const { json } = require('body-parser');

const app = new Clarifai.App({
    apiKey: 'fa3d088a8986470fa97f71b7fcf6f5f6'
   }); 

const handleApiCall = (req, res) => {
    app.models
        .predict( 'c0c0ac362b03416da06ab3fa36fb58e3',  req.body.input)
        .then(data => {
         res.json(data);
        }) 
        .catch(err => res.status(400).json('unable to work with API'))
} 

const handleImage = (req, res, db) => {
    const { id } = req.body;  // 取代冒號的參數
    db('users').where('id', '=', id)
      .increment('entries',1)
      .returning('entries')
      .then( entries => {
          console.log(entries)
          res.json(entries[0]);
      })
      .catch(err => res.status(400).json('error geting entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}