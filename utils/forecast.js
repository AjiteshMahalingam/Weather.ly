const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ed45945d6d928e2db4f68181d86fdb3f&query=' + latitude + ',' + longitude + '' ;
    
    request({url, json:true}, (err, {body}) => {
        if(err){
            callback('Unable to connect to weather services :(', undefined);
        } else if (body.error){
            callback(body.error.info, undefined);
        } else {
            callback(undefined, {
                time: body.location.localtime,
                obs_time: body.current.observation_time,
                description : body.current.weather_descriptions[0],
                temperature : body.current.temperature,
                feelslike : body.current.feelslike
            });
        }
    });
};

module.exports = forecast;