const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW51cGtoYW5kZWx3YWwiLCJhIjoiY2tlNnU1NzEyMTZzdDJ6bDZlc2hkeDlxYiJ9.Dw7MqTgd7gZNGmq6rry7aw&limit=1'
    request({url, json: true}, (error,{body}) => {
    if(error) {
        callback("Unable to connect to Weather API",undefined)
    } else if(body.features.length === 0) {
        callback("Unable to find the localtion. Try another search.", undefined)
    } else {
        callback(undefined, {
            latitude : body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })
    }
  })
}

module.exports = geocode