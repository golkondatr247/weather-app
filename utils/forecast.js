const request = require('request');

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=7dcddc98c97cfc62a2586b136fe91809&query='+longitude+','+latitude;
    request({url, json:true},(error,{body})=>{
        if(body.error){
            console.log('unable to find location');
        }
        else{
             //var x = JSON.parse(response.body)
            // console.log(x);
            // console.log(x.current);
            callback(undefined, body.current.weather_descriptions + ' It is currently ' + body.current.temperature + ' degress out')
        }
    })
}

module.exports = forecast;