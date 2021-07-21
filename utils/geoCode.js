const request = require('request');

//Geo-coding
//Address -> Lat/long -> Weather

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidG9ydnVzIiwiYSI6ImNrcXdiMmg0czAwMmkydnB0ZGxuY3N2anEifQ.NrXOVD6SMc23x_5Fabun6g';
    request({url, json:true}, (err, {body}) => {
        if(0){
            callback('Unable to connect to location services :(', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another match', undefined);
        } else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            });
        }
    });
};

module.exports = geoCode;