const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', { title: 'Weather', name: 'Vitalii' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me', name: 'Vitalii' });
});

app.get('/help', (req, res) => {
  res.render('help', { title: 'Help', example: 'Heeelp meee', name: 'Vitalii'});
});

app.get('/products', (req, res) => {
  const { search } = { ...req.query };
  if (!search) {
    return res.send({
      error: "You must provide a search"
    })
  }
  res.send({
    products: [search]
  })
});

app.get('/weather', (req, res) => {
  const { address } = { ...req.query };
  if (!address) {
    return res.send({
      error: "You must provide a search"
    })
  }

  geocode(address, (error, data) => {
    if (error) {
      return res.send({
        error
      })
    }
  const {lat, lon, location} = data;
  forecast(lat, lon, (error, data) => {
    if (error) {
      return res.send({
        error
      })
    }
    res.send({
      location,
      forecast: data,
      address
    })
  });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', { title: '404', text: 'Content does not exist', name: 'Vitalii'});
})

app.get('*', (req, res) => {
  res.render('404', { title: '404', text: 'Content does not exist', name: 'Vitalii'});
})

app.listen(port, () => {
  console.log('Server is up and running');
});