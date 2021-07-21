const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../utils/geoCode');
const forecast = require('../utils/forecast');

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars and view engine 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ajitesh'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: 'Ajitesh'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ajitesh',
        msg: 'This is a weather application to find the current weather across the globe.'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address is mandatory'
        });
    }
    geocode(req.query.address, (err, {location, latitude, longitude} = {}) => {
        if(err){
            return res.send({
                error: err
            });
        };
        forecast(latitude, longitude, (err, forecast_data) => {
            if(err){
                return res.send({
                    error: err
                });
            };
            res.send({
                forecast: forecast_data,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Ajitesh',
        error: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Ajitesh',
        error: 'Page not found'
    });
});
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});