const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/593d64c6c8ab96c447a49fa4dac11c9b/${lat},${long}`
    
    request({ url, json: true }, (error, { body }) => {
        const { error:forecastError, currently, daily, timezone } = body
        
        const data = daily.data[0]

        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (forecastError) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, `${data.summary} It is currently ${Math.round(currently.temperature)} degrees Fahrenheit out.    
            There's a high temperature of ${Math.round(data.temperatureHigh)} and a low temperature of ${Math.round(data.temperatureLow)}. 
            There is a ${currently.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast