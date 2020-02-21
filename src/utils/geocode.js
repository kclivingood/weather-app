const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoia2NsaXZpbmdvb2QiLCJhIjoiY2s2a3R6bXh5MDg0bTNqdTk5OXFoNTI5ZSJ9.j3KUAIK775EfNE7DWlFpEg`

    request({ url, json: true }, (error, { body }) => {
        const { features = [] } = body
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const { center } = features[0]
            callback(undefined, {
                lat: center[1],
                long: center[0],
                location: features[0].place_name,
                features: features
            })
        }
    })
}

module.exports = geocode