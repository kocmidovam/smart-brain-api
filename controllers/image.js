const clarifai = require('clarifai')

// I must add my own API key here from Clarify - check
const app = new Clarifai.App({
  apiKey: '1c54491670014f97952c5252837adaa9'
});


const handleApiCall = (req, res) => {
  app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
      .then(data => {
        res.json(data)
      })
      .catch(err => res.status(400).json('unable to work with API'))
}


const handleImage = (db) => (req, res,) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
      .increment('entries', 1)
      .returning('entries')
      .then(entries => {
        res.json(entries[0])
      })
      .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}