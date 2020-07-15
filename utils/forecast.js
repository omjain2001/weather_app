// API key (WeatherStack) :- e020df570379176028edf7a04dc6ba70
// API Key (AccuWeather) :- IqCwBZtszRy0DUcSHmueuToVTjAQOFC5

const request = require("request");
const latlon = require("./geoCode.js");

const foreCast = (lat,lon,callback) => {

    const forecast_url = 'http://api.weatherstack.com/current?access_key=e020df570379176028edf7a04dc6ba70&query='+lat+','+ lon;
    request({url: forecast_url, json: true}, (error,{body}) => { // response is destructured and only body property is taken.

        if (error){
            callback("Unable to fetch the location.",undefined);
        }
        else if (body.request===undefined) {
            callback("Unable to find the location.",undefined);
        }
        else{
            callback(undefined,{

            place: `${body.location.name},${body.location.region},${body.location.country}`,
            result: `${body.current.weather_descriptions[0]}. The temperature is ${body.current.temperature} degree celcius. There is ${body.current.precip}% chance of raining.`
            
            // temp: body.current.temperature,
            // rain: body.current.precip,
            // description: body.current.weather_descriptions[0]
            
            })
        }
    })
}

/*
const display_Weather = (place) => {
    
    latlon.geocode(place, (error,{latitude,longitude}) => {

        if (error){
            return console.log(error);
        }
        else{
            
            foreCast(latitude,longitude,(forecast_error,weather_data) => {
    
                if (forecast_error){
                    return console.log(forecast_error);
                }
                else{
                    console.log(weather_data);
                }
            });
            
        }
    })
}
*/

module.exports = foreCast;