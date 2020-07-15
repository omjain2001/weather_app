const request = require("request");

const geoCode = (address,callback) => {

    const geo_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoib21qYWluMTAwOCIsImEiOiJja2NkOWxpaDcwOW53MnlubDc1dzRueGZ4In0.Ofkb1u-X2462gxN-He9C4g&limit=1"
    request({url : geo_url , json: true},(error,{body}={}) => {

        if (error){
            callback("Unable to reach the location.Please check internet connection !!!!",undefined);
        }
        else if (body.features.length===0){
            callback("Unable to get the specified location !!!",undefined);
        }
        else {
            callback(undefined,{
                place: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
                
            })
        }
    })
}



module.exports = geoCode;