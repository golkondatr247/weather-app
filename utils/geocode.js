const request = require('request');
const geocode = (address,callback) => {
    const trl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidGVtcHRyIiwiYSI6ImNrYnczeHpkMDBjOWYzN29mNm9ibzVoNngifQ.9G3-_3atuB-aUaqzQ757WA';
    request({url:trl, json:true},(error, {body})=>{
        if(error){
            callback('uanle to connect to API');
        }
        else if(body.features.length === 0){
            callback('unable to find another country', undefined)
        }
        else{
        callback(undefined,{
            latitude: body.features[0].center[0],
            longitude: body.features[0].center[1],
            location: body.features[0].place_name
        });
        }
    })
    }
module.exports =  geocode;