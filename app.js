const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname + '/views/partials'))

// Add the route handlers here:

app.get('/', (req, res) => {
  let data = {
    image: '/images/beer.png'
  };
  res.render('index', data);
});

app.get('/beers', (req, res) => {
  
  punkAPI.getBeers().then(beers => {

    res.render('beers', {beers})}).catch(e => console.log(e))
})


app.get('/random-beer', (req, res) => {
  
  punkAPI.getRandom().then(randomBeer => {
    console.log(randomBeer)
    res.render('random', {randomBeer})}).catch(e => console.log(e))
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
