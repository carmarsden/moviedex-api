require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const MOVIEDEX = require('./movies-data-small.json');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// VALIDATE REQUEST
app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN;
    const authToken = req.get('Authorization')

    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    next()
});


// GET MOVIES
// The search options for genre, country, and/or average vote are provided in query string parameters.
// When searching by genre, users are searching for whether the Movie's genre includes a specified string. The search should be case insensitive.
// When searching by country, users are searching for whether the Movie's country includes a specified string. The search should be case insensitive.
// When searching by average vote, users are searching for Movies with an avg_vote that is greater than or equal to the supplied number.
// The API responds with an array of full movie entries for the search results

function handleGetMovie(req, res) {
    let response = MOVIEDEX;

/* POKEDEX COPIED CODE
    // filter our pokemon by name, case-insensitive, if name param is present
    if (req.query.name) {
        response = response.filter(pokemon =>
            pokemon.name.toLowerCase().includes(req.query.name.toLowerCase())
        )
    }
    
    // filter our pokemon by type if type query param is present
    if (req.query.type) {
        response = response.filter(pokemon =>
            pokemon.type.includes(req.query.type)
        )
    }
*/

    res.json(response);
};
app.get('/movie', handleGetMovie);


const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
})