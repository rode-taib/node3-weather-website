const request = require('postman-request')

const forcast = (longitude,latitude,callback)=>{

    console.log('latitude is ',latitude);
    
    const url = 'http://api.weatherstack.com/current?access_key=82d6adec7d2d68b8c3e5ea2c71452c7a&query='+latitude+','+longitude

    request({url:url,json:true},(error,res)=>{
        if(error){
            callback('Unable to reach server',undefined)
        }else if(res.body.error){
            callback('unable to find location forcast', undefined)
        }else{
            callback(undefined,{
                temprature: res.body.current.temperature,
                feelsLike: res.body.current.feelslike,
                humidity: res.body.current.humidity
            })
        }
    })
}
module.exports= forcast;