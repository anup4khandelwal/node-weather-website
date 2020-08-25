const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=45df8811d2e3ebb7134d78297dbbb91b&query='+lat+','+long+'&units=m'
    request({url, json: true}, (error,{body}) => {
        if(error) {
            callback("Unable to connect to Weather API", undefined)
        } else if(body.error) {
            callback("Location data not found", undefined)
        } else {
            callback(undefined, "<img src='"+body.current.weather_icons[0]+"' /><br/>"+ "<strong>Forecast:</strong> "+body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+"&#8451; out, it feel like "+body.current.feelslike+"&#8451; out. "+"The Humidity is "+body.current.humidity+"%.")
        }
    })
}
module.exports = forecast