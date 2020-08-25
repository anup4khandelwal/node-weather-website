const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=45df8811d2e3ebb7134d78297dbbb91b&query='+lat+','+long+'&units=m'
    request({url, json: true}, (error,{body}) => {
        if(error) {
            callback("Unable to connect to Weather API", undefined)
        } else if(body.error) {
            callback("Location data not found", undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degree out, it feel like "+body.current.feelslike+" degrees out")
        }
    })
}
module.exports = forecast